export const LOCATION_TYPE_ALL          = 999;
export const LOCATION_TYPE_SHOP         = 0;
export const LOCATION_TYPE_MUSEUM       = 1;
export const LOCATION_TYPE_BAR          = 2;
export const LOCATION_TYPE_CAFE         = 3;
export const LOCATION_TYPE_HOSPITAL     = 4;
export const LOCATION_TYPE_TRAIN        = 5;
export const LOCATION_TYPE_RESTAURANT   = 6;
export const LOCATION_TYPE_LIBRARY      = 7;
export const LOCATION_TYPE_ARTS         = 8;
export const LOCATION_TYPE_HOTEL        = 9;
export const LOCATION_TYPE_GASSTATION   = 10;
export const LOCATION_TYPE_PARKING      = 11;
export const LOCATION_TYPE_MOVIE        = 12;
export const LOCATION_TYPE_PARK         = 13;
export const LOCATION_TYPE_CAMERA       = 14;
export const LOCATION_TYPE_ARENA        = 15;
export const LOCATION_TYPE_PHARMACY     = 16;
export const LOCATION_TYPE_SCHOOL       = 17;
export const LOCATION_TYPE_BEAUTY       = 18;
export const LOCATION_TYPE_FITNESS      = 19;
export const LOCATION_TYPE_SENIORS      = 20;
export const LOCATION_TYPE_PROFESSIONAL = 21;
export const LOCATION_TYPE_DENTISTS     = 22;
export const LOCATION_TYPE_DINNING      = 23;


export const CONF_LOCATION_TYPES = [
    {
        value: LOCATION_TYPE_ALL,
        name: "All",
        image: "",
        color: ""
    },
    {
        value: LOCATION_TYPE_SHOP,
        name: "Shop",
        image: "shop.png",
        color: "#12B5CB"
    },
    {
        value: LOCATION_TYPE_MUSEUM,
        name: "Museum",
        image: "museum.png",
        color: "#12B5CB"
    },
    {
        value: LOCATION_TYPE_BAR,
        name: "Bar",
        image: "bar.png",
        color: "#EE675C"
    },
    {
        value: LOCATION_TYPE_CAFE,
        name: "Cafe",
        image: "cafe.png",
        color: "#F29900"
    },
    {
        value: LOCATION_TYPE_HOSPITAL,
        name: "Hospital",
        image: "hospital.png",
        color: "#5491F5"
    },
    {
        value: LOCATION_TYPE_TRAIN,
        name: "Train",
        image: "train.png",
        color: "#1A71E5"
    },
    {
        value: LOCATION_TYPE_RESTAURANT,
        name: "Restaurant",
        image: "restaurant.png",
        color: "#F06292"
    },
    {
        value: LOCATION_TYPE_LIBRARY,
        name: "Library",
        image: "library.png",
        color: "#34A853"
    },
    {
        value: LOCATION_TYPE_ARTS,
        name: "Arts",
        image: "arts.png",
        color: "#78909C"
    },
    {
        value: LOCATION_TYPE_HOTEL,
        name: "Hotel",
        image: "hotel.png",
        color: "#EE675C"
    },
    {
        value: LOCATION_TYPE_GASSTATION,
        name: "Gas Station",
        image: "gasstation.png",
        color: "#F29900"
    },
    {
        value: LOCATION_TYPE_PARKING,
        name: "Parking",
        image: "parking.png",
        color: "#78909C"
    },
    {
        value: LOCATION_TYPE_MOVIE,
        name: "Movie",
        image: "movie.png",
        color: "#EE675C"
    },
    {
        value: LOCATION_TYPE_PARK,
        name: "Park",
        image: "park.png",
        color: "#34A853"
    },
    {
        value: LOCATION_TYPE_CAMERA,
        name: "Camera",
        image: "camera.png",
        color: "#12B5CB"
    },
    {
        value: LOCATION_TYPE_ARENA,
        name: "Arena",
        image: "arena.png",
        color: "#EE675C"
    },
    {
        value: LOCATION_TYPE_PHARMACY,
        name: "Pharmacy",
        image: "pharmacy.png",
        color: "#F29900"
    },
    {
        value: LOCATION_TYPE_SCHOOL,
        name: "School",
        image: "school.png",
        color: "#34A853"
    },
    {
        value: LOCATION_TYPE_BEAUTY,
        name: "Beauty/Hair/Nils/Weight",
        image: "scissors.png",
        color: "#12B5CB"
    },
    {
        value: LOCATION_TYPE_FITNESS,
        name: "Fitness/Gym/Yoga/Swimming Pools",
        image: "fitness.png",
        color: "#EE675C"
    },
    {
        value: LOCATION_TYPE_SENIORS,
        name: "Seniors Residence",
        image: "seniors.png",
        color: "#F29900"
    },
    {
        value: LOCATION_TYPE_PROFESSIONAL,
        name: "Professional Services(Legal, Accounting, etc)",
        image: "briefcase.png",
        color: "#5491F5"
    },
    {
        value: LOCATION_TYPE_DENTISTS,
        name: "Dentists",
        image: "tooth.png",
        color: "#1A71E5"
    },
    {
        value: LOCATION_TYPE_DINNING,
        name: "Outdoor Dinning",
        image: "outdoor-table.png",
        color: "#F06292"
    }
];


export const MASK_ALL                   = 999;
export const MASK_NOT_REQUIRED          = 0;
export const MASK_STAFF                 = 1;
export const MASK_REQUIRED              = 2;

export const CONF_MASKS = [
    {
        value: MASK_ALL,
        name: "All",
        image: ""
    },
    {
        value: MASK_NOT_REQUIRED,
        name: "No Masks",
        image: "mask-not.png"
    },
    {
        value: MASK_STAFF,
        name: "Employees",
        image: "mask-half.png"
    },
    {
        value: MASK_REQUIRED,
        name: "Required",
        image: "mask.png"
    },
];


export const AIR_QUALITY_GOOD   = 0;
export const AIR_QUALITY_MEDIUM = 1;
export const AIR_QUALITY_BAD    = 2;

export const CONF_AIR_QUALITY_COLORS = [
    {
        value: AIR_QUALITY_GOOD,
        color: "#3AB54A"
    },
    {
        value: AIR_QUALITY_MEDIUM,
        color: "#F3E566"
    },
    {
        value: AIR_QUALITY_BAD,
        color: "#D30404"
    }
];

export const CO2_MIN = 400;
export const CO2_MAX = 9999;
export const CO2_QUALITY_MEDIUM = 800;
export const CO2_QUALITY_BAD = 1000;

export const ACH_MIN = 0;
export const ACH_MAX = 100;
export const ACH_QUIALITY_MEDIUM = 6;
export const ACH_QUIALITY_BAD = 2;

// location setting
export const LOCATION_READINGS_DISABLE_ALL          = 0;
export const LOCATION_READINGS_DISABLE_COMMENTS     = 1;
export const LOCATION_READINGS_ALLOW_UNMODERATED    = 2;
export const LOCATION_READINGS_ONLY_APPROVED        = 3;
export const LOCATION_READINGS_DELETEALL            = 4;

// map view all or 90days
export const MAP_VIEW_ALL       = 0;
export const MAP_VIEW_90D       = 1;
