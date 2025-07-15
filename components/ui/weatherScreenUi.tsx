import { getUnit } from "@/libs/storage";
import * as Location from "expo-location";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, ImageBackground, Pressable, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";

const ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

type Weather = {
    name: string;
    main: { temp: number; feels_like: number; humidity: number };
    weather: { main: string; description: string }[];
};

export default function WeatherScreenUi() {
    // const [unit, setUnit] = useState<Unit>("metric");
    const [city, setCity] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [data, setData] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const apiKey = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

    /** fetch weather */
    const load = useCallback(
        async (_city?: string) => {
            try {
            setLoading(true);

            const q = _city ?? city;
            const url = q
                ? `${ENDPOINT}?q=${encodeURIComponent(q)}&units=${unit}&appid=${apiKey}`
                : await coordsUrl();

            const res  = await fetch(url);
            const json = await res.json();

            if (!res.ok) {
                // OpenWeather always returns {cod, message} on error
                throw new Error(json?.message || "Failed to fetch weather");
            }

            setData(json as Weather);
            if (q) setCity(q);
            } catch (err: any) {
            console.warn(err);
            Alert.alert("Weather error", err.message ?? "Unknown error");
            setData(null);          // clear old data so UI doesn't try to read it
            } finally {
            setLoading(false);
            setRefreshing(false);
            }
        },
        [city, unit, apiKey]
    );


    /** coords → URL helper */
    async function coordsUrl() {
        const { status } = await Location.requestForegroundPermissionsAsync(); //ask permission from user for location
        if (status !== "granted") {
            throw new Error("Location permission denied");
        }
        const loc = await Location.getCurrentPositionAsync({});
        return `${ENDPOINT}?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=${unit}&appid=${apiKey}`;
    }

    /** pull to refresh */
    const onRefresh = () => { setRefreshing(true); load(); };

    /** load unit pref & first weather once screen appears */
    useFocusEffect(
        useCallback(() => {
            (async () => {
            setUnit(await getUnit());  
            await load();
            })();
        }, [])
    );

    return (
        <ImageBackground
            source={require("@/assets/images/weather3.jpg")}
            resizeMode="cover"
            className="flex-1 justify-center w-full"
        >
            <View className="absolute inset-0 bg-black/40"/>
            <ScrollView
                className="flex-1 my-40 mx-4 bg-[rgba(0,0,0,0.7)] px-6 pt-14 rounded-lg"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            >
                {/* manual city input */}
                <View className="flex-row mb-10">
                    <TextInput
                        placeholder="Enter city"
                        placeholderTextColor="#ccc"
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={() => { load(input); setInput(""); }}
                        className="flex-1 bg-white/10 p-3 rounded-l-md text-white"
                    />
                    <Pressable onPress={() => { load(input); setInput(""); }}
                        className="bg-[#00b4d8] px-4 justify-center rounded-r-md">
                        <Text className="font-bold text-white">Go</Text>
                    </Pressable>
                </View>

                {/* loading / error / data */}
                {loading && <ActivityIndicator size="large" color="#90e0ef" />}
                {data && (
                    <View className="bg-white/10 p-6 rounded-xl">
                    <Text className="text-center text-3xl font-extrabold text-[#90e0ef]">
                        {data.name}
                    </Text>
                    <Text className="text-center text-5xl font-bold text-white mt-2">
                        {Math.round(data.main.temp)}°{unit === "metric" ? "C" : "F"}
                    </Text>
                    <Text className="text-center text-xl text-gray-200">
                        {data.weather[0].main} • {data.weather[0].description}
                    </Text>
                    <Text className="text-center text-md text-gray-300 mt-3">
                        Feels like {Math.round(data.main.feels_like)}°, Humidity {data.main.humidity}%
                    </Text>
                    </View>
                )}

                {/* Navigate to Settings */}
                <Pressable onPress={() => router.push("/settings")}
                    className="my-10 p-3 px-20 bg-[#00b4d8] mx-auto rounded-md">
                    <Text className="text-[#000] text-xl font-bold ">Settings </Text>
                </Pressable>
            </ScrollView>
        </ImageBackground>
    );
}
