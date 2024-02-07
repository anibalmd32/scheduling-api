import { type Request, type Response } from 'express'
import { type Collection, type Document } from 'mongoose'

import type ModuleService from './ModuleService'

export default class ModuleController<T extends Collection<Document>> {
  service: ModuleService<T>

  constructor (service: ModuleService<T>) {
    this.service = service
  }

  async post (req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.createOne(req.body as T)
      res.status(201).json({ data })
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  async get (req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.readAll()
      res.status(200).json({ data })
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  async update (req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.updateOne(req.params.id, req.body as T)
      res.status(200).json({ data })
    } catch (error) {
      res.status(400).json({ error })
    }
  }

  async delete (req: Request, res: Response): Promise<void> {
    try {
      const data = await this.service.deleteOne(req.params.id)
      res.status(200).json({ data })
    } catch (error) {
      res.status(400).json({ error })
    }
  }
}
