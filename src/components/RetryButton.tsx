import { Text, TouchableOpacity } from "react-native";

export default function RetryButton({ callback }: { callback: () => any }) {
  return <TouchableOpacity style={{
    backgroundColor: "#007DF6",
    padding: 8
  }} onPress={callback}>

    <Text style={{
      textTransform: "uppercase",
      textAlign: 'center',
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold'
    }}>
      Reintentar
    </Text>

  </TouchableOpacity>
}
