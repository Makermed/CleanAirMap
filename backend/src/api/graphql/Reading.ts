import { objectType, enumType, inputObjectType, extendType, nonNull } from 'nexus'
import { locationInputToModel } from './Location'
import { LocationModel } from '../../dataAccess/dataTypes'

export const ReadingUnitEnum = enumType({
    name: "ReadingUnitEnum",
    members: { PPM_CO2: "ppm CO2" },
    description: 'The supported units for air quality readings'
})

export const Reading = objectType({
    name: 'Reading',
    sourceType: 'ReadingModel',
    definition(t) {
        t.nonNull.int('id'),
        t.nonNull.float('value'),
        t.nonNull.field('unit', { type: ReadingUnitEnum }),
        t.nonNull.field('location', {
            type: 'Location',
            resolve: async (reading, _, ctx) => {
                const locationModel = await ctx.db.locationDAO.getById(reading.locationId)
                if (locationModel === null) {
                    throw Error('Invalid reading: readings must have a location')
                }
                return locationModel
            }
        }),
        t.string('notes'),
        t.nonNull.datetime('created_at')
    }
})

export const ReadingInputType = inputObjectType({
    name: 'ReadingInputType',
    definition(t) {
        t.nonNull.float('value'),
        t.nonNull.field('unit', { type: ReadingUnitEnum }),
        t.string('notes')
    },
})

export const AddReadingInputType = inputObjectType({
    name: 'AddReadingInputType',
    definition(t) {
        t.nonNull.int('locationId'),
        t.nonNull.field('reading', { type: ReadingInputType})
    },
})

export const AddReadingPayload = objectType({
    name: 'AddReadingPayload',
    definition(t) {
        t.field('reading', { type: Reading })
    },
})

export const AddReadingNewLocationInputType = inputObjectType({
    name: 'AddReadingNewLocationInputType',
    definition(t) {
        t.nonNull.field('location', { type: 'LocationInputType'}),
        t.nonNull.field('reading', { type: 'ReadingInputType'})
    },
})

export const AddReadingNewLocationPayload = objectType({
    name: 'AddReadingNewLocationPayload',
    definition(t) {
        t.nonNull.field('location', { type: 'Location'}),
        t.nonNull.field('reading', { type: 'Reading'})
    },
})

export const ReadingQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('readings', {
            type: 'Reading',
            resolve(_root, args, ctx) {
                return ctx.db.readingDAO.getMany()
            }
        })
    },
})

export const addReadingNewLocation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addReadingNewLocation', {
            type: 'AddReadingNewLocationPayload',
            args: { input: nonNull(AddReadingNewLocationInputType) },
            async resolve(_root, args, ctx) {
                const newLocation = await locationInputToModel(ctx.db, args.input.location)
                if (newLocation === null) {
                    throw Error("Could not create the location")
                }


                const readingModel = {
                    locationId: newLocation.locationId,
                    roomId: null,
                    value: args.input.reading.value,
                    unit: args.input.reading.unit,
                    notes: args.input.reading.notes,
                    created_id: 1
                }
                //@ts-ignore: missing ID and creation time will be supplied by the DB
                // TODO: make the type of IReadingDAO.create more correct
                const newReading = await ctx.db.readingDAO.create(readingModel)
                if (newReading === null) {
                    throw Error("Could not create the reading")
                }
                const payload = { location: newLocation, reading: newReading }
                return payload
            }
        }
        )
    }
})

export const addReading = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('addReading', {
            type: 'AddReadingPayload',
            args: { input: nonNull(AddReadingInputType) },
            async resolve(_root, args, ctx) {
                const readingModel = {
                    locationId: args.input.locationId,
                    roomId: null,
                    value: args.input.reading.value,
                    unit: args.input.reading.unit,
                    notes: args.input.reading.notes,
                    created_id: 1
                }
                //@ts-ignore: missing ID and creation time will be supplied by the DB
                // TODO: make the type of IReadingDAO.create more correct
                const newReading = await ctx.db.readingDAO.create(readingModel)
                return { reading: newReading }
            }
        })
    }
})