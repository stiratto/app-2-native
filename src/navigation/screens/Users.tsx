import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { User } from "../../interfaces/interfaces";
import UserItem from "../../components/UserCard";



export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [status, setStatus] = useState<"success" | "loading" | "error" | "idle" | "other">()
  const [searchText, setSearchText] = useState("")

  const getUsers = async () => {
    try {
      setStatus("loading")
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      if (!res.ok) {
        setStatus("error")
        return
      }
      const data = await res.json()
      setUsers(data)
      setStatus("success")
    } catch (err: any) {
      setStatus("error")
      throw new Error(err)
    }
  }

  const filteredUsers = users?.filter((user) => user.name.includes(searchText) || user.username.includes(searchText))

  const onRefresh = async () => {
    setSearchText("")
    await getUsers()

  }

  useEffect(() => {
    const run = async () => {
      await getUsers()
    }
    run()
  }, [])

  return (
    <ScrollView
      nestedScrollEnabled
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      style={{
        padding: 20,
      }}
    >
      {/* mostramos un loader mientras hace el fetch de users */}
      {status === "loading" && <ActivityIndicator style={{
        marginTop: 40
      }} size={50} color="black" />}

      {/* si hubo un error, mostramos un mensaje de error */}
      {status === "error" && <Text style={{ color: "red", fontSize: 16, textAlign: 'center' }}>Hubo un error al obtener los usuarios :(</Text>}


      {/* si hubo exito, mostramos todo correctamente */}
      {status === "success" && (
        <View style={styles.container}>
          <TextInput placeholder="Buscar" style={styles.input} placeholderTextColor={"black"} onChangeText={setSearchText} value={searchText} />
          {filteredUsers.length === 0 && (
            <Text style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              paddingTop: 16,
              fontSize: 21
            }}>No se encontro ningun usuario :(</Text>
          )}
          <FlatList
            style={{ paddingVertical: 16 }}
            data={filteredUsers}
            renderItem={({ item }) => <UserItem user={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            keyExtractor={(item, index) => item.id.toString()
            }
          />
        </View>

      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  input: {
    color: "black",
    borderWidth: 1,
    borderColor: "E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 18
  }
}) 
