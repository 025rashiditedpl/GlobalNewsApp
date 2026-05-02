
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { FormErrors, validateRegisterForm } from '../util/registerValidation';
import { User } from '@/types/user';
import { styles } from '@/style/mystyle';

export default function RegisterScreen() {

  const router = useRouter();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const[phone,setPhone]=React.useState('')
  const[country,setCountry]=useState('india')
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});

  const handleChange = (field: keyof FormErrors, value: string) => {
    
    if (field === 'username') setUsername(value);
    if (field === 'email')    setEmail(value);
    if (field === 'phone')    setPhone(value);
    if (field === 'password') setPassword(value);

    
    const newErrors = validateRegisterForm(
      field === 'username' ? value : username,
      field === 'email'    ? value : email,
      field === 'phone'    ? value : phone,
      field === 'password' ? value : password,
    );
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
  };
 
  
const handleSubmit = async () => {
  
    const newErrors = validateRegisterForm(username, email, phone, password);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newUser: User = { username, email, phone, country, password };
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 5000);
  };  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>
      <View style={[
        styles.inputContainer,
        errors.username ? { borderColor: 'red',borderWidth:0.7 } : {}
        ]}>
       <Ionicons name="person" size={20} color="#333" />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(v)=> handleChange('username', v)}
          style={styles.input}
        />
      </View>
       {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
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
      <View style=
     {[
        styles.inputContainer,
        errors.phone ? { borderColor: 'red',borderWidth:0.7 } : {}
        ]}
      >
        <Ionicons name="call" size={20} color="#333" />
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={(v)=>handleChange('phone',v)}
          style={styles.input}
        />
      </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <View style= {[
        styles.inputContainer,
        errors.password ? { borderColor: 'red',borderWidth:0.7 } : {}
        ]}
      >
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}> 
        <View style={styles.centerContent}> 
        {isLoading ? (
          <ActivityIndicator size="large" color="#1a1818" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </View>
      </TouchableOpacity>
    </View>
  );
}