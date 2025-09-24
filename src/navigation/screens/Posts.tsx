import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, RefreshControl, ScrollView, Text, TextInput, View } from "react-native";
import { Post } from "../../interfaces/interfaces";
import PostCard from "../../components/PostCard";
import { Picker } from "@react-native-picker/picker";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [status, setStatus] = useState<"success" | "loading" | "error">()
  const [listStatus, setListStatus] = useState<"success" | "loading" | "error">()
  const [currPostsAmount, setCurrPostsAmount] = useState(20)
  const [smallFetch, setSmallFetch] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"asc" | "desc">()
  const listRef = useRef<FlatList>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getPosts = async () => {
    try {
      if (smallFetch) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${currPostsAmount}`)
        if (!res.ok) {
          setStatus("error")
          return
        }
        const data = await res.json()
        setPosts(data)
        setStatus("success")
        return
      }
      setStatus("loading")
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${currPostsAmount}`)
      if (!res.ok) {
        setStatus("error")
        return
      }
      const data = await res.json()
      setPosts(data)
      setStatus("success")
    } catch (err: any) {
      setStatus("error")
      throw new Error(err)
    }
  }

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))

  const onRefresh = async () => {
    await getPosts()
  }

  useEffect(() => {
    const run = async () => {
      await getPosts()
    }
    run()
  }, [currPostsAmount])

  useEffect(() => {
    const run = async () => {
      await getPosts()
    }
    run()
  }, [])


  useEffect(() => {

    selectedFilter === 'asc' ?
      // orden ascendente
      setPosts(prev => prev.sort((a, b) => a.title.localeCompare(b.title)))
      :
      // orden descendente
      setPosts(prev => prev.sort((a, b) => b.title.localeCompare(a.title)))
  }, [selectedFilter])

  return (
    <View

      style={{
        padding: 20,
      }}>
      {/* mostramos un loader mientras hace el fetch de posts */}
      {status === "loading" && <ActivityIndicator style={{
        marginTop: 40
      }} size={50} color="black" />}

      {/* si hubo un error, mostramos un mensaje de error */}
      {status === "error" && <Text style={{ color: "red", fontSize: 16, textAlign: 'center' }}>Hubo un error al obtener los posts :(</Text>}

      {/* */}
      {status === "success" && (
        <View>
          <View style={{
            flexDirection: "row",
            alignItems: 'center',
            flex: 1,
          }}>
            <TextInput
              placeholderTextColor={"gray"}
              placeholder="Buscar por titulo..."
              onChangeText={setSearchText}
              style={{
                padding: 8,
                flex: 1,
                borderWidth: 1,
                borderColor: "#D1D5DC",
                marginBottom: 16,
                color: "black"
              }}
              value={searchText}
            />

            <Pressable onPress={() => {
              setSearchText("")
            }}>
              <Text style={{
                position: "absolute",
                left: -25,
                top: -15,
              }}>X</Text>
            </Pressable>
          </View>

          <Picker selectedValue={selectedFilter}
            onValueChange={(itemValue, itemIndex) => setSelectedFilter(itemValue)}
            dropdownIconColor={"black"}
            selectionColor={"black"}
          >
            <Picker.Item label="Ascendente" value="asc" color="black" />
            <Picker.Item label="Descendente" value="desc" color="black" />
          </Picker>

          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            data={filteredPosts}
            renderItem={({ item }) => <PostCard post={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            keyExtractor={item => item.id.toString()}
            onEndReached={() => setCurrPostsAmount(prev => prev + 20)}
          />
        </View>
      )}
    </View>
  )
}
