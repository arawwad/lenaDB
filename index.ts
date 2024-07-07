import { DBModel, Model } from './model'

interface Config<T extends Model> {
  name: string
  dbVersion: number
  models: T[]
}

type Models<T extends Model> = {
[K in T['name']]: DBModel
}


const openDb = <T extends Model>(config: Config<T>) => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(config.name, config.dbVersion)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      config.models.forEach(model => db.createObjectStore(model.name, { keyPath: 'id' }))
    }

    request.onsuccess = ((event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db)
    })
    request.onerror = ((e) => {
      console.error('can not open db')
      reject(e)
    })
  })

}

export const init = async <T extends Model>(config: Config<T>): Promise<Models<T>> => {
  const db = await openDb(config);
  const models = config.models.reduce((acc, model) => {
    acc[model.name] = new DBModel(model.name, db);
    return acc;
  }, {} as Models<T>);
  return models;
};
