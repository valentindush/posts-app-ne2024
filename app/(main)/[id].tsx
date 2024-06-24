import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import Header from "@/components/ui/Header"
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import axios from "@/utils/axios.config"
import twrnc from "twrnc"
import { ActivityIndicator, Alert, FlatList } from "react-native"
import { Comment, Post } from "@/utils/@types"
import CommentItem from "@/components/ui/CommentItem"

const PostPage = () => {
    const [post, setPost] = useState<Post | null>(null)
    const [comments, setComments] = useState<Comment[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(false)
    const { id } = useGlobalSearchParams()

    const getPost = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/posts/${id}`)
            setPost(res.data)
        } catch (error: any) {
            console.log(error)
            Alert.alert("Error", "Failed to get post" + error.message)
        }finally{
            setLoading(false)
        }
    }

    const getComments = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/posts/${id}/comments`)
            setComments(res.data)
        } catch (error: any) {
            console.log(error)
            Alert.alert("Error", "Failed to get comments" + error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getPost()
        getComments()
    }, [])

    return (
        <ThemedView style={twrnc`flex-1`}>
            <Header title={`Post ${id}`} />
            <ThemedView style={twrnc`p-4 mt-2`}>
                {loading && <ActivityIndicator size={"large"} color={"#615EFC"} />}
                <ThemedView style={twrnc``}>
                    <ThemedText style={twrnc`font-semibold text-lg`}>{post?.title}</ThemedText>
                    <ThemedText style={twrnc`text-sm mt-2 text-left`}>{post?.body}</ThemedText>
                </ThemedView>
                <ThemedView style={twrnc`mt-4`}>
                    {loading && <ActivityIndicator size={"large"} color={"#615EFC"} />}
                    <ThemedText style={twrnc`font-semibold`}>Comments ({comments.length})</ThemedText>

                    <ThemedView style={twrnc`mt-2`}>
                        {comments.length == 0 &&
                            <ThemedText style={twrnc`text-center`}>No comments found</ThemedText>

                        }
                        <FlatList
                            renderItem={({ item }) => <CommentItem comment={item} />}
                            data={comments}
                            keyExtractor={item => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            refreshing={refreshing}
                            onRefresh={getComments}
                            contentContainerStyle={twrnc`pb-[420px]`}
                        />
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

export default PostPage