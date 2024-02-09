import {
  type Model,
  type Collection,
  type Document,
  type UpdateQuery
} from 'mongoose'

export default class ModuleService<T extends Collection<Document>> {
  model: Model<T>

  constructor (model: Model<T>) {
    this.model = model
  }

  async createOne (data: T): Promise<T> {
    const newDoc = await this.model.create(data)

    return newDoc
  }

  async readAll (): Promise<T[]> {
    const docs = await this.model.find()

    return docs
  }

  async updateOne (_id: string, data: UpdateQuery<T>): Promise<T | null> {
    const updatedDoc = await this.model.findByIdAndUpdate(_id, data, { new: true })

    return updatedDoc
  }

  async deleteOne (_id: string): Promise<T | null> {
    const deletedDoc = await this.model.findByIdAndDelete(_id)

    return deletedDoc
  }
}
