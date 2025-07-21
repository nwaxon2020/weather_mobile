import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";

// Function for the home page
export default function HomeScreenUi() {
  return (
    <ImageBackground //everything will be under this background Image
      source={require("@/assets/images/weather1.jpg")}
      resizeMode="cover"
      className="flex-1 w-full justify-center"
    >
        {/* Dark overlay tint */}
        <View className="absolute inset-0 bg-black/40" /> //give a little dark texture to the backgrond
      
        <View className="pt-10 bg-gray-100/20">
            
            <View className="p-4 mt-10 mx-4 rounded-lg bg-[rgba(0,0,0,0.6)]">
            <View className="flex flex-row justify-center items-center">
                <Text className="text-center text-xl text-gray-200 font-extrabold mr-4">
                Weather Today!
                </Text>
                <FontAwesome name="cloud" size={32} color="#00b4d8" />
            </View>
            
            //Overiew of weather app
            <Text className="text-center text-[#00b4d8] mt-2">
                This weather app provides users with real-time weather updates, including temperature, conditions, and forecasts based on their location. Designed with a clean, modern interface using React Native and NativeWind, the app offers a welcoming screen and a detailed weather display to ensure users stay informed and prepared anytime, anywhere.
            </Text>
            </View>

            <Pressable
            className="mt-6 p-3 bg-[#00b4d8] mx-auto rounded-md"
            onPress={() => router.push("/weather")}
            >
            <Text className="font-bold">Visit Weather Channel Now!</Text>
            </Pressable>

            <Pressable
            className="mb-10 mt-3 p-3 px-20 bg-[#00b4d8] mx-auto rounded-md"
            onPress={() => router.push("/settings")}
            >
            <Text className="font-bold">Settings</Text>
            </Pressable>
        </View>
    </ImageBackground>
  );
}
