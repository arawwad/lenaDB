export class DBModel {
  #name: string
  #db: IDBDatabase

  constructor(private name: string, private db: IDBDatabase) {
    this.#name = name
    this.#db = db
  }

  add(entry: any) {
    const transaction = this.#db.transaction(this.#name, 'readwrite')
    const objectStore = transaction.objectStore(this.#name)
    if (Array.isArray(entry)) {
      entry.forEach(object => objectStore.add(object))
    } else {
     objectStore.add(entry)
    }
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        resolve(entry)
      }
      transaction.onerror = error => {
        reject(error)
      }
    })
  }
}

export class Model {

  constructor(public name: string) { }
}
