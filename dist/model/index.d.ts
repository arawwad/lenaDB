export declare class DBModel {
    #private;
    constructor(name: string, db: IDBDatabase);
    clean(): void;
    add(entry: any): Promise<unknown>;
}
export declare class Model {
    name: string;
    constructor(name: string);
}
