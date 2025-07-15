import AsyncStorage from "@react-native-async-storage/async-storage";

// 1. Declare the union once so every file shares the same type
export type Unit = "metric" | "imperial";

const UNIT_KEY = "weather_unit";

/** Return the saved unit, defaulting to "metric". */
export async function getUnit(): Promise<Unit> {
  const saved = await AsyncStorage.getItem(UNIT_KEY);
  // Only allow the two valid strings. Anything else → "metric"
  return saved === "imperial" ? "imperial" : "metric";
}

export async function setUnit(unit: Unit) {
  await AsyncStorage.setItem(UNIT_KEY, unit);
}
