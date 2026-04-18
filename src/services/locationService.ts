import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const fetchLocation = async (forceRefresh = false): Promise<string | null> => {
  try {
    if (!forceRefresh) {
      const saveedCity = await AsyncStorage.getItem("city");
      if (saveedCity) {
        return saveedCity;
      }
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return "Permission denied";
    }

    const loc = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(loc.coords);

    const city =
      address[0]?.city ||
      address[0]?.subregion ||
      address[0]?.region ||
      address[0]?.country ||
      "Unknown";

    return city;
  } catch (error) {
    console.log("Error Fetching Location ", error);
    return "Error";
  }
};

export default fetchLocation;
