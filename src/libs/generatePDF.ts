import fs from 'node:fs'
import Handlebars from 'handlebars'
import puppeteer from 'puppeteer'
import { type ScheduleSchema } from '../modules/schedules/definitions'

interface Data {
  days: string[]
  hours: string[]
  schedules: ScheduleSchema[]
}

export async function generatePDF (
  data: Data,
  templetaPath: string,
  outputPath: string
): Promise<void> {
  Handlebars.registerHelper('getSubject', (
    day: string,
    hour: string
  ): string | undefined => {
    const result = data.schedules.find(sch => (
      sch.day === day &&
      sch.startTime === hour
    ))

    return result?.subject
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
