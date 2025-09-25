import { Text } from "react-native";

export default function FavoriteLabel({ type }: { type: "post" | "user" }) {
  return <Text style={{
    textTransform: "uppercase",
    fontSize: 11,
    padding: 2,

    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    alignSelf: 'flex-end',
    textAlign: 'center',
    borderColor: "#D1D5DC",
    color: "gray"
  }}>{type === "post" ? "Post" : "Usuario"}</Text>


}
