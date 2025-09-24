import { Pressable, Text, View } from "react-native";
import { Post } from "../interfaces/interfaces";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useFavoritesContext } from "../contexts/FavoritesContext";

export default function PostCard({ post }: { post: Post }) {
  const navigator = useNavigation()
  const { favorites } = useFavoritesContext()

  const isFavoritePost = favorites.some(fav => fav.type === "post" && fav.data.id === post?.id);

  return (
    <Pressable
      onPress={() => navigator.navigate("HomeTabs", {
        screen: "Posts",
        params: {
          screen: "Post",
          params: { id: post.id }
        }
      })}
      style={{
        borderWidth: 1,
        borderColor: "#D1D5DC",
        padding: 8,
        borderRadius: 8
      }}>
      <Text style={{ alignSelf: 'flex-end' }}>{isFavoritePost ? <AntDesign name="star" size={16} color="#ffcd3c" /> : ""}</Text>
      <Text style={{
        fontWeight: 'bold',
      }}>{post.title}</Text>


      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: "gray"
        }}>{post.body}</Text>

    </Pressable>
  )
}
