import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"  />   {/* home feed */}
      <Stack.Screen name="detail" />   {/* news detail */}
    </Stack>
  );
}