import { scalarType } from 'nexus'
import { ListValueNode, ObjectValueNode, Kind, FloatValueNode, ValueNode } from 'graphql';

export class Position {
    latitude: number
    longitude: number

    constructor(lat: number, long: number) {
        this.latitude = lat;
        this.longitude = long;
    }
}

export const GraphQLGeoJSONPoint = scalarType({
    name: 'Position',
    asNexusMethod: 'position',
    description: 'A GeoJSON Position',
    serialize(value) {
        if (value instanceof Position) {
            return { coordinates: [value.longitude, value.latitude] }
        }
        else {
            throw Error('GraphQLGeoJSONPoint serializer expected a `Position` object')
        }
    },
    parseValue(value) {
        isPosition(value)

        return new Position(value.coordinates[1], value.coordinates[0])
    },
    parseLiteral(value) {
        if (!isPositionAST(value)) { throw Error('GraphQLGeoJSONPoint parser expected a `Position` object') }

        const valueList = ((value as ObjectValueNode).fields[0].value as ListValueNode).values
        let latitude  = parseFloat((valueList[1] as FloatValueNode).value)
        let longitude = parseFloat((valueList[0] as FloatValueNode).value)

        return new Position(latitude, longitude)
    }
})

type GeoJSONPosition = {
    coordinates: number[]
}

function isPosition(position : unknown) : asserts position is GeoJSONPosition {
    //@ts-ignore - position is expected to be unknown
    if (position.coordinates === undefined) throw Error ('Position must have a "coordinates" property')
    //@ts-ignore - position is expected to be unknown
    if (Object.prototype.toString.call(position.coordinates) !== '[object Array]') throw Error ('Coordinates must be an array')
    //@ts-ignore - position is expected to be unknown
    if (position.coordinates.length != 2 && position.coordinates.length != 3) throw Error ('Coordinates must be have two or three elements')
    //@ts-ignore - position is expected to be unknown
    for (let i = 0; i < position.coordinates.length; i++) {
        //@ts-ignore - position is expected to be unknown
        if ("number" !== typeof position.coordinates[i]) throw Error (`Element ${i} of the cooridinates array must be a number`)
    }
}

function isPositionAST(value: ValueNode) {
    if (value.kind != Kind.OBJECT) throw Error('Position should be a valid JSON object')

    const objectIn : ObjectValueNode = value
    if (objectIn.fields[0].name.value != 'coordinates') { throw Error('Position must have a "coordinates" property') }
    if (objectIn.fields[0].value.kind != Kind.LIST ) { throw Error('Position property "coordinates" must be an array') }

    const valueList : ListValueNode = objectIn.fields[0].value
    if (valueList.values.length != 2 && valueList.values.length != 3) { throw Error('Position property "coordinates" have two or three elements') }

    for (let i = 0; i < valueList.values.length; i++) {
        if (![Kind.INT, Kind.FLOAT].includes(valueList.values[i].kind)) throw Error(`Coordinate value ${i} must be a number`)
    }

    return true
}
