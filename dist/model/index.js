"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DBModel_name, _DBModel_db;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = exports.DBModel = void 0;
class DBModel {
    constructor(name, db) {
        _DBModel_name.set(this, void 0);
        _DBModel_db.set(this, void 0);
        __classPrivateFieldSet(this, _DBModel_name, name, "f");
        __classPrivateFieldSet(this, _DBModel_db, db, "f");
    }
    // deletes object store entirely
    clean() {
        __classPrivateFieldGet(this, _DBModel_db, "f").deleteObjectStore(__classPrivateFieldGet(this, _DBModel_name, "f"));
    }
    add(entry) {
        const transaction = __classPrivateFieldGet(this, _DBModel_db, "f").transaction(__classPrivateFieldGet(this, _DBModel_name, "f"), 'readwrite');
        const objectStore = transaction.objectStore(__classPrivateFieldGet(this, _DBModel_name, "f"));
        if (Array.isArray(entry)) {
            entry.forEach(object => objectStore.add(object));
        }
        else {
            objectStore.add(entry);
        }
        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
                console.log('hi');
                resolve(entry);
            };
            transaction.onerror = error => {
                reject(error);
            };
        });
    }
}
exports.DBModel = DBModel;
_DBModel_name = new WeakMap(), _DBModel_db = new WeakMap();
class Model {
    constructor(name) {
        this.name = name;
    }
}
exports.Model = Model;
