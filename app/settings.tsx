import { getUnit, setUnit } from "@/libs/storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Switch, Text, View } from "react-native";

export default function Settings() {
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    getUnit().then(u => setIsMetric(u === "metric"));
  }, []);

  async function toggle(value: boolean) {
    setIsMetric(value);
    await setUnit(value ? "metric" : "imperial");
    router.back();            // pop back to Weather → it reloads and picks new unit
  }

  return (
    <ImageBackground
        source={require("@/assets/images/weather2.jpg")}
        resizeMode="cover"
        className="flex-1 w-full justify-center"
    >
        <View className="absolute inset-0 bg-black/40"/>
        <View className="my-60 mx-6 flex-1 justify-center items-center bg-[rgba(0,0,0,0.6)] rounded-2xl">
            <Text className="text-[#00b4d8] text-xl font-bold mb-4">Use Celsius</Text>
            <Switch  value={isMetric} onValueChange={toggle} thumbColor="#00b4d8" />
        </View>
    </ImageBackground>
  );
}
