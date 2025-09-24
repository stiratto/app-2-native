import { Pressable, Text, View } from "react-native";
import { Post } from "../interfaces/interfaces";
import { useNavigation } from "@react-navigation/native";

export default function PostCard({ post }: { post: Post }) {
  const navigator = useNavigation()
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
        padding: 8
      }}>
      <Text style={{
        fontWeight: 'bold'
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
