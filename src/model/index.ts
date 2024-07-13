export class DBModel {
  #name: string
  #db: IDBDatabase

  constructor(name: string, db: IDBDatabase) {
    this.#name = name
    this.#db = db
  }

  // deletes object store entirely
  clean() {
    this.#db.deleteObjectStore(this.#name)
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
        console.log('hi')
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
