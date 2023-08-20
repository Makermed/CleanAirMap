import entertainmentIcon from '@iconify/icons-mdi/theatre';
import healthIcon from '@iconify/icons-mdi/health-potion';
import shoppingIcon from '@iconify/icons-fa-solid/shopping-cart';
import communityIcon from '@iconify/icons-healthicons/community-meeting';
import diningIcon from '@iconify/icons-mdi/silverware';
import travelIcon from '@iconify/icons-mdi/travel';
import schoolIcon from '@iconify/icons-fa-solid/school';
import airIcon from '@iconify/icons-fa-solid/wind';

const locationCategoryData = (label, icon) => {
    return {
        label: label,
        icon: icon,
    }
}

const LocationCategory = {
    ARTS_AND_ENTERTAINMENT: locationCategoryData("Arts & Entertainment", entertainmentIcon),
    HEALTH_AND_BEAUTY: locationCategoryData("Health & Beauty", healthIcon),
    SERVICES_AND_RETAIL: locationCategoryData("Retail & Professional Services", shoppingIcon),
    COMMUNITY: locationCategoryData("Community and Public Spaces", communityIcon),
    FOOD_AND_DRINK: locationCategoryData("Food and Drink", diningIcon),
    TRAVEL: locationCategoryData("Travel", travelIcon),
    EDUCATION: locationCategoryData("Education", schoolIcon),
    OTHER: locationCategoryData("Other", airIcon),
}

export default LocationCategory;