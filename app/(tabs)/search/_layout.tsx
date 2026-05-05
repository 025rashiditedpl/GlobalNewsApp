import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"  />   {/* search feed */}
      <Stack.Screen name="detail" />   {/* news detail */}
    </Stack>
  );
}