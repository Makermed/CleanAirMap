
export const AIR_QUALITY_RATING = {
    UNKNOWN: 'Unknown', // default
    GOOD: 'Good',
    MODERATE: 'Moderate',
    BAD: 'Bad',
};

export const AIR_QUALITY_INDICATOR_COLORS = {
    [AIR_QUALITY_RATING.UNKNOWN]: [85, 85, 85], // grey
    [AIR_QUALITY_RATING.GOOD]: [58, 181, 74], // green
    [AIR_QUALITY_RATING.MODERATE]: [243, 229, 102], // yellow
    [AIR_QUALITY_RATING.BAD]: [211, 4, 4] // red
 };

 export const LOCATION_TYPE = {
    ALL: "all",
    SHOP: "shop",
    MUSEUM: "museum",
    BAR: "bar",
    CAFE: "cafe",
    HOSPITAL: "hospital",
    TRAIN: "train",
    RESTAURANT: "restaurant",
    LIBRARY: "library",
    ARTS: "arts",
    HOTEL: "hotel",
    GASSTATION: "gas",
    PARKING: "parking",
    MOVIE: "movie",
    PARK: "park",
    CAMERA: "camera",
    ARENA: "arena",
    PHARMACY: "pharmacy",
    SCHOOL: "school",
    BEAUTY: "beauty",
    FITNESS: "fitness",
    SENIORS: "seniors",
    PROFESSIONAL: "professional",
    DENTISTS: "dentists",
    DINING: "dining",
};

const locationData = (title, icon, color) => {
    return {
        title: title,
        icon: icon,
        color: color,
    }
}

export const LOCATION_TYPE_DATA = {
    [LOCATION_TYPE.ALL]: locationData("All", "", ""), 
    [LOCATION_TYPE.SHOP]: locationData("Shop", "shop.png", "#12B5CB"),
    [LOCATION_TYPE.MUSEUM]: locationData("Museum", "museum.png", "#12B5CB"),
    [LOCATION_TYPE.BAR]: locationData("Bar", "bar.png", "#EE675C"),
    [LOCATION_TYPE.CAFE]: locationData("Cafe", "cafe.png", "#F29900"),
    [LOCATION_TYPE.HOSPITAL]: locationData("Hospital", "hospital.png", "#5491F5"),
    [LOCATION_TYPE.TRAIN]: locationData("Train", "train.png", "#1A71E5"),
    [LOCATION_TYPE.RESTAURANT]: locationData("Restaurant", "restaurant.png", "#F06292"),
    [LOCATION_TYPE.LIBRARY]: locationData("Library", "library.png", "#34A853"),
    [LOCATION_TYPE.ARTS]: locationData("Arts", "arts.png", "#12B5CB"),
    [LOCATION_TYPE.HOTEL]: locationData("Hotel", "hotel.png", "#EE675C"),
    [LOCATION_TYPE.GASSTATION]: locationData("Gas Station", "gasstation.png", "#F29900"),
    [LOCATION_TYPE.PARKING]: locationData("Parking", "parking.png", "#78909C"),
    [LOCATION_TYPE.MOVIE]: locationData("Movie", "movie.png", "#EE675C"),
    [LOCATION_TYPE.PARK]: locationData("Park", "park.png", "#34A853"),
    [LOCATION_TYPE.CAMERA]: locationData("Camera", "camera.png", "#12B5CB"),
    [LOCATION_TYPE.ARENA]: locationData("Arena", "arena.png", "#EE675C"),
    [LOCATION_TYPE.PHARMACY]: locationData("Pharmacy", "pharmacy.png", "#F29900"),
    [LOCATION_TYPE.SCHOOL]: locationData("School", "school.png", "#34A853"),
    [LOCATION_TYPE.BEAUTY]: locationData("Beauty", "scissors.png", "#12B5CB"),
    [LOCATION_TYPE.FITNESS]: locationData("Fitness/Gym/Yoga/Swimming Pools", "fitness.png", "#EE675C"),
    [LOCATION_TYPE.SENIORS]: locationData("Seniors", "seniors.png", "#F29900"),
    [LOCATION_TYPE.PROFESSIONAL]: locationData("Professional Services", "briefcase.png", "#5491F5"),
    [LOCATION_TYPE.DENTISTS]: locationData("Dentists", "tooth.png", "#1A71E5"),
    [LOCATION_TYPE.DINING]: locationData("Dining", "outdoor-table.png", "#F06292"),
    [LOCATION_TYPE.WORSHIP]: locationData("Place of Worship", "worship.png", "#F06292"),
};