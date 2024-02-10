import Semesters from '../../modules/semesters/model'
import { type SemesterSchema } from '../../modules/semesters/definitions'

export async function semestersSeeder (): Promise<void> {
  try {
    await Semesters.create<SemesterSchema[]>([
      {
        number: 0,
        isActive: true,
        sections: [{
          code: '00S-2603-D1',
          subjects: [
            {
              name: 'Lenguaje y comunicación',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Matemática',
              laboratoryHours: 0,
              practiceHours: 4,
              theoryHours: 2
            },
            {
              name: 'Filosofía, ética y valores',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'DIN',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            }
          ]
        }]
      },
      {
        number: 1,
        isActive: true,
        sections: [{
          code: '01S-2603-D1',
          subjects: [
            {
              name: 'Geometría Anaítica',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 3
            },
            {
              name: 'Matemética I',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 4
            },
            {
              name: 'Hombre, Ciencia y Sociedad',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 2
            },
            {
              name: 'Seminario I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 1
            },
            {
              name: 'Educación Ambiental',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 2
            },
            {
              name: 'Dibujo',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 1
            },
            {
              name: 'Inglés I',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 2
            },
            {
              name: 'DIN I',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            }
          ]
        }]
      },
      {
        number: 2,
        isActive: true,
        sections: [{
          code: '02S-2603-D1',
          subjects: [
            {
              name: 'Matemática II',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 4
            },
            {
              name: 'Algebra Lineal',
              laboratoryHours: 0,
              practiceHours: 4,
              theoryHours: 2
            },
            {
              name: 'Química General',
              laboratoryHours: 3,
              practiceHours: 2,
              theoryHours: 2
            },
            {
              name: 'Seminario II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 1
            },
            {
              name: 'Inglés II',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 2
            },
            {
              name: 'Física I',
              laboratoryHours: 2,
              practiceHours: 2,
              theoryHours: 4
            },
            {
              name: 'DIN II',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            },
            {
              name: 'ACO I',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 0
            }
          ]
        }]
      },
      {
        number: 3,
        isActive: true,
        sections: [{
          code: '03S-2603-D1',
          subjects: [
            {
              name: 'Matemática III',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 4
            },
            {
              name: 'Probabilidad y Estadística',
              laboratoryHours: 0,
              practiceHours: 4,
              theoryHours: 2
            },
            {
              name: 'Física II',
              laboratoryHours: 2,
              practiceHours: 2,
              theoryHours: 4
            },
            {
              name: 'Programación',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 2
            },
            {
              name: 'Sistemas Administrativos',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'DIN III',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            }
          ]
        }]
      },
      {
        number: 4,
        isActive: true,
        sections: [{
          code: '04S-2603-D1',
          subjects: [
            {
              name: 'Lógica Matemática',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Lenguaje de Programación I',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'Teoría de Sistemas',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Calculo Numérico',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Sistemas de Producción',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Procesamiento de Datos',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'DIN IV',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            },
            {
              name: 'ACO II',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 0
            }
          ]
        }]
      },
      {
        number: 5,
        isActive: true,
        sections: [{
          code: '05S-2603-D1',
          subjects: [
            {
              name: 'Investigación de Operaciones',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 4
            },
            {
              name: 'Teoría de Grafos',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Bases de Datos',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 3
            },
            {
              name: 'Analísis de Sistemas',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Lenguaje de Programación II',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'Circuito Lógico',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 3
            },
            {
              name: 'DIV V',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            },
            {
              name: 'Catedra I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 2
            }
          ]
        }]
      },
      {
        number: 6,
        isActive: true,
        sections: [{
          code: '06S-2603-D1',
          subjects: [
            {
              name: 'Diseño de Sistemas',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Optimización no Lineal',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 4
            },
            {
              name: 'Procesos Estocásticos',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Arquitectura del Computador',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 4
            },
            {
              name: 'Catedra II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 2
            },
            {
              name: 'Sistemas Operativos',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 3
            },
            {
              name: 'Lenguaje de Programación III',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'ACO III',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 2
            },
            {
              name: 'DIN VI',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            }
          ]
        }]
      },
      {
        number: 7,
        isActive: true,
        sections: [{
          code: '07S-2603-D1',
          subjects: [
            {
              name: 'Metología de la Investigación',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Gerencia de la informática',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 2
            },
            {
              name: 'Redes',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 3
            },
            {
              name: 'Simulación y Modelos',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'SABD',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'DIN VII',
              laboratoryHours: 0,
              practiceHours: 1,
              theoryHours: 3
            },
            {
              name: 'ADM RRHH',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 3
            },
            {
              name: 'Implatación de Sistemas',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            }
          ]
        }]
      },
      {
        number: 8,
        isActive: true,
        sections: [{
          code: '08S-2603-D1',
          subjects: [
            {
              name: 'Teleprocesos',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Teoría de decisiones',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 2
            },
            {
              name: 'Auditoría de Sistemas',
              laboratoryHours: 0,
              practiceHours: 3,
              theoryHours: 3
            },
            {
              name: 'Marco Legal para el Ejercicio de la Ingenería',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'Arquitectura del Softwere',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 4
            },
            {
              name: 'Calidad Total',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 3
            },
            {
              name: 'ACO IV',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 2
            },
            {
              name: 'DIN VIII',
              laboratoryHours: 0,
              practiceHours: 2,
              theoryHours: 2
            }
          ]
        }]
      }
    ])

    console.info('Semesters has been seeding 🌱')
  } catch (error) {
    console.error(error)
  }
}
