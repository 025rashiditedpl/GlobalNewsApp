import { Image } from 'expo-image';
import { Platform, StyleSheet, View,Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { styles } from '@/style/mystyle';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SplashScreen(){

      const router = useRouter();
  

 useEffect(() => {
  setTimeout(async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
     router.replace('/(tabs)/home');
    } else {
      router.replace('/login');
    }
  }, 2000);
}, []);

return(
    <View style={styles.container}>
        <Image
        style={styles.splashimage}
         source={require('../assets/images/newsapplogo.png')}
      />
      <Text style={styles.splashtext}>Global News App</Text>
    </View>
)

}


