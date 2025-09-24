import { useCallback, useEffect, useRef, useState } from "react"
import { ActivityIndicator, Button, FlatList, Text, TextInput, View } from "react-native"
import { Post as TPost, User as TUser, IComment } from "../../interfaces/interfaces"
import Comment from "../../components/Comment"
import { useFocusEffect } from "@react-navigation/native"

export default function Post({ route }: any) {
  const { id: postId } = route.params
  const [post, setPost] = useState<TPost>()
  const [user, setUser] = useState<TUser>()
  const [comments, setComments] = useState<IComment[]>([])
  const [status, setStatus] = useState<'success' | 'loading' | 'error'>()
  const [comment, setComment] = useState("")
  const commentsRef = useRef<FlatList>(null)

  const startFetches = async () => {
    try {
      setStatus('loading')
      // hacemos las consultas aca, para evitar problemas con el
      // estado status. al hacer las consultas aca, si hay un error,
      // las funciones solo hacen un throw error y se maneja en esta
      // funcion.
      const data = await getPost()
      await getUser(data.id)
      await getComments()
      setStatus('success')
    } catch (err: any) {
      setStatus("error")
    }
  }


  const getPost = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      if (!res.ok) {
        throw new Error("Mal status code de response de posts/")
      }
      const data = await res.json()
      setPost(data)
      return data
    } catch (err: any) {
      throw err
    }
  }

  const getUser = async (id: number) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      if (!res.ok) {
        throw new Error("Mal status code de response en users/:id")
      }
      const data = await res.json()
      setUser(data)
    } catch (err: any) {
      throw err
    }
  }

  const getComments = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      if (!res.ok) {
        throw new Error("Mal status code de response en posts/:id/comments")
      }
      const data = await res.json()
      setComments(data)
    } catch (err: any) {
      throw err
    }
  }


  const onSubmit = async () => {
    setComments(prev => [{
      id: comments.length + 1,
      name: "Yo",
      email: "dummyemail449@gmail.com",
      body: comment,
      postId: postId
    }, ...prev])
    setComment("")

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


  return (
    <View style={{
      flex: 1,
      padding: 20,
    }}>

      {/* mostramos un loader mientras hace el fetch de posts */}
      {status === "loading" && <ActivityIndicator style={{
        marginTop: 40
      }} size={50} color="black" />}

      {/* si hubo un error, mostramos un mensaje de error */}
      {status === "error" && <Text style={{ color: "red", fontSize: 16, textAlign: 'center' }}>Hubo un error :(</Text>}


      {status === "success" && <View>

        <View
          style={{
            padding: 8,
            borderWidth: 1,
            borderColor: "#D1D5DC"
          }}
        >
          <Text>{status}</Text>

          <Text style={{
            fontWeight: 'bold',
            fontSize: 24

          }}>{post?.title}</Text>
          <Text style={{
            color: "gray"
          }}>
            Autor: {user?.name}
          </Text>
        </View>
        <Text>{post?.body}</Text>
        <Text style={{
          marginVertical: 16,
          fontSize: 20,
          fontWeight: 'bold',
          borderBottomWidth: 1
        }}>Comentarios ({comments.length})</Text>
        <FlatList ref={commentsRef} data={comments} renderItem={({ item }: { item: IComment }) => <Comment comment={item} />} keyExtractor={(item, index) => item.id.toString()} />
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

      </View>}

    </View>
  )
}
