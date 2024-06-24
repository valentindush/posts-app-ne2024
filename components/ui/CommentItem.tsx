import { Comment } from "@/utils/@types"
import { ThemedView } from "../ThemedView"
import { ThemedText } from "../ThemedText"
import { Ionicons } from "@expo/vector-icons"
import twrnc from "twrnc"

interface CommentItemProps{
    comment: Comment
}

export default function CommentItem({comment}: CommentItemProps){

    return(
        <ThemedView style={twrnc`mt-4`}>
            <ThemedView style={twrnc`flex flex-row gap-2`}>
                <Ionicons name="person-circle" size={40} color={"#615EFC"} />
                <ThemedView>
                    <ThemedText style={twrnc`text-sm`}>{comment.name}</ThemedText>
                    <ThemedText style={twrnc`text-sm font-medium`}>{comment.email}</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={twrnc`pl-12`}>
                <ThemedText>{comment.body}</ThemedText>
            </ThemedView>
        </ThemedView>
    )
}