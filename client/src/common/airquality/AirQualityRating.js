const airQualityData = (label, lower_co2_bound) => {
    return {
        label: label,
        lower_co2_bound: lower_co2_bound,
    }
}

const AirQualityRating = {
    UNKNOWN: airQualityData('Unknown', 0),
    GOOD: airQualityData('Good', 400),
    MODERATE: airQualityData('Moderate', 800),
    BAD: airQualityData('Bad', 1000)
};

export default AirQualityRating;
