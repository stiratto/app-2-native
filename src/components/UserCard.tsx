import { useNavigation } from "@react-navigation/native"
import { User } from "@/interfaces/api.interfaces"
import { Pressable, Text, View } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { useFavoritesContext } from "@/contexts/FavoritesContext"

// card mostrada en la lista de users 
export default function UserItem({ user }: { user: User }) {

  const { favorites } = useFavoritesContext()
  const navigator = useNavigation()
  const isFavoriteUser = favorites.some(fav => fav.type === "user" && fav.data.id === user?.id);

  return (
    <Pressable
      onPress={() => navigator.navigate("HomeTabs", {
        screen: "UsersStack",
        params: {
          screen: "User",
          params: { userId: user.id }
        }
      })}
      style={{ borderWidth: 1, padding: 8, borderRadius: 8, borderColor: "#D1D5DC" }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 16
        }}>{user.name}</Text>
        {isFavoriteUser ? <AntDesign name="star" size={16} color="#ffcd3c" /> : ""}
      </View>

      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
    </Pressable >)
}
