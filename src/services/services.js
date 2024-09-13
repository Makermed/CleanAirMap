import axios from "axios";

export const fetchLocations = async () => {
  try {
    const res = await axios.get("/db/dummyData.json");
    console.log("Data received from API:", res?.data);
    if (!res.data || !res.data.mapdata) {
      throw new Error("Unexpected data format");
    }
    return res.data.mapdata;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};
