import { Text, View } from "react-native";
import { IComment } from "../interfaces/api.interfaces";

export default function Comment({ comment }: { comment: IComment }) {
  return (
    <View style={{
      marginVertical: 8
    }}>
      <Text style={{
        color: "gray",
        fontSize: 13,
        textDecorationLine: "underline"
      }}>{comment.email}</Text>
      <Text>@{comment.name} dijo:</Text>
      <Text>"{comment.body}"</Text>
    </View>
  )
}
