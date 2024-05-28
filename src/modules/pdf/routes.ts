import { Router } from 'express'
import { chromium } from 'playwright'

const router = Router()

router.get('/', async (req, res) => {
	const id = req.query.id
	const forType = req.query.for

  try {
		const browser = await chromium.launch()

		const page = await browser.newPage()
		await page.goto(`http://localhost:5173/print?for=${forType}&id=${id}`)
		await page.emulateMedia({ media: 'screen' });
		const pdf = await page.pdf({
			width: 1280,
			height: 800,
		})
		await browser.close()

		res.setHeader('Content-Type', 'application/pdf')
		res.send(pdf)
	} catch (error: any) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
})

export default router