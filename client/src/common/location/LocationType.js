import LocationCategory from "./LocationCategory";

import airIcon from '@iconify/icons-fa-solid/wind';
import shoppingIcon from '@iconify/icons-mdi/basket';
import museumIcon from '@iconify/icons-mdi/bank';
import barIcon from '@iconify/icons-mdi/glass-cocktail';
import cafeIcon from '@iconify/icons-fa-solid/coffee';
import arenaIcon from '@iconify/icons-mdi/stadium';
import hospitalIcon from '@iconify/icons-fa-solid/hospital-symbol';
import trainIcon from '@iconify/icons-mdi/train';
import foodIcon from '@iconify/icons-mdi/food';
import libraryIcon from '@iconify/icons-mdi/bookshelf';
import artsIcon from '@iconify/icons-mdi/theatre';
import hotelIcon from '@iconify/icons-mdi/bed';
import gasStationIcon from '@iconify/icons-mdi/gas-station';
import parkingIcon from '@iconify/icons-fa-solid/parking';
import movieIcon from '@iconify/icons-mdi/movie-roll';
import benchIcon from '@iconify/icons-mdi/bench-back';
import cameraIcon from '@iconify/icons-mdi/camera';
import pharmacyIcon from '@iconify/icons-mdi/mortar-pestle-plus';
import schoolIcon from '@iconify/icons-fa-solid/school';
import beautyIcon from '@iconify/icons-map/beauty-salon';
import gymIcon from '@iconify/icons-map/gym';
import elderlyIcon from '@iconify/icons-healthicons/elderly';
import briefcaseIcon from '@iconify/icons-mdi/briefcase';
import dentistIcon from '@iconify/icons-mdi/dentist';
import prayingIcon from '@iconify/icons-fa-solid/praying-hands';


const locationTypeData = (label, icon, category) => {
    return {
        label: label,
        icon: icon,
        category: category
    }
}

const LocationType = {
    UNKNOWN: locationTypeData("Uncategorized", airIcon, LocationCategory.OTHER),
    SHOP: locationTypeData("Shop", shoppingIcon, LocationCategory.SERVICES_AND_RETAIL),
    MUSEUM: locationTypeData("Museum", museumIcon, LocationCategory.ARTS_AND_ENTERTAINMENT),
    BAR: locationTypeData("Bar", barIcon, LocationCategory.FOOD_AND_DRINK),
    CAFE: locationTypeData("Cafe", cafeIcon, LocationCategory.FOOD_AND_DRINK),
    HOSPITAL: locationTypeData("Hospital", hospitalIcon, LocationCategory.HEALTH_AND_BEAUTY),
    TRAIN: locationTypeData("Train", trainIcon, LocationCategory.TRAVEL),
    RESTAURANT: locationTypeData("Restaurant", foodIcon, LocationCategory.FOOD_AND_DRINK),
    LIBRARY: locationTypeData("Library", libraryIcon, LocationCategory.COMMUNITY),
    ARTS: locationTypeData("Arts", artsIcon, LocationCategory.ARTS_AND_ENTERTAINMENT),
    HOTEL: locationTypeData("Hotel", hotelIcon, LocationCategory.TRAVEL),
    GASSTATION: locationTypeData("Gas Station", gasStationIcon, LocationCategory.TRAVEL),
    PARKING: locationTypeData("Parking", parkingIcon, LocationCategory.TRAVEL),
    MOVIE: locationTypeData("Movie", movieIcon,  LocationCategory.ARTS_AND_ENTERTAINMENT),
    PARK: locationTypeData("Park", benchIcon, LocationCategory.COMMUNITY),
    CAMERA: locationTypeData("Photography", cameraIcon, LocationCategory.SERVICES_AND_RETAIL),
    ARENA: locationTypeData("Arena", arenaIcon, LocationCategory.ARTS_AND_ENTERTAINMENT),
    PHARMACY: locationTypeData("Pharmacy", pharmacyIcon, LocationCategory.HEALTH_AND_BEAUTY),
    SCHOOL: locationTypeData("School", schoolIcon, LocationCategory.EDUCATION),
    BEAUTY: locationTypeData("Beauty Services", beautyIcon, LocationCategory.HEALTH_AND_BEAUTY),
    FITNESS: locationTypeData("Fitness/Gym/Yoga/Swimming Pools", gymIcon, LocationCategory.HEALTH_AND_BEAUTY),
    SENIORS: locationTypeData("Seniors", elderlyIcon, LocationCategory.COMMUNITY),
    PROFESSIONAL: locationTypeData("Professional Services", briefcaseIcon, LocationCategory.SERVICES_AND_RETAIL),
    DENTIST: locationTypeData("Dentist", dentistIcon, LocationCategory.HEALTH_AND_BEAUTY),
    WORSHIP: locationTypeData("Place of Worship", prayingIcon, LocationCategory.COMMUNITY),
};

export default LocationType;