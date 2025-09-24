import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Post, User } from "../../interfaces/interfaces";
import { storage } from "..";
import FavoriteCard from "../../components/FavoriteCard";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { AntDesign, Feather } from "@expo/vector-icons";


export default function Favorites() {
  const { favorites, setFavorites } = useFavoritesContext()

  const parseFavorites = async () => {
    try {
      const favorites = storage.getString('favorites')
      if (favorites) {
        const data = JSON.parse(favorites)
        setFavorites(data)
      }
    } catch (e: any) {
      throw new Error(e)
    }
  }

  useEffect(() => {
    const run = async () => {
      await parseFavorites()
    }
    run()
  }, [])

  return (
    <View style={{ padding: 20 }}>


      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
          justifyContent: 'space-between'
        }}
      >

        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Favoritos</Text>
        <TouchableOpacity onPress={() => setFavorites([])}>
          <Text>
            <Feather name="trash-2" size={16} color="black" />
            Limpiar favoritos
          </Text>

        </TouchableOpacity>

      </View>
      {favorites.length === 0 && (
        <View style={{
          alignItems: 'center',
          flexDirection: 'row',

        }}>
          <AntDesign name="info" size={24} color="gray" />
          <Text style={{ color: "gray" }}>No has agregado ningun favorito.</Text>
        </View>
      )}
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        data={favorites}
        renderItem={({ item }) => item.type === "user" ? <FavoriteCard type="user" data={item.data as User}
          allFavorites={favorites!} /> : <FavoriteCard type="post" data={item.data as Post} allFavorites={favorites!} />} />
    </View>
  )
}
