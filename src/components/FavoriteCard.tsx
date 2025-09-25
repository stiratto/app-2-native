import { Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Post, User } from "@/interfaces/api.interfaces";
import { Feather } from "@expo/vector-icons";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import FavoriteLabel from "./FavoriteLabel";
import { useNavigation } from "@react-navigation/native";

export default function FavoriteCard({ type, data }: { type: "post" | "user", data: Post | User }) {
  const { favorites, setFavorites } = useFavoritesContext()

  const removeFavorite = async () => {
    // si no es favorito, anadirlo a favoritos
    const newFavorites = favorites.filter((fav) => fav.data.id !== data.id)
    setFavorites(newFavorites)
  }

  const navigator = useNavigation()
  return (

    <Pressable onPress={() => {
      if (type === "user") {
        navigator.navigate("HomeTabs", {
          screen: "UsersStack",
          params: {
            screen: "User",
            params: { userId: data.id }
          }
        })

      } else {
        navigator.navigate("HomeTabs", {
          screen: "PostsStack",
          params: {
            screen: "Post",
            params: { id: data.id }
          }
        })
      }
    }}
      style={{
        padding: 8,
        borderWidth: 1,
        borderColor: "#D1D5DC",
        borderRadius: 8

      }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <FavoriteLabel type={type} />
        <TouchableOpacity onPress={removeFavorite} style={{
          backgroundColor: "red",
          padding: 4,
          flexDirection: 'row',
          borderRadius: 100
        }}>
          <Feather name="trash-2" size={13} color="white" style={{
          }} />
        </TouchableOpacity>

      </View>

      <Text style={{
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 6
      }}>{type === "post" ? (data as Post).title : (data as User).name}</Text>

      {type === "post" &&
        <Text ellipsizeMode="tail" numberOfLines={2} style={{
          color: "gray",
        }}>{(data as Post).body}</Text>
      }

      {type === "user" && <Text>{(data as User).username}</Text>}
      {type === "user" && <Text>{(data as User).email}</Text>}
      {type === "user" && <Text>{(data as User).phone}</Text>}
    </Pressable>
  )
}
