import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, FlatList, LogBox, Text, View } from "react-native";
import UserItem from "../../components/UserCard";
import { Post, User } from "../../interfaces/interfaces";
import PostCard from "../../components/PostCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState<({
    type: "user", data: User
  } | { type: "post", data: Post })[]>([])
  const getFavorites = async () => {
    try {
      const rawFavorites = await AsyncStorage.getItem('favorites')
      if (rawFavorites) {
        const data = JSON.parse(rawFavorites)
        setFavorites(data)
      }
    } catch (e: any) {
      throw new Error(e)
    }
  }

  useEffect(() => {
    const run = async () => {
      await getFavorites()
    }

    run()
  }, [])

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 16, fontSize: 24, fontWeight: 'bold' }}>Favoritos</Text>
      <FlatList data={favorites} renderItem={({ item }) => item.type === "user" ? <UserItem user={item.data} /> : <PostCard post={item.data} />} />
    </View>
  )
}
