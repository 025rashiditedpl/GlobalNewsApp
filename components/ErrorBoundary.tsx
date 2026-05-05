import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/style/mystyle";


interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}


class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }


  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }


  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log("ErrorBoundary caught:", error.message);
    console.log("Component stack:", info.componentStack);
  }


  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorcontainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="warning-outline" size={40} color="#E24B4A" />
          </View>

          <Text style={styles.errortitle}>Something went wrong</Text>
          <Text style={styles.subtitle}>
            An unexpected error occurred. Please try again.
          </Text>

          {/* show error detail in dev mode */}
          {__DEV__ && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.retryBtn} onPress={this.handleRetry}>
            <Ionicons name="refresh-outline" size={18} color="#fff" />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }


    return this.props.children;
  }
}

export default ErrorBoundary;


