import { styles } from "@/style/mystyle";
import { User } from "@/types/user";
import { FormErrors, validateLoginForm } from "@/util/loginValidation";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View,Text, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[isLoading, setIsLoading] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
   const [errors, setErrors] = React.useState<FormErrors>({});

    const handleChange = (field: keyof FormErrors, value: string) => {
       
   
       if (field === 'email')    setEmail(value);
       if (field === 'password') setPassword(value);
       const newErrors = validateLoginForm(
         field === 'email'    ? value : email,
         field === 'password' ? value : password,
       );
       setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
     };

  const handleSubmit = async () => {
    const userData = await AsyncStorage.getItem('user');

     const newErrors = validateLoginForm(email, password);
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }


    if (userData) {
      const user: User = JSON.parse(userData);
      if (user.email === email && user.password === password) {
           await AsyncStorage.setItem('isLoggedIn', 'true');

      if (rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', email);
        await AsyncStorage.setItem('rememberedPassword',password)
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
         await AsyncStorage.removeItem('rememberedPassword');
      }

        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        

          router.replace('/(tabs)/home');
        }, 5000);
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('No user found. Please register first.');
    }
  };

  useEffect(() => {
  const loadRememberedEmail = async () => {
    const savedEmail = await AsyncStorage.getItem('rememberedEmail');
    const savedPassword=await AsyncStorage.getItem('rememberedPassword')
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword)
      setRememberMe(true);
    }
  };
  loadRememberedEmail();
}, []);




  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Login</Text>
       <View style={[
             styles.inputContainer,
             errors.email ? { borderColor: 'red',borderWidth:0.7 } : {}
             ]}
        >
        <Ionicons name="mail" size={20} color="#333" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(v)=>handleChange('email',v)}
          style={styles.input}
        />
      </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View style={[
              styles.inputContainer,
              errors.password ? { borderColor: 'red',borderWidth:0.7 } : {}
              ]} >
        <Ionicons name="lock-closed" size={20} color="#333" />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(v)=>handleChange('password',v)}
          secureTextEntry
          style={styles.input}
        />
      </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}  
        <TouchableOpacity
  style={styles.rememberMe}
  onPress={() => setRememberMe(!rememberMe)}
>
  <Ionicons
    name={rememberMe ? 'checkbox' : 'square-outline'}
    size={22}
    color={rememberMe ? '#333' : '#333'}
  />
  <Text style={styles.rememberMeText}>Remember Me</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
       <View style={styles.centerContent}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1a1818" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </View>
      </TouchableOpacity>
      
      <Text style={styles.registerLink} onPress={() => router.push('/register')}>
        Don't have an account?{' '}
        
      </Text>

    </View>
  );
}