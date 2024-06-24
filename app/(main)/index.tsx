import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import PostItem from "@/components/ui/PostItem"
import { Post } from "@/utils/@types"
import axios from "@/utils/axios.config"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, FlatList, Pressable, Text, TouchableOpacity } from "react-native"
import { TextInput } from "react-native"
import twrnc from 'twrnc'
import { FloatingAction } from "react-native-floating-action";
import { router } from "expo-router"
import TouchableButton from "@/components/CustomButton"
import { Ionicons } from "@expo/vector-icons"

const PostsPage = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [postsBackup, setPostsBackup] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [fetching, setFetching] = useState(false)

    const getData = async () => {
        setFetching(true)
        try {
            const res = await axios.get("/posts?userId=1")
            setPosts(res.data)
            setPostsBackup(res.data)
        } catch (error: any) {
            Alert.alert(error.message)
        }finally{
            setFetching(false)
        }
    }

    const deletePost = async (id: number) => {
        setLoading(true)
        try {
            const res = await axios.delete(`/posts/${id}`)
            const filteredPosts = posts.filter((post) => post.id !== id)
            setPosts(filteredPosts)
            Alert.alert("Success", "Post deleted")
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (text: string) => {
        if (text.trim() === "") {
            setPosts(postsBackup.slice()); // Create a shallow copy of the original array
            return;
        }

        const searchText = text.toLowerCase(); // Convert search text to lowercase
        const filteredPosts = posts.filter((post) => {
            const titleMatch = post.title.toLowerCase().includes(searchText);
            const bodyMatch = post.body.toLowerCase().includes(searchText);
            return titleMatch || bodyMatch;
        });

        setPosts(filteredPosts);
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <ThemedView style={twrnc`flex-1 p-6`}>
            <ThemedView style={twrnc`py-4`}>
                <ThemedView style={twrnc`flex flex-row gap-2`}>
                    <ThemedText style={twrnc`text-2xl font-semibold`}>Welcome</ThemedText>
                    <ThemedText style={twrnc`text-2xl font-semibold text-[#615EFC]`}>Amigo 👌👋</ThemedText>
                </ThemedView>
                <ThemedText style={twrnc`text-sm`}>@JsonPlaceHolder</ThemedText>
                <ThemedView style={twrnc`flex flex-row items-center justify-between mt-8`}>
                    <ThemedText style={twrnc`text-lg font-bold`}>Posts</ThemedText>
                    <ThemedView style={twrnc`w-full relative`}>
                        <Ionicons name="search" size={24} color={"gray"} style={twrnc`absolute left-16 top-[10px] z-10`} />
                        <TextInput onChangeText={(text) => handleSearch(text.trim())} cursorColor={"gray"} style={twrnc`bg-gray-200 ml-auto mr-12 rounded-full p-2 px-10 w-[70%]`} placeholder="Seach posts..." />
                    </ThemedView>
                </ThemedView>
            </ThemedView>
            <ThemedView>
                {fetching && <ActivityIndicator size={"large"} color={"#615EFC"} />}
                {posts.length == 0 &&
                    <ThemedText style={twrnc`text-center`}>No posts found</ThemedText>
                }
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => router.push(`/${item.id}`)} style={twrnc`relative`}>
                            <PostItem post={item} />
                            <TouchableButton
                                title="Delete"
                                onPress={() => deletePost(item.id)}
                                loading={loading}
                                disabled={loading}
                                loadingTitle="Deleting"
                                style="p-1 bg-red-500 w-[80px] absolute bottom-2 right-2"
                                textStyle="text-sm font-medium"
                            />
                        </Pressable >
                    )}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshing={refreshing}
                    onRefresh={getData}
                    contentContainerStyle={twrnc`pb-[270px]`}
                />

            </ThemedView>
            <FloatingAction onOpen={() => { router.push('/post') }} color="#615EFC" />
        </ThemedView>
    )
}

export default PostsPage