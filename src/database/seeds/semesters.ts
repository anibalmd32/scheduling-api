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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Matemática',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Filosofía, ética y valores',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Matemética I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Hombre, Ciencia y Sociedad',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Seminario I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Educación Ambiental',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Dibujo',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Inglés I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Algebra Lineal',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Química General',
              laboratoryHours: 3,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Seminario II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Inglés II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Física I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'ACO I',
              laboratoryHours: 0,
              practiceHours: 0,
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Probabilidad y Estadística',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Física II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Programación',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Sistemas Administrativos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Lenguaje de Programación I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Teoría de Sistemas',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Calculo Numérico',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Sistemas de Producción',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Procesamiento de Datos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN IV',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'ACO II',
              laboratoryHours: 0,
              practiceHours: 0,
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Teoría de Grafos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Bases de Datos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Analísis de Sistemas',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Lenguaje de Programación II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Circuito Lógico',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIV V',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Catedra I',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Optimización no Lineal',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Procesos Estocásticos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Arquitectura del Computador',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Catedra II',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Sistemas Operativos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Lenguaje de Programación III',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'ACO III',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN VI',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Gerencia de la informática',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Redes',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Simulación y Modelos',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'SABD',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN VII',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'ADM RRHH',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Implatación de Sistemas',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Teoría de decisiones',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Auditoría de Sistemas',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Marco Legal para el Ejercicio de la Ingenería',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Arquitectura del Softwere',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'Calidad Total',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'ACO IV',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
            },
            {
              name: 'DIN VIII',
              laboratoryHours: 0,
              practiceHours: 0,
              theoryHours: 0
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
