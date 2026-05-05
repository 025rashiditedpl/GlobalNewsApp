import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // check current state immediately on mount
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? true);
    });

    // subscribe — fires every time connection changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });

    // cleanup on unmount
    return () => unsubscribe();
  }, []);

  return { isConnected };
};