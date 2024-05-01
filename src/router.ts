import { Router } from 'express'
import path from 'node:path'
import fs from 'node:fs'

const router = Router()
const modulesDir = path.resolve(__dirname, 'modules')
const modules = fs.readdirSync(modulesDir)

for (const module of modules) {
  try {
    const modulePath = path.resolve(modulesDir, module)
    const moduleFiles = fs.readdirSync(modulePath)
    const routerFile = moduleFiles.filter(file => file.includes('routes'))[0]
    const routerPath = path.resolve(modulePath, routerFile)

    const moduleRouter: Router = require(routerPath).default

    router.use(`/api/${module}`, moduleRouter)
  } catch (error) {
    console.error('Error to load routes: ', error)
  }
}

export default router
