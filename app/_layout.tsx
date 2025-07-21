// This page controles everything that has the homr route
import "@/app/global.css";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout(){
  return(
    <SafeAreaView className="flex-1">
      <Slot />
    </SafeAreaView>
  )
}