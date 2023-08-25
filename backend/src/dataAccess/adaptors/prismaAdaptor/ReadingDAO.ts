import { PrismaClient } from "@prisma/client";
import { IReading } from '../../interfaces'
import { ReadingModel } from '../../dataTypes'

export class ReadingDAO implements IReading {
    client : PrismaClient;

    constructor(client : PrismaClient) {
        this.client = client;
    }

    getById(id: number) : Promise<ReadingModel | null> {
        return this.client.reading.findUnique({ where: { id: id}});
    };

    getMany(maxResults? : number) : Promise<ReadingModel[]>
    {
        return this.client.reading.findMany();
    };

    create(reading: ReadingModel) : Promise<ReadingModel | null>
    {
        return this.client.reading.create ( { data: reading } );
    };

}