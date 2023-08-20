import { IDataAdaptor } from "../dataAccess/interfaces";
import { PrismaDataAdaptor } from "../dataAccess/adaptors/prismaAdaptor/adaptor";
import { makeSchema } from 'nexus'
import { Location, Room } from './graphql'
import { LegacyAdaptor } from "../dataAccess/adaptors/legacyAdaptor/adaptor";
import dotenv from 'dotenv'

dotenv.config()

export interface Context {
    db: IDataAdaptor
}

export const createContext = async () => ({
    db: new PrismaDataAdaptor()
})

export const createLegacyContext = async () => ({
    db: new LegacyAdaptor(process.env.USE_LEGACY_ENDPOINT || "")
});

