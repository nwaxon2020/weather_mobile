import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function NotFound(){
    const router = useRouter()

    return(
        <View>
            <Text> 404 - Page Not Found</Text>
            <Text>Sorry This page dose not exist</Text>

            <Pressable onPress={()=> router.replace("/") }>
                <Text>Go Back Home</Text>
            </Pressable>
        </View>
    )
}