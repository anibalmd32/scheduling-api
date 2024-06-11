// ** Libs
import { formatInterval } from '../../libs/formatInterval'
import { generateRandomDay } from '../../libs/generateRandomDay'
import { formatEvent } from '../../libs/formatEvent'

// ** Models
import Schedule from './model'
import Classrooms from '../classrooms/model'
import Semesters from '../semesters/model'
import Professors from '../professors/model'

// ** Types
import {
  type ScheduleDTO,
  type ScheduleEvent,
  type SubjectScheduleDTO,
  type ScheduleData,
  type ScheduleParam,
  type ScheduleQuery,
  type ScheduleDataDTO,
  type UpdateSchedueleDTO,
  type DeleteSubjectDTO,
  type ScheduleSchema
} from './definitions'

// ** Utils
import { subjectsForLab } from '../../utils/subjectsForLab'
import { subjectsForPC, dinForPc } from '../../utils/subjectsForPc'
import { morningHours } from '../../utils/morningHours'
import { afternoonHours } from '../../utils/afterHours'

// Función para parsear tiempo en minutos desde medianoche
function parseTime(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export default class ScheduleServices {
  async getAllSchedules (): Promise<ScheduleSchema[]> {
    const schedules = await Schedule.find({})

    return schedules
  }

  async generateBySemester(data: ScheduleDTO): Promise<void> {
    const semester = await Semesters.findOne({
      number: data.semester
    })

    const scheduleExists = await Schedule.find({
      $and: [
        { degree: data.degree },
        { semester: data.semester }
      ]
    })

    if (scheduleExists.length > 1) {
      throw new Error('Ya el horario de este semestre ya creado')
    }

    if ((semester?.sections) == null) {
      throw new Error('Este semestre no tiene secciones')
    }

    if (!semester.isActive) {
      throw new Error('Este semestre no está activo')
    }

    const hours = semester.sections[0].subjects.find(subject => subject.laboratoryHours > 0 || subject.practiceHours > 0 || subject.theoryHours > 0)

    if (!hours) {
      throw new Error('Algunas materias no tienen horas asignadas')
    }

    const daysOfWeek = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sábado', 'domingo']
    const startDayIndex = data.startDay === 'cualquier' ? 0 : data.startDay ? daysOfWeek.indexOf(data.startDay) : 0
    const endDayIndex = data.endDay === 'cualquier' ? daysOfWeek.length - 1 : data.endDay ? daysOfWeek.indexOf(data.endDay) : daysOfWeek.length - 1
    const rangeDays = daysOfWeek.slice(startDayIndex, endDayIndex + 1)

    const allhours = morningHours.concat(afternoonHours)
    const starthour = data.shift === 'morning'
      ? morningHours[0]
      : data.shift === 'afternoon'
        ? afternoonHours[0]
        : '07:00';
    const endHour = data.shift === 'morning'
      ? morningHours[morningHours.length - 1]
      : data.shift === 'afternoon'
        ? afternoonHours[afternoonHours.length - 1]
        : '18:15';

    const startHourIndex = allhours.indexOf(starthour)
    const endHourIndex = allhours.indexOf(endHour)
    const rangehours = allhours.slice(startHourIndex, endHourIndex + 1)
  
    for (const section of semester?.sections) {
      const { subjects } = section
      const query = {
        degrees: {
          $in: [data.degree]
        },
        availability: {
          $elemMatch: {
            hours: { $in: rangehours },
            name: { $in: rangeDays }
          }
        },
      }

      for (const subject of subjects) {
        const { laboratoryHours, name, practiceHours, theoryHours } = subject;
        const subjectHours: Record<string, number> = { laboratoryHours, practiceHours, theoryHours };

        for (const hours in subjectHours) {
          if (subjectHours[hours] !== 0) {
            const hourInterval = formatInterval(subjectHours[hours]);
            let category: string[];

            hours === 'laboratoryHours' && subjectsForLab.includes(name)
              ? category = ['laboratory']
              : hours === 'laboratoryHours' && subjectsForPC.includes(name)
                ? category = ['pc']
                : hours === 'practiceHours' && subjectsForPC.includes(name)
                  ? category = ['pc']
                  : hours === 'theoryHours' && dinForPc.includes(name)
                    ? category = ['pc']
                    : category = ['normal'];

            let assigned = false;
            const triedClassrooms = new Set<string>();

            while (!assigned) {
              const classroom = await Classrooms.findOne({
                ...query,
                category: { $in: category },
                _id: { $nin: Array.from(triedClassrooms) }
              });

              if (!classroom) {
                throw new Error(`No hay salón disponible para ${name}`);
              }

              triedClassrooms.add(classroom._id.toString());

              const classroomDays = classroom.availability
                .filter(day => (day.hours.length !== 0))
                .filter(day => {
                  const dayIndex = daysOfWeek.indexOf(day.name);
                  return dayIndex >= startDayIndex && dayIndex <= endDayIndex;
                });

              for (const day of classroomDays) {
                if (rangehours.length > 0) {
                  day.hours = day.hours.filter(hour => rangehours.includes(hour));
                }

                if (day.hours.length >= hourInterval) {
                  const allAvailableHours = day.hours;
                  const interval = allAvailableHours.slice(0, hourInterval);

                  if (interval.length >= hourInterval) {
                    const start = interval[0];
                    const end = interval[interval.length - 1];

                    await Classrooms.updateOne(
                      { _id: classroom._id, 'availability.name': day.name },
                      {
                        $pull: {
                          'availability.$.hours': { $in: interval }
                        }
                      }
                    );

                    await Classrooms.updateOne(
                      { _id: classroom._id, 'availability.name': day.name },
                      {
                        $push: {
                          'occupied.$.hours': { $each: interval }
                        }
                      }
                    );

                    await Schedule.create({
                      classroom: classroom.code,
                      day: day.name,
                      endTime: end,
                      startTime: start,
                      subject: subject.name,
                      degree: data.degree,
                      semester: data.semester,
                      extra: {
                        hourInterval: interval.length,
                        subjectType: hours === 'laboratoryHours'
                          ? 'Laboratorio'
                          : hours === 'practiceHours'
                            ? 'Práctica'
                            : 'Teoría'
                      }
                    });

                    assigned = true;
                    break;
                  }
                }
              }

              if (!assigned && triedClassrooms.size === await Classrooms.countDocuments({
                ...query,
                category: { $in: category }
              })) {
                throw new Error(`No hay suficientes aulas disponibles para ${name}`);
              }
            }
          }
        }
      }

    }
  }

  async getScheduleEvents (data: ScheduleQuery):
    Promise<ScheduleEvent[]> {

    let searchValue;

    // TODO: Refactor this from if/else to indexable object
    if (data.query === 'classroom') {
      const classroomData = await Classrooms.findById(data.value)
      searchValue = classroomData?.code
    } else if (data.query === 'semester') {
      const semesterData = await Semesters.findById(data.value)
      searchValue = semesterData?.number
    }

    const schedulesData = await Schedule.find({
      [data.query]: searchValue
    })

    const events: ScheduleEvent[] = schedulesData.map(sch => {
      const details: ScheduleData = {
        _id: String(sch._id),
        classroom: sch.classroom,
        day: sch.day,
        endTime: sch.endTime,
        startTime: sch.startTime,
        subject: sch.subject,
        degree: sch.degree,
        semester: sch.semester,
        extra: sch.extra
      }

      const param: ScheduleParam = data.query

      return formatEvent(details, param)
    })

    return events
  }

  async updateSubjectSchedule (data: SubjectScheduleDTO): Promise<void> {
    await Schedule.findOneAndUpdate(
      { _id: data.id },
      {
        day: data.day,
        endTime: data.endTime,
        startTime: data.startTime
      }
    )
  }

  async createScheduleFromClassroom(data: ScheduleDataDTO): Promise<ScheduleEvent> {
    // ? Update Subject hours by its type
    const typeSubject = data.typeSubject

    // VARIDAR QUE NO LA MATERIA Y SU TIPO NO TENGAN UN HORARIO CREADO
    // - Buscar la materia y su tipo en los horarios disponibles
    const existeSubjectSchedule = await Schedule.findOne(
      { subject: data.subject, extra: { subjectType: data.typeSubject } }
    )

    // Si existe un horario, devuelve un error
    if (existeSubjectSchedule) {
      throw new Error('Ya existe un horario para esta materia y tipo')
    }

    const typeHours: Record<string, string> = {
      'teoria': 'theoryHours',
      'Teoría': 'theoryHours',
      'practica': 'practiceHours',
      'Práctica': 'practiceHours',
      'laboratorio': 'laboratoryHours',
      'Laboratorio': 'laboratoryHours'
    }

    const setKey = `sections.$[].subjects.$[j].${typeHours[typeSubject]}`;

    await Semesters.findOneAndUpdate(
      { 'sections.subjects.name': data.subject },
      { $set: { [setKey]: data.hours } },
      {
        arrayFilters: [
          { 'j.name': data.subject },
        ]
      }
    )

    // ? Add new Schedule
    const schedule = new Schedule({
      day: data.day,
      startTime: data.start,
      endTime: data.end,
      classroom: data.clarrooom,
      subject: data.subject,
      subjectId: data.subjectId,
      degree: 'sistemas',
      semester: data.semester,
      extra: {
        subjectType: data.typeSubject
      }
    })

    await schedule.save()

     // Actualizar disponibilidad y ocupación del aula
    const classroom = await Classrooms.findOne({ code: data.clarrooom });

    if (classroom) {
      const dayAvailability = classroom.availability.find(avail => avail.name === data.day);

      const startIndex = dayAvailability?.hours.findIndex(hour => hour === data.start);
      const endIndex = dayAvailability?.hours.findIndex(hour => hour === data.end);

      if (startIndex === -1 || endIndex === -1 || startIndex === undefined || endIndex === undefined) {
        throw new Error('No se pudo encontrar la hora de inicio o fin de la clase');
      }

      const hoursRange = dayAvailability?.hours.slice(startIndex, endIndex + 1);

      if (hoursRange && hoursRange.length === 0) {
        throw new Error('No se pudo encontrar la hora de inicio o fin de la clase');
      }

      await Classrooms.updateOne(
        { code: data.clarrooom, 'availability.name': data.day, 'occupied.name': data.day },
        {
          $pull: { 'availability.$[dayAvail].hours': { $in: hoursRange } },
          $push: { 'occupied.$[dayOcc].hours': { $each: hoursRange } }
        },
        {
          arrayFilters: [
            { 'dayAvail.name': data.day },
            { 'dayOcc.name': data.day }
          ]
        }
      );
    }

    // ? Get the new schedule formated and return
    const scheduleEvent = formatEvent({
      _id: String(schedule._id),
      classroom: data.clarrooom,
      day: data.day,
      endTime: data.end,
      startTime: data.start,
      subject: data.subject,
      degree: 'sistemas',
      semester: data.semester!,
      extra: {
        hourInterval: 0,
        subjectType: data.typeClassroom
      }
    }, 'classroom');

    return scheduleEvent;
  }

  // Método para actualizar el horario y la disponibilidad del aula
  async updateSchedule(id: string, data: UpdateSchedueleDTO): Promise<ScheduleEvent> {
    const schedule = await Schedule.findOne({ _id: id });
    const professorWithSchedule = await Professors.find({ schedule: id }).select('schedule');

    // Verificar que al morver este horario, si ya esta asigando a un profesor, no le choque con algun otro que ya tenga asignado
    if (professorWithSchedule) {
      const schedulesIDsArray = professorWithSchedule.map(schedule => schedule.schedule).flat();

      for (const schedule of schedulesIDsArray) {
        const professorScheduleData = await Schedule.findById(schedule);

        if (professorScheduleData) {
          // Verificar que no sean las mismas horas y dias aunque sea aula distinta
          if (
            professorScheduleData.day === data.day
            && professorScheduleData.startTime === data.start
          ) {
            throw new Error('Esta materia esta asiganada a un profesor que ya tiene esa hora y dia ocupado');
          }
        }
      }
    }

    if (schedule == null) {
      throw new Error('No se encontró el horario');
    }

    // Obtener el aula y las horas actuales del horario
    const classroom = await Classrooms.findOne({ code: schedule.classroom });
    const availability = classroom?.availability.find(avail => avail.name === schedule.day);

    if (availability) {
      // Si no se encuentra la hora de inicio disponible, se devuelve un error
      const startIndex = availability.hours.findIndex(hour => hour === data.start);
      const endIndex = availability.hours.findIndex(hour => hour === data.end);

      if (startIndex === -1 || endIndex === -1 || startIndex === undefined || endIndex === undefined) {
        throw new Error('Esta hora no esta disponible');
      }
    }

    if (!classroom) {
      throw new Error('No se encontró el aula');
    }

    // Comienza el proceso para regresar las horas ocupadas a disponibles
    const currentDayOccupied = classroom.occupied.find(avail => avail.name === schedule.day);

    const currentStartIndex = currentDayOccupied?.hours.findIndex(hour => hour === schedule.startTime);
    const currentEndIndex = currentDayOccupied?.hours.findIndex(hour => hour === schedule.endTime);

    if (currentStartIndex === -1 || currentEndIndex === -1 || currentStartIndex === undefined || currentEndIndex === undefined) {
      throw new Error('No se pudo encontrar la hora de inicio o fin de la clase actual');
    }

    const currentHoursRange = currentDayOccupied?.hours.slice(currentStartIndex, currentEndIndex + 1);


    if (currentHoursRange && currentHoursRange.length === 0) {
      throw new Error('No se pudo encontrar la hora de inicio o fin de la clase actual');
    }

    // Mover las horas actuales de ocupadas a disponibles
    await Classrooms.updateOne(
      { code: schedule.classroom, 'availability.name': schedule.day, 'occupied.name': schedule.day },
      {
        $pull: { 'occupied.$[dayOcc].hours': { $in: currentHoursRange } },
        $push: { 'availability.$[dayAvail].hours': { $each: currentHoursRange } },
      },
      {
        arrayFilters: [
          { 'dayAvail.name': schedule.day },
          { 'dayOcc.name': schedule.day }
        ]
      },
    );

    // Re-ordenar las horas en disponibilidad después de la actualización
    const updatedClassroom = await Classrooms.findOne({ code: schedule.classroom });
    if (updatedClassroom) {
      const updatedDayAvailability = updatedClassroom.availability.find(avail => avail.name === schedule.day);
      if (updatedDayAvailability) {
        updatedDayAvailability.hours.sort((a, b) => parseTime(a) - parseTime(b));
        await updatedClassroom.save();
      }

      const updatedNewDayAvailability = updatedClassroom.availability.find(avail => avail.name === data.day);
      if (updatedNewDayAvailability) {
        updatedNewDayAvailability.hours.sort((a, b) => parseTime(a) - parseTime(b));
        await updatedClassroom.save();
      }
    }

    // Comienza el proceso para actualizar las nuevas horas ocupadas
    const updatedClassroomHours = await Classrooms.findOne({ code: schedule.classroom });

    if (!updatedClassroomHours) {
      throw new Error('No se encontró el aula');
    }

    const newDayAvailability = updatedClassroomHours.availability.find(avail => avail.name === data.day);
    const newStartIndex = newDayAvailability?.hours.findIndex(hour => hour === data.start);
    const newEndIndex = newDayAvailability?.hours.findIndex(hour => hour === data.end);

    if (newStartIndex === -1 || newEndIndex === -1 || newStartIndex === undefined || newEndIndex === undefined) {
      throw new Error('No se pudo encontrar la hora de inicio o fin de la nueva clase');
    }

    const newHoursRange = newDayAvailability?.hours.slice(newStartIndex, newEndIndex + 1);

    if (newHoursRange && newHoursRange.length === 0) {
      throw new Error('No se pudo encontrar la hora de inicio o fin de la nueva clase');
    }

    // Mover las nuevas horas de disponibles a ocupadas
    await Classrooms.updateOne(
      { code: schedule.classroom, 'availability.name': data.day, 'occupied.name': data.day },
      {
        $pull: { 'availability.$[dayAvail].hours': { $in: newHoursRange } },
        $push: { 'occupied.$[dayOcc].hours': { $each: newHoursRange } },
      },
      {
        arrayFilters: [
          { 'dayAvail.name': data.day },
          { 'dayOcc.name': data.day }
        ]
      }
    );

    // Actualizar el horario
    const updated = await Schedule.findOneAndUpdate(
      { _id: id },
      {
        day: data.day,
        endTime: data.end,
        startTime: data.start,
        subject: data.subject,
        'extra.subjectType': data.typeSubject,
      },
      { new: true }
    );

    if (updated == null) {
      throw new Error('Error al actualizar el horario');
    }

    // Formatear y devolver el evento de horario actualizado
    const scheduleEvent = formatEvent({
      _id: String(updated._id),
      classroom: updated.classroom,
      day: updated.day,
      endTime: updated.endTime,
      startTime: updated.startTime,
      subject: updated.subject,
      degree: updated.degree,
      semester: updated.semester,
      extra: {
        hourInterval: updated.extra.hourInterval,
        subjectType: updated.extra.subjectType
      }
    }, 'classroom');

    return scheduleEvent;
  }

  async deleteSchedule(id: string, data: DeleteSubjectDTO): Promise<void> {
    const typeSubject = data.typeSubject

    // Datos para actualizar la disponibilidad y ocupación del aula
    const schedule = await Schedule.findById(id);
    const classroom = await Classrooms.findOne({ code: schedule!.classroom });

    if (classroom && schedule) {
      const dayAvailability = classroom.occupied.find(avail => avail.name === schedule.day);

      const startIndex = dayAvailability?.hours.findIndex(hour => hour === schedule.startTime);
      const endIndex = dayAvailability?.hours.findIndex(hour => hour === schedule.endTime);

      if (startIndex === -1 || endIndex === -1 || startIndex === undefined || endIndex === undefined) {
        throw new Error('No se pudo encontrar la hora de inicio o fin de la clase');
      }

      const hoursRange = dayAvailability?.hours.slice(startIndex, endIndex + 1);

      if (hoursRange && hoursRange.length === 0) {
        throw new Error('No se pudo encontrar la hora de inicio o fin de la clase');
      }

      await Classrooms.updateOne(
        { code: schedule.classroom, 'availability.name': schedule.day, 'occupied.name': schedule.day },
        {
          $pull: { 'occupied.$[dayOcc].hours': { $in: hoursRange } },
          $push: { 'availability.$[dayAvail].hours': { $each: hoursRange } }
        },
        {
          arrayFilters: [
            { 'dayAvail.name': schedule.day },
            { 'dayOcc.name': schedule.day }
          ]
        }
      );

      // Re-ordenar las horas en disponibilidad después de la actualización
      const updatedClassroom = await Classrooms.findOne({ code: schedule.classroom });
      if (updatedClassroom) {
        const updatedDayAvailability = updatedClassroom.availability.find(avail => avail.name === schedule.day);
        if (updatedDayAvailability) {
          updatedDayAvailability.hours.sort((a, b) => parseTime(a) - parseTime(b));
          await updatedClassroom.save();
        }
      }
    }

    const typeHours: Record<string, string> = {
      'teoria': 'theoryHours',
      'Teoría': 'theoryHours',
      'practica': 'practiceHours',
      'Práctica': 'practiceHours',
      'laboratorio': 'laboratoryHours',
      'Laboratorio': 'laboratoryHours'
    }

    const setKey = `sections.$[].subjects.$[j].${typeHours[typeSubject]}`;

    await Semesters.findOneAndUpdate(
      { 'sections.subjects.name': data.subject },
      { $set: { [setKey]: 0 } },
      {
        arrayFilters: [
          { 'j.name': data.subject },
        ]
      }
    )

    await Professors.findOneAndUpdate(
      { schedule: id },
      { $pull: { schedule: id } },
      { new: true }
    )

    await Schedule.findOneAndDelete({ _id: id })
  }
}
