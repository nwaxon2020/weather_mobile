import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreenUi(){
    return(
        <View className="bg-gray-800">
            <Text className="text-center text-2xl font-extrabold">Welcome To The Home Screen</Text>
            <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id mollitia aliquid possimus ad? Necessitatibus iusto ducimus voluptas alias! Fugit nobis esse dicta provident, sed placeat iusto dignissimos assumenda suscipit mollitia amet atque quis quod ipsam! Consequuntur soluta asperiores laboriosam, esse illum aut itaque, debitis libero voluptate ipsa perspiciatis vitae, iste veritatis ipsam sit. Illo distinctio incidunt facere dolor placeat ipsum!</Text>

            <Pressable onPress={()=> router.push("/weather")}>
                <Text>Visit Weather Channel Now</Text>
            </Pressable>
        </View>
    )
}