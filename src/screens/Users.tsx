import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { User } from "@/interfaces/api.interfaces";
import UserItem from "@/components/UserCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RetryButton from "@/components/RetryButton";
import USERS_API from "@/api/users.api";

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [status, setStatus] = useState<"success" | "loading" | "error">()
  const [searchText, setSearchText] = useState("")

  const getUsers = async () => {
    try {
      setStatus("loading")
      const data = await USERS_API.getUsers()
      setUsers(data)
      setStatus("success")
    } catch (err: any) {
      setStatus("error")
    }
  }

  const filteredUsers = users?.filter((user) => user.name.includes(searchText) || user.username.includes(searchText))

  // funcion que se ejecuta en el pull-to-refresh
  const onRefresh = async () => {
    setSearchText("")
    await getUsers()
  }

  useEffect(() => {
    const run = async () => {
      await getUsers()
    }
    // si hay un network error lo agarramos, deberia haber una mejor
    // manera
    try {
      run()
    } catch (err) {
      setStatus("error")
    }
  }, [])

  // body de status loading
  if (status === "loading") {
    return <ActivityIndicator
      style={styles.container}
      size={50} color="black" />
  }


  {/* si hubo un error, mostramos un mensaje de error */ }
  if (status === "error") {
    return <View
      style={{
        ...styles.container, justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}
    >
      <Text style={{ color: "red", fontSize: 16, textAlign: 'center', marginBottom: 20 }}>Hubo un error al obtener los usuarios :(</Text>
      <RetryButton callback={getUsers} />
    </View>
  }

  const listHeaderComponent = <View style={styles.container} >
    <TextInput placeholder="Buscar" style={styles.input} placeholderTextColor={"black"} onChangeText={setSearchText} value={searchText} />
    {
      filteredUsers.length === 0 && (
        <View style={{
          alignItems: 'center',
          marginTop: 40
        }}>
          <MaterialCommunityIcons name="emoticon-sad" size={32} color="gray" />
          <Text style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            paddingTop: 16,
            fontSize: 18
          }}>
            No se encontro ningun usuario
          </Text>
        </View>
      )
    }
  </View>


  return (
    // usamos una flatlist para habilitar el scrolling vertical y para
    // el pull-to-refresh, seria ideal usar un scrollview pero no se
    // puede debido a que no se puede nestear una virtualizedlist
    // (flatlist en este caso) en un scrollview cuyo scrolling tenga
    // el mismo orientation, esto da error.
    <FlatList
      data={filteredUsers}
      style={{ ...styles.container, marginBottom: 20 }}
      renderItem={({ item }) => <UserItem user={item} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      ItemSeparatorComponent={() =>
        <View style={{
          height: 16
        }}></View>
      }
      // parte de arriba de la lista
      ListHeaderComponent={listHeaderComponent}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    color: "black",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 18
  }
}) 
