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
export const LOCATION_TYPE_WORSHIP      = 24;  

const location_colors = {
    lightblue: {
        dark: {
            stroke: "#12B5CB",
            fill: "#021214",
        },
        light: {
            stroke: "#12B5CB",
            fill: "#F7FCFD",
        },
    },
    pink: {
        dark: {
            stroke: "#F06292",
            fill: "#180A0F",
        },
        light: {
            stroke: "#F06292",
            fill: "#FEFAFB",
        },
    },
    lightred: {
        dark: {
            stroke: "#EE675C",
            fill: "#180A09",
        },
        light: {
            stroke: "#EE675C",
            fill: "#FEFAFA",
        },
    },
    green: {
        dark: {
            stroke: "#71C387",
            fill: "#0B130D",
        },
        light: {
            stroke: "#71C387",
            fill: "#FAFDFB",
        },
    },
    purple: {
        dark: {
            stroke: "#88B2F8",
            fill: "#0E1219",
        },
        light: {
            stroke: "#88B2F8",
            fill: "#FBFCFE",
        },
    },
    blue: {
        dark: {
            stroke: "#5F9CED",
            fill: "#091018",
        },
        light: {
            stroke: "#5F9CED",
            fill: "#FAFCFE",
        },
    },
    orange: {
        dark: {
            stroke: "#F6B84D",
            fill: "#191208",
        },
        light: {
            stroke: "#F6B84D",
            fill: "#FEFCF9",
        },
    },
    grey: {
        dark: {
            stroke: "#A1B2BA",
            fill: "#101213",
        },
        light: {
            stroke: "#A1B2BA",
            fill: "#FCFCFD",
        },
    },
};

export const CONF_LOCATION_TYPES = [
    {
        value: LOCATION_TYPE_ALL,
        name: "All",
        image: "",
        color: location_colors.lightblue
    },
    {
        value: LOCATION_TYPE_DINNING,
        name: "Outdoor Dinning",
        image: "outdoor-table.png",
        color: location_colors.grey
    },
    {
        value: LOCATION_TYPE_SHOP,
        name: "Shop",
        image: "shop.png",
        color: location_colors.lightblue
    },
    {
        value: LOCATION_TYPE_MUSEUM,
        name: "Museum",
        image: "museum.png",
        color: location_colors.pink
    },
    {
        value: LOCATION_TYPE_BAR,
        name: "Bar",
        image: "bar.png",
        color: location_colors.lightred
    },
    {
        value: LOCATION_TYPE_CAFE,
        name: "Cafe",
        image: "cafe.png",
        color: location_colors.green
    },
    {
        value: LOCATION_TYPE_HOSPITAL,
        name: "Hospital",
        image: "hospital.png",
        color: location_colors.purple
    },
    {
        value: LOCATION_TYPE_TRAIN,
        name: "Train",
        image: "train.png",
        color: location_colors.blue
    },
    {
        value: LOCATION_TYPE_RESTAURANT,
        name: "Restaurant",
        image: "restaurant.png",
        color: location_colors.orange
    },
     {
        value: LOCATION_TYPE_WORSHIP,
        name: "Places of worship",
        image: "worship.png",
        color: location_colors.green

    },
    {
        value: LOCATION_TYPE_LIBRARY,
        name: "Library",
        image: "library.png",
        color: location_colors.grey
    },
    {
        value: LOCATION_TYPE_ARTS,
        name: "Arts",
        image: "arts.png",
        color: location_colors.lightblue
    },
    {
        value: LOCATION_TYPE_HOTEL,
        name: "Hotel",
        image: "hotel.png",
        color: location_colors.pink
    },
    {
        value: LOCATION_TYPE_GASSTATION,
        name: "Gas Station",
        image: "gasstation.png",
        color: location_colors.lightred
    },
    {
        value: LOCATION_TYPE_PARKING,
        name: "Parking",
        image: "parking.png",
        color: location_colors.green
    },
    {
        value: LOCATION_TYPE_MOVIE,
        name: "Movie",
        image: "movie.png",
        color: location_colors.purple
    },
    {
        value: LOCATION_TYPE_PARK,
        name: "Park",
        image: "park.png",
        color: location_colors.blue
    },
    {
        value: LOCATION_TYPE_CAMERA,
        name: "Camera",
        image: "camera.png",
        color: location_colors.orange
    },
    {
        value: LOCATION_TYPE_ARENA,
        name: "Arena",
        image: "arena.png",
        color: location_colors.grey
    },
    {
        value: LOCATION_TYPE_PHARMACY,
        name: "Pharmacy",
        image: "pharmacy.png",
        color: location_colors.lightblue
    },
    {
        value: LOCATION_TYPE_SCHOOL,
        name: "School",
        image: "school.png",
        color: location_colors.pink
    },
    {
        value: LOCATION_TYPE_BEAUTY,
        name: "Beauty/Hair/Nils/Weight",
        image: "scissors.png",
        color: location_colors.lightred
    },
    {
        value: LOCATION_TYPE_FITNESS,
        name: "Fitness/Gym/Yoga/Swimming Pools",
        image: "fitness.png",
        color: location_colors.green
    },
    {
        value: LOCATION_TYPE_SENIORS,
        name: "Seniors Residence",
        image: "seniors.png",
        color: location_colors.purple
    },
    {
        value: LOCATION_TYPE_PROFESSIONAL,
        name: "Professional Services(Legal, Accounting, etc)",
        image: "briefcase.png",
        color: location_colors.blue
    },
    {
        value: LOCATION_TYPE_DENTISTS,
        name: "Dentists",
        image: "tooth.png",
        color: location_colors.orange
    },
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
export const AIR_QUALITY_NORMAL = 3;
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
        color: "#E91720"
    },
    {
        value: AIR_QUALITY_NORMAL,
        color: "#646b6e"
    },
];

export const CO2_MIN = 400;
export const CO2_MAX = 9999;
export const CO2_QUALITY_MEDIUM = 800;
export const CO2_QUALITY_BAD = 1000;

export const ACH_MIN = 0;
export const ACH_MAX = 100;
export const ACH_QUIALITY_MEDIUM = 6;
export const ACH_QUIALITY_BAD = 2;

// adjust activity
export const ADJACT_SEDENTARY = 0;
export const ADJACT_MODERATE = 1;
export const ADJACT_HEAVY = 2;

export const CONF_ADJUST_ACTIVITIES = [
    {
        value: ADJACT_SEDENTARY,
        label: "Sedentary",
        cfm: 0.01134,
    },
    {
        value: ADJACT_MODERATE,
        label: "Moderate",
        cfm: 0.03255,
    },
    {
        value: ADJACT_HEAVY,
        label: "Heavy",
        cfm: 0.6468,
    }
];

// location setting
export const LOCATION_READINGS_DISABLE_ALL          = 0;
export const LOCATION_READINGS_DISABLE_COMMENTS     = 1;
export const LOCATION_READINGS_ALLOW_UNMODERATED    = 2;
export const LOCATION_READINGS_ONLY_APPROVED        = 3;
export const LOCATION_READINGS_DELETEALL            = 4;

// map view all or 90days
export const MAP_VIEW_ALL       = 0;
export const MAP_VIEW_90D       = 1;
export const ADD_LOCATION = "#5F9CED";
