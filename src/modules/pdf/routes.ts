import { Router } from 'express'
import puppeteer from 'puppeteer'

const router = Router()

router.get('/', async (req, res) => {
	const id = req.query.id
	const forType = req.query.for

  try {
		const browser = await puppeteer.launch({
			headless: 'chrome',
			args: [
				'--no-sandbox',
			]
		});

		const page = await browser.newPage()
		await page.goto(`http://54.235.42.140:3000/print?for=${forType}&id=${id}`)
		const pdf = await page.pdf({ format: 'A4' })
		await browser.close()

		res.setHeader('Content-Type', 'application/pdf')
		res.send(pdf)
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
})

export default router