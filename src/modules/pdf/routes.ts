import { Router } from 'express'
import puppeteer from 'puppeteer'

const router = Router()

router.get('/', async (req, res) => {
	const id = req.query.id
	const forType = req.query.for

  try {
		const browser = await puppeteer.launch({
			executablePath: '/usr/bin/chromium-browser',
			headless: 'shell',
			args: [
				"--disable-gpu",
				"--disable-dev-shm-usage",
				"--disable-setuid-sandbox",
				"--no-first-run",
				"--no-sandbox",
				"--no-zygote",
				"--single-process",
			],
			ignoreDefaultArgs: [
				'--disable-extensions',
			]
		})
		
		const page = await browser.newPage()
		await page.goto(`http://100.27.219.153:3000/print?for=${forType}&id=${id}`)
		const pdf = await page.pdf({ format: 'A4' })
		await browser.close()

		res.setHeader('Content-Type', 'application/pdf')
		res.send(pdf)
	} catch (error: any) {
		res.status(500).json({ error: error.message })
	}
})

export default router