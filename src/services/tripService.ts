const TRIP_API_URL = import.meta.env.VITE_TRIP_API_URL;

export const getTripData = async (keyword?: string) => {
  try {
    const response = await fetch(`${TRIP_API_URL}/trips?keyword=${keyword}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
