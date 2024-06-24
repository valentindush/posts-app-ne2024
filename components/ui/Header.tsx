import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import twrnc from 'twrnc'
import { Pressable } from "react-native";
import { router } from "expo-router";

interface HeaderProps{
    title: string
}

export default function Header({title}: HeaderProps){

    return(
        <ThemedView style={twrnc`flex flex-row items-center gap-4 p-4 shadow-md`}>
            <Pressable onPress={()=>router.push('/')}>
                <Ionicons name="arrow-back" size={20} />
            </Pressable>
            <ThemedText>{title}</ThemedText>
        </ThemedView>
    )
}