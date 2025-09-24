import { useNavigation } from "@react-navigation/native"
import { User } from "../interfaces/interfaces"
import { Pressable, Text } from "react-native"


export default function UserItem({ user }: { user: User }) {

  const navigator = useNavigation()

  return (
    <Pressable
      onPress={() => navigator.navigate("HomeTabs", {
        screen: "Users",
        params: {
          screen: "User",
          params: { userId: user.id }
        }
      })}
      style={{ borderWidth: 1, padding: 8, borderRadius: 8 }}>
      <Text style={{
        fontSize: 16
      }}>{user.name}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
    </Pressable >)
}
