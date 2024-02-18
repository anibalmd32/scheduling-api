import fs from 'node:fs'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { type ScheduleSchema } from '../modules/schedules/definitions'

interface Data {
  days: string[]
  hours: string[]
  schedules: ScheduleSchema[]
  classroom?: string
}

export async function generatePDF (
  data: Data,
  templetaPath: string,
  outputPath: string
): Promise<void> {
  Handlebars.registerHelper('subject', function (
    day: string,
    hour: string,
    context
  ) {
    const { schedules, classroom } = context.data.root

    const result = schedules.find((sch: any) => (
      sch.day === day &&
      sch.startTime === hour &&
      sch.classroom === classroom
    ))

    if (result !== undefined) {
      return new Handlebars.SafeString(`
        <td rowspan="${result.extra.hourInterval}">
          ${result.subject} <br/>
          ${result.classroom} <br/>
          ${result.extra.subjectType}
        </td>
      `)
    } else {
      return new Handlebars.SafeString('<td></td>')
    }
  })

  const templeteHTML = fs.readFileSync(templetaPath, 'utf-8')
  const templete = Handlebars.compile(templeteHTML)
  const html = templete(data)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setContent(html)
  await page.pdf({
    path: outputPath,
    format: 'TABLOID'
  })

  await browser.close()
}
