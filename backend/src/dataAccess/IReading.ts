import { ReadingModel } from "./dataTypes";
export interface IReading {
    getById(id: number) : Promise<ReadingModel | null>;
    getMany(maxResults? : number) : Promise<ReadingModel[]>;

    create(reading: ReadingModel) : Promise<ReadingModel | null>;
}