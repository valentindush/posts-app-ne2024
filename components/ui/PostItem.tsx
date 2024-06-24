import { Post } from "@/utils/@types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import twrnc from 'twrnc'

interface PostItemProps{
    post: Post
}

export default function PostItem({post}: PostItemProps){

    return(
        <ThemedView style={twrnc`p-4 border border-gray-200 mt-3 rounded-xl shadow-lg shadow-gray-600 pb-12`}>
            <ThemedText style={twrnc`font-semibold`}>{post.title}</ThemedText>
            <ThemedText style={twrnc`text-xs text-left`}>{post.body}</ThemedText>
        </ThemedView>
    )
}