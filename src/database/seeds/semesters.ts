import { Semester } from '../models/Scheduling'

export async function semestersSeeder (): Promise<void> {
  try {
    await Semester.create([
      {
        number: 0,
        sections: [{
          code: '00S-2603-D1',
          subjects: [
            'Lenguaje',
            'Matemática',
            'Filosofía',
            'DIN']
        }]
      },
      {
        number: 1,
        sections: [{
          code: '01S-2603-D1',
          subjets: [
            'Geometría Anaítica',
            'Matemética i',
            'Hombre, Ciencia y Sociedad',
            'Seminario i',
            'Educación Ambiental',
            'Dibujo',
            'Inglés I',
            'DIN I'
          ]
        }]
      },
      {
        number: 2,
        sections: [{
          code: '02S-2603-D1',
          subjects: [
            'Matemática II',
            'Algebra Lineal',
            'Química General',
            'Seminario II',
            'Inglés II',
            'Física I',
            'DIN II',
            'ACO I'
          ]
        }]
      },
      {
        number: 3,
        sections: [{
          code: '03S-2603-D1',
          subjects: [
            'Matemática III',
            'Probabilidad y Estadística',
            'Física II',
            'Programación',
            'Sistemas Administrativos',
            'DIN III'
          ]
        }]
      },
      {
        number: 4,
        sections: [{
          code: '04S-2603-D1',
          subjects: [
            'Lógica Matemática',
            'Lenguaje de Programación I',
            'Teoría de Sistemas',
            'Calculo Numérico',
            'Sistemas de Producción',
            'Procesamiento de Datos',
            'DIN IV',
            'ACO II'
          ]
        }]
      },
      {
        number: 5,
        sections: [{
          code: '05S-2603-D1',
          subjects: [
            'Investigación de Operaciones',
            'Teoría de Grafos',
            'Bases de Datos',
            'Analísis de Sistemas',
            'Lenguaje de Programación II',
            'Circuito Lógico',
            'DIV V',
            'Catedra I'
          ]
        }]
      },
      {
        number: 6,
        sections: [{
          code: '06S-2603-D1',
          subjects: [
            'Diseño de Sistemas',
            'Optimización no Lineal',
            'Procesos Estocásticos',
            'Arquitectura del Computador',
            'Catedra II',
            'Sistemas Operativos',
            'Lenguaje de Programación III',
            'ACO III',
            'DIN VI'
          ]
        }]
      },
      {
        number: 7,
        sections: [{
          code: '07S-2603-D1',
          subjects: [
            'Metología de la Investigación',
            'Geencia de la información',
            'Redes',
            'Simulación y Modelos',
            'SABD',
            'DIN VII',
            'ADM RRHH',
            'Implementación de Sistemas'
          ]
        }]
      },
      {
        number: 8,
        sections: [{
          code: '08S-2603-D1',
          subjects: [
            'Teleprocesos',
            'Teoría de decisiones',
            'Auditoría de Sistemas',
            'Marco Legal para el Ejercicio de la Ingenería',
            'Arquitectura del Softwere',
            'Calidad Total',
            'ACO IV',
            'DIN VIII'
          ]
        }]
      }
    ])

    console.info('Semesters has been seeding 🌱')
  } catch (error) {
    console.error(error)
  }
}
