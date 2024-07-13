import { DBModel, Model } from './model';
interface Config<T extends Model> {
    name: string;
    dbVersion: number;
    models: T[];
}
type Models<T extends Model> = {
    [K in T['name']]: DBModel;
};
export declare const init: <T extends Model>(config: Config<T>) => Promise<Models<T>>;
export {};
