import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Post, User as TUser } from "../../interfaces/interfaces";
import PostCard from "../../components/PostCard";
import { isFavorite } from "../../lib/utils";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useFavoritesContext } from "../../contexts/FavoritesContext";

export default function User({ route }: any) {
  const { userId } = route.params
  const [user, setUser] = useState<TUser>()
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const { favorites, setFavorites } = useFavoritesContext()

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

  useEffect(() => {
    const run = async () => {
      await getUser()
      await getUserPosts()
    }
    run()
  }, [])

  const saveFavorite = () => {
    const exists = favorites.filter((i) => i.type === "user").find(u => u.data.id === user?.id)
    if (exists) {
      const newFavorites = favorites.filter((i) => i.data.id !== user?.id)
      setFavorites(newFavorites)
    } else {
      setFavorites(prev => [...prev, { type: "user", data: user! }])
    }
  }

  const isFavoriteUser = favorites.some(fav => fav.type === "user" && fav.data.id === user?.id);

  return user && (
    <View style={{
      flex: 1,
      padding: 30,
    }}>
      <TouchableOpacity style={{
        padding: 4,
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        marginBottom: 10
      }} onPress={saveFavorite} >
        {isFavoriteUser ? <AntDesign name="star" size={16} color="#ffcd3c" /> : <Entypo name="star-outlined" size={16} color="#ffcd3c" />}
        <Text>Marcar como favorito</Text>
      </TouchableOpacity>
      <Text style={{
        fontSize: 20,
        marginBottom: 10,
        textDecorationLine: 'underline'
      }}>Informacion acerca de {user?.name}</Text>
      <Text>Numero de telefono: {user?.phone}</Text>
      <Text>id: {user?.id}</Text>

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
