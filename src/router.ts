import express, { type RequestHandler } from 'express'
import path from 'node:path'
import fs from 'node:fs'

const router = express.Router()

const modulesPath = path.join(process.cwd(), 'src', 'modules')
const modulesFile = fs.readdirSync(modulesPath)

for (const module of modulesFile) {
  const modulePath = path.join(modulesPath, module)
  const moduleRouterPath = path.join(modulePath, 'router.ts')
  const moduleName = module.split('.')[0]

  import(moduleRouterPath)
    .then((moduleRouter: { default: RequestHandler }) => {
      router.use(`/api/${moduleName}`, moduleRouter.default)
    })
    .catch(err => {
      console.log(`Error to import router for ${module} module: ${err.message}`)
    })
}

export default router
