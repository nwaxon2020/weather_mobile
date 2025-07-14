import "@/app/global.css";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout(){
  return(
    <SafeAreaView className="flex-1 bg-gray-200">
      <Slot />
    </SafeAreaView>
  )
}