import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Post, User as TUser } from "../../interfaces/interfaces";
import PostCard from "../../components/PostCard";

export default function User({ route }: any) {
  const { userId } = route.params
  const [user, setUser] = useState<TUser>()
  const [userPosts, setUserPosts] = useState<Post[]>([])

  const getUser = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      const data = await res.json()
      setUser(data)
    } catch (err: any) {
      throw new Error(err)
    }
  }


  const getUserPosts = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      const data = await res.json()
      setUserPosts(data)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const saveFavorite = async () => {
    try {
      const oldFavorites = await AsyncStorage.getItem("favorites")
      if (oldFavorites) {
        const data = JSON.parse(oldFavorites)
        const newFavorites = [...data, { data: user, type: "user" }]
        await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
      } else {
        const newFavorites = [{ data: user, type: "user" }]
        await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites))
      }
    } catch (e: any) {
      throw new Error(e)
    }
  }

  const clearFavorites = async () => {
    await AsyncStorage.clear()
  }

  useEffect(() => {
    const run = async () => {
      await getUser()
      await getUserPosts()
    }
    run()
  }, [])

  return (
    <View style={{
      flex: 1,
      padding: 30,
    }}>
      <TouchableOpacity style={{
        padding: 4
      }} onPress={saveFavorite} >
        <Text>Marcar como favorito</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{
        padding: 4
      }} onPress={clearFavorites} >
        <Text>Limpiar favoritos</Text>
      </TouchableOpacity>
      <Text style={{
        fontSize: 20,
        marginBottom: 10,
        textDecorationLine: 'underline'
      }}>Informacion acerca de {user?.name}</Text>
      <Text>Numero de telefono: {user?.phone}</Text>
      <Text>Website: {user?.website}</Text>
      <Text>Ciudad: {user?.address.city}</Text>
      <Text>Compania: {user?.company.name}</Text>
      <Text style={{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30
      }}>Posts</Text>
      <FlatList
        data={userPosts}
        renderItem={({ item: post }) => <PostCard post={post} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </View>
  )
}
