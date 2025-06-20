import { View, Text, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to Star Delight
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#3b82f6', // blue-500 in Tailwind
    fontWeight: 'bold',
    fontSize: 20,
  },
});
