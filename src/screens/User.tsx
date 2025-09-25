import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Post, User as TUser } from "@/interfaces/api.interfaces";
import PostCard from "@/components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { saveFavorite } from "@/lib/utils";
import USERS_API from "@/api/users.api";
import POSTS_API from "@/api/posts.api";
import RetryButton from "@/components/RetryButton";

export default function User({ route }: any) {
  const { userId } = route.params
  const [user, setUser] = useState<TUser>()
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const { favorites, setFavorites } = useFavoritesContext()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>()

  const startFetches = async () => {
    try {
      setStatus('loading')
      await getUser()
      await getUserPosts()
      setStatus('success')
    } catch (err: any) {
      setStatus(err)
    }
  }

  const getUser = async () => {
    try {
      const data = await USERS_API.getUser(userId)
      setUser(data)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const getUserPosts = async () => {
    try {
      const data = await POSTS_API.getUserPosts(userId)
      setUserPosts(data)
    } catch (err: any) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    startFetches()
  }, [])

  const isFavoriteUser = favorites.some(fav => fav.type === "user" && fav.data.id === user?.id);

  // body de status loading
  if (status === "loading") {
    return <ActivityIndicator
      size={50} color="black" />
  }


  {/* si hubo un error, mostramos un mensaje de error */ }
  if (status === "error") {
    return <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}
    >
      <Text style={{ color: "red", fontSize: 16, textAlign: 'center', marginBottom: 20 }}>Hubo un error al obtener los usuarios :(</Text>
      <RetryButton callback={startFetches} />
    </View>
  }


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
      }} onPress={() => saveFavorite<TUser>(setFavorites, user)} >
        {isFavoriteUser ? <AntDesign name="star" size={16} color="#ffcd3c" /> : <Entypo name="star-outlined" size={16} color="#ffcd3c" />}
        <Text>Marcar como favorito</Text>
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
        marginTop: 30,
        marginBottom: 10
      }}>Posts</Text>

      <FlatList
        data={userPosts}
        renderItem={({ item: post }) => <PostCard post={post} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={item => item.id.toString()}
      />



    </View>
  )

}
