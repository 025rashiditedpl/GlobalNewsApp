import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { View, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/style/mystyle";
import { NewsItems } from "@/types/newsResponse";

export default function DetailScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const router = useRouter();
   const { detailitem } = useLocalSearchParams();

    const item: NewsItems = JSON.parse(detailitem as string);

  return (
    <View style={styles.webcontainer}>

      {/* back button */}
      <View style={styles.hometopBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#1a1a2e" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Ionicons name="bookmark-outline" size={22} color="#1a1a2e" />
      </View>

      {/* webview loads the article url */}
      <WebView
        source={{ uri: item.url }}
        style={styles.webview}
        startInLoadingState={true}
      />

    </View>
  );
}

