import { LocationType } from 'common/location';

const STORAGE_TYPE_TO_LOCATION_TYPE = {
    999: LocationType.UNKNOWN,
    0: LocationType.SHOP,
    1: LocationType.MUSEUM,
    2: LocationType.BAR,
    3: LocationType.CAFE,
    4: LocationType.HOSPITAL,
    5: LocationType.TRAIN,
    6: LocationType.RESTAURANT,
    7: LocationType.LIBRARY,
    8: LocationType.ARTS,
    9: LocationType.HOTEL,
    10: LocationType.GASSTATION,
    11: LocationType.PARKING,
    12: LocationType.MOVIE,
    13: LocationType.PARK,
    14: LocationType.CAMERA,
    15: LocationType.ARENA,
    16: LocationType.PHARMACY,
    17: LocationType.SCHOOL,
    18: LocationType.BEAUTY,
    19: LocationType.FITNESS,
    20: LocationType.SENIORS,
    21: LocationType.PROFESSIONAL,
    22: LocationType.DENTIST,
    23: LocationType.RESTAURANT,
    24: LocationType.WORSHIP,
};

const locationTypeFieldPolicy = (value = "", {readField}) => {
    const storageTypeId = readField('type');
    return STORAGE_TYPE_TO_LOCATION_TYPE[storageTypeId] || LocationType.UNKNOWN;
};

export default locationTypeFieldPolicy;