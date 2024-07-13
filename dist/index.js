"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const model_1 = require("./model");
const openDb = (config) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(config.name, config.dbVersion);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            config.models.forEach(model => db.createObjectStore(model.name, { keyPath: 'id' }));
        };
        request.onsuccess = ((event) => {
            const db = event.target.result;
            resolve(db);
        });
        request.onerror = ((e) => {
            console.error('can not open db');
            reject(e);
        });
    });
};
const init = (config) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield openDb(config);
    const models = config.models.reduce((acc, model) => {
        // @ts-ignore
        acc[model.name] = new model_1.DBModel(model.name, db);
        return acc;
    }, {});
    return models;
});
exports.init = init;
