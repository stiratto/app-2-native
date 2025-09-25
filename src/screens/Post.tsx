import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Post as TPost, User as TUser, IComment } from "@/interfaces/api.interfaces"
import Comment from "@/components/Comment"
import { useFavoritesContext } from "@/contexts/FavoritesContext"
import { AntDesign, Entypo } from "@expo/vector-icons"
import RetryButton from "@/components/RetryButton"
import { saveFavorite } from "@/lib/utils"
import POSTS_API from "@/api/posts.api"
import USERS_API from "@/api/users.api"
import COMMENTS_API from "@/api/comments.api"

export default function Post({ route }: any) {
  const { id: postId } = route.params
  const [post, setPost] = useState<TPost>()
  const [user, setUser] = useState<TUser>()
  const [comments, setComments] = useState<IComment[]>([])
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>()
  const [comment, setComment] = useState("")
  const commentsRef = useRef<FlatList>(null)
  const { favorites, setFavorites } = useFavoritesContext()
  const isFavoritePost = favorites.find((i) => i.type === "post" && i.data.id === post?.id)

  // hacemos las consultas aca, para evitar problemas con el
  // estado status. al hacer las consultas aca, si hay un error,
  // las funciones solo hacen un throw error y se maneja en esta
  // funcion.
  const startFetches = async () => {
    try {
      setStatus('loading')
      const postData = await POSTS_API.getPost(postId)
      const userData = await USERS_API.getUser(postData.userId)
      const commentsData = await COMMENTS_API.getComments(postData.id)
      setPost(postData)
      setUser(userData)
      setComments(commentsData)
      setStatus('success')
    } catch (err: any) {
      console.log(err)
      setStatus("error")
    }
  }

  const onSubmit = async () => {
    // anade comentario dummy
    setComments(prev => [{
      id: comments.length + 1,
      name: "Yo",
      email: "dummyemail449@gmail.com",
      body: comment,
      postId: postId,
      local: true
    }, ...prev])

    setComment("")

    // scrolleamos la lista para ver el nuevo mensaje
    if (commentsRef.current) {
      commentsRef.current.scrollToIndex({ index: 0 })
    }

  }

  useEffect(() => {
    const run = async () => {
      await startFetches()
    }
    run()
  }, [])

  if (status === "loading") {
    return <ActivityIndicator style={{
      marginTop: 40
    }} size={50} color="black" />
  }

  if (status === "error") {
    return <View style={{ padding: 20, gap: 24 }}>
      <Text style={{ color: "red", fontSize: 18, textAlign: 'center' }}>Hubo un error</Text>
      <RetryButton callback={startFetches} />
    </View>
  }

  const listHeaderComponent = <View>
    <View>
      <View
        style={{
          padding: 8,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#D1D5DC",
          gap: 4
        }}
      >
        <Text style={{
          fontWeight: 'bold',
          fontSize: 24
        }}>{post?.title}</Text>
        <Text style={{
          color: "gray"
        }}>
          Autor: {user?.name}
        </Text>
        <TouchableOpacity style={{
          padding: 4,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4
        }} onPress={() => saveFavorite<TPost>(setFavorites, post!)}>
          {isFavoritePost ? <AntDesign name="star" size={16} color="#ffcd3c" /> : <Entypo name="star-outlined" size={16} color="#ffcd3c" />}
          <Text >Marcar como favorito</Text>
        </TouchableOpacity>
      </View>

      <Text style={{
        paddingVertical: 24
      }}>{post?.body}</Text>

    </View>

    <Text style={{
      marginBottom: 16,
      fontSize: 20,
      fontWeight: 'bold',
      borderBottomWidth: 1
    }}>Comentarios ({comments.length})</Text>
  </View>

  const listFooterComponent = <View style={{
    marginBottom: 25
  }}>

    <View style={{
      marginTop: 8
    }}>
      <Text style={{
        marginBottom: 8
      }}>Agrega un comentario</Text>
      <TextInput value={comment} onChangeText={setComment} multiline numberOfLines={4} placeholder="Comparte lo que piensas" placeholderTextColor="gray" style={{
        borderWidth: 1,
        fontSize: 13,
        borderColor: "#D1D5DC",
        marginBottom: 8,
        color: "black"
      }} />
      <Button title="Comentar" onPress={onSubmit} disabled={comment.length === 0} />
    </View>
  </View>



  return (
    <FlatList style={{
      flex: 1,
      padding: 20,
    }}
      data={comments}
      renderItem={({ item }: { item: IComment }) => <Comment local={item.local} comment={item} />}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={listHeaderComponent}
      ListFooterComponent={listFooterComponent}

    />
  )
}
