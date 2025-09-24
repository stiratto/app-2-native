import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { Post, StorageFavoritesItem, User } from "../interfaces/interfaces";
import { storage } from "../navigation";
import { Entypo } from "@expo/vector-icons";
import { useFavoritesContext } from "../contexts/FavoritesContext";

export default function FavoriteCard({ type, data, allFavorites }: { type: "post" | "user", data: Post | User, allFavorites: StorageFavoritesItem[] }) {
  const { favorites, setFavorites } = useFavoritesContext()

  const removeFavorite = async () => {
    // si se clickea y ya es favorito, remover de favoritos
    const exists = favorites.filter((fav) => fav.type === type).find((fav) => fav.data.id === data.id)
    if (!exists) {
      return
    }

    // si no es favorito, anadirlo a favoritos
    const newFavorites = favorites.filter((fav) => fav.data.id !== data.id)
    setFavorites(newFavorites)
  }

  return (

    <View style={{
      padding: 8,
      borderWidth: 1,
      borderColor: "#D1D5DC"
    }}>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={{
          textTransform: "uppercase",
          fontSize: 13,
          padding: 2,
          borderWidth: 1,
          width: 50,
          alignSelf: 'flex-end',
          borderColor: "#D1D5DC",
          color: "gray"
        }}>{type === "post" ? "Post" : "Usuario"}</Text>
        <TouchableOpacity onPress={removeFavorite} style={{
          backgroundColor: "red",
          padding: 2,
          flexDirection: 'row',
          gap: 4,
          borderRadius: 100

        }}>
          <Entypo name="trash" size={13} color="white" style={{
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
    </View >
  )
}
