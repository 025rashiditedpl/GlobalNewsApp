import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { styles } from "@/style/mystyle";

type Props = {
  onRetry: () => void;
};

export default function NoInternet({ onRetry }: Props) {
  const pulse = useRef(new Animated.Value(1)).current;

 
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.6, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,   duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.iconCircle, { opacity: pulse }]}>
        <Ionicons name="wifi-outline" size={40} color="#1a1a2e" />
      </Animated.View>
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your connection and try again.
      </Text>
      <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
        <Ionicons name="refresh-outline" size={18} color="#fff" />
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

