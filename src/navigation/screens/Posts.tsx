import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, TextInput, View, Pressable } from "react-native";
import { Post } from "../../interfaces/api.interfaces";
import PostCard from "../../components/PostCard";
import { Picker } from "@react-native-picker/picker";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import RetryButton from "../../components/RetryButton";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<"success" | "loading" | "error">("loading");
  const [currPostsAmount, setCurrPostsAmount] = useState(20);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"asc" | "desc">("asc");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // estado usado para no cambiar el estado general del status, scroll
  // mas fluido ya que no esta ese salto
  const [smallFetch, setSmallFetch] = useState(false);

  const getPosts = async () => {
    try {
      // smallFetch es true significa que el fetch es del infinite
      // scroll
      if (smallFetch) {
        // no seteamos nada de loading
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${currPostsAmount}`);
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const data = await res.json();
        setPosts(data);

        return
      }
      // fetch normal
      setStatus("loading");
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${currPostsAmount}`);
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = await res.json();
      setPosts(data);

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
    }
  };

  // memoize?
  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) =>
      selectedFilter === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

  // se ejecuta en pull-to-refresh
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getPosts();
    setIsRefreshing(false);
  };

  // cuando alcanzamos el endScroll en la lista, hacemos el nuevo
  // fetch (infinite scroll)
  useEffect(() => {
    getPosts();
  }, [currPostsAmount]);

  // body en caso de loading
  if (status === "loading") {
    return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} size={50} color="black" />;
  }

  // body en caso de error 
  if (status === "error") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red", fontSize: 16, marginBottom: 12 }}>
          Hubo un error al obtener los posts :(
        </Text>
        <RetryButton callback={getPosts} />
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={filteredPosts}
      renderItem={({ item }) => <PostCard post={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      ListHeaderComponent={
        // podemos pasar este componente a una variable y dejar el
        // body return mas limpio (?
        <View style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Buscar por titulo..."
              placeholderTextColor="gray"
              onChangeText={setSearchText}
              value={searchText}
              style={{
                flex: 1,
                padding: 12,
                borderWidth: 1,
                borderColor: "#D1D5DC",
                borderRadius: 16,
                color: "black",
              }}
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText("")} style={{ position: "absolute", right: 16 }}>
                <Feather name="x" size={18} color="black" />
              </Pressable>
            )}
          </View>

          <Picker
            selectedValue={selectedFilter}
            onValueChange={(value) => setSelectedFilter(value)}
            dropdownIconColor="black"
            style={{ marginTop: 12, marginBottom: 12 }}
          >
            <Picker.Item label="Ascendente" value="asc" />
            <Picker.Item label="Descendente" value="desc" />
          </Picker>

          {filteredPosts.length === 0 && status === "success" && (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <MaterialCommunityIcons name="emoticon-sad" size={32} color="gray" />
              <Text style={{ textAlign: "center", paddingTop: 16, fontSize: 18 }}>
                No se encontro ninguna publicacion
              </Text>
            </View>
          )}
        </View>
      }
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      onEndReached={() => {
        setSmallFetch(true)
        setCurrPostsAmount((prev) => prev + 20)
      }}
      onEndReachedThreshold={0.5}
    />
  );
}

