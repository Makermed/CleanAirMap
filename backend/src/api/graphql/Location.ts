import { arg, floatArg, objectType, enumType, inputObjectType } from 'nexus'
import { extendType } from 'nexus'
import { stringArg, nonNull, intArg } from 'nexus'
import { Position } from './GraphQLPosition'
import { LocationModel } from '../../dataAccess/dataTypes'
import { IDataAdaptor } from "../../dataAccess/interfaces";

export const locationInputToModel = (db : IDataAdaptor, input) : Promise<LocationModel | null> => {
    const location = {
        name: input.properties.name,
        full_address: input.properties.full_address,
        feature_type: input.properties.feature_type ?? null,
        geometry: input.geometry,
        created_id: 1
    }
    
    return db.locationDAO.create(location)
}

export const POIProperties = objectType({
    name: 'POIProperties',
    definition(t) {
        t.nonNull.string('name'),
        t.nonNull.string('full_address'),
        t.string('feature_type')
    }
})
export const POIPropertiesInputType = inputObjectType({
    name: 'POIPropertiesInputType',
    definition(t) {
        t.nonNull.string('name'),
        t.nonNull.string('full_address'),
        t.string('feature_type')
    }
})
export const Location = objectType({
    name: 'Location',
    sourceType: 'LocationModel',
    definition(t) {
        t.nonNull.field('type', {
            type: 'String',
            description: "GeoJSON type. Always 'Feature'",
            resolve: () => { return "Feature" }
        }),
        t.nonNull.field('id', {
            type: 'Int',
            description: "The CleanAirDB ID for this feature",
            resolve: (model) => { return model.locationId }
        }),
        t.jsonObject('geometry'),
        t.nonNull.field('properties', {
            type: 'POIProperties',
            description: "Properties of the location",
            resolve: (model) => {
                return {
                    name: model.name,
                    full_address: model.full_address,
                    feature_type: model.feature_type
                }
            }
        })
        t.list.nonNull.field('rooms', {
            type: 'Room',
            resolve: (parent, _, ctx) => {
                return ctx.db.locationDAO.getRooms(parent.locationId);
            }
        }),
        t.list.nonNull.field('readings', {
            type: 'Reading',
            resolve: (parent, _, ctx) => {
                return ctx.db.locationDAO.getReadings(parent.locationId);
            }
        })
    },
})

export const LocationInputType = inputObjectType({
    name: 'LocationInputType',
    definition(t) {
        t.nonNull.field('type', {
            type: 'String',
            description: "GeoJSON type. Always 'Feature'",
        }),
        t.nonNull.jsonObject('geometry'),
        t.nonNull.field('properties', {
            type: 'POIPropertiesInputType',
            description: "Properties of the location"
        })
    },
})

export const LocationQuery = extendType({
    type: 'Query',
    definition(t) {
        t.list.field('locations', {
            type: 'Location',
            args: { locationId: intArg()},
            async resolve(_root, _args, ctx) {
                if (_args == null || _args.locationId == null) {
                    return ctx.db.locationDAO.getMany();
                }
                if (_args != null && _args.locationId != null) {
                    const single = await ctx.db.locationDAO.getById(_args.locationId);
                    return [ single ] ;
                }
                return null;
            }
        })
    },
})

export const LocationMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createLocation', {
            type: 'Location',
            args: { data: nonNull(LocationInputType) },
            resolve(_root, args, ctx) {
                return locationInputToModel(ctx.db, args.data)
            }
        })
    }
})