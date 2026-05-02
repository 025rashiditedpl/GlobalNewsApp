import { styles } from "@/style/mystyle";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { View,Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { NewsItems } from "@/types/newsResponse";
import { Image } from 'expo-image';
import { keyValues } from "@/util/constants";


export default function SearchScreen(){

 const [dateObj, setDateObj] = useState(new Date()); 
 const [selectDate, setSelectDate] = useState('');   
 const [showPicker, setShowPicker] = useState(false);
 const [inputquery,setQuery]=useState('')
 const [news, setNews] = useState<NewsItems[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [errorMessage,setErrorMessage]=useState('')
 const[isNewsEmpty,setNewsEmpty]=useState(false)
 const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

 const onDateChange = (event: any, selectedDate?: Date) => {
  setShowPicker(false);

  if (selectedDate) {
    setDateObj(selectedDate);
    const formatted = selectedDate.toISOString().split('T')[0];
    setSelectDate(formatted);
  }
};

  useEffect(()=>{
        const formatted = dateObj.toISOString().split('T')[0];
    setSelectDate(formatted);
    console.log('dateformat',selectDate)

  },[])

  useEffect(() => {
  if (!selectDate) return;
 
  
  if (debounceRef.current) {
    clearTimeout(debounceRef.current);
  }
 
 
  debounceRef.current = setTimeout(() => {
    fetchNews();
  }, 500);
 
  
  return () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };
}, [selectDate, inputquery]);



    const fetchNews = async () => {
    try {
      setNewsEmpty(false)
      setErrorMessage('')
      setIsLoading(true);
      setNews([]); 
 
      const query = inputquery === "" ? "world" : inputquery;
      const fromvalue=selectDate == "" ?"2026-03-30":selectDate
 
      const url = `https://newsapi.org/v2/everything?apiKey=${keyValues.APIKEY}&from=${encodeURIComponent(fromvalue)}&sortBy=${keyValues.SORTBYKEY}&q=${encodeURIComponent(query)}`;
      console.log('printurl',url)
      const response = await fetch(url);
      const data = await response.json();
 
     if (data.status === 'error') {
    setNewsEmpty(false);
     setErrorMessage(data.message);
     } else if (!data.articles || data.articles.length === 0) {
  setNewsEmpty(true);
  setErrorMessage('No News Data Found');
  } else {
  setNewsEmpty(false);
  setErrorMessage('');
  setNews(data.articles);
   }

    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };


    return(
         <View style={styles.homeContainer}>
             <View style={styles.hometopBar}>
                <Text style={styles.topBarText}>Search</Text>
                </View> 
                <View style={styles.sortcontainer}>
               <View style={styles.searchContainer}>
                 <Ionicons
                      name="search-outline"
                      size={20}
                      color="#1a1a2e"
                    /> 
                    <TextInput
                     style={styles.searchinputcontainer}
                     placeholder="Search,Articles,Topics"
                     value={inputquery}
                     onChangeText={(v)=>{
                      setQuery(v)
                     }}
                    />
                </View>
                <TouchableOpacity
                 style={styles.filterbox}
                  onPress={()=>{
                     setShowPicker(true)
                  }}
                 >
                   <Ionicons
                   style={styles.filtericon}
                    name="filter-outline"
                      size={25}
                      color="#1a1a2e"
                    
                   />
                   {showPicker && (
  <DateTimePicker
    value={dateObj}
    mode="date"
    onChange={onDateChange}
  />
)}
                </TouchableOpacity>

                </View>
                <Text style={styles.dateTest}>{selectDate}</Text>
                {
                    isLoading?(
                   <View style={styles.loaderContainer}>
                   <ActivityIndicator size="large" color="#1d1c1a" />
                   </View>
                    ):(
                     
                 errorMessage==''?
                 (
               <FlatList
               data={news}
               keyExtractor={(item, index) => index.toString()}
               contentContainerStyle={styles.newsList}
               showsVerticalScrollIndicator={false}
               renderItem={({ item }) => (
               <View style={styles.newsCard}>
              {item.urlToImage ? (
                <Image
                  source={{ uri: item.urlToImage }}
                   style={styles.newsImage}
                   placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
                   contentFit="cover"
                    transition={300}
                />
              ) : (
                <View style={styles.newsImagePlaceholder}>
                  <Text style={styles.newsImagePlaceholderText}>No Image</Text>
                </View>
              )}
              <View style={styles.newsContent}>
                <Text style={styles.newsSource}>
                  {item.source.name} ·{" "}
                  {new Date(item.publishedAt).toLocaleDateString()}
                </Text>
                <Text style={styles.newsTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.newsDesc} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.newsFooter}>
                  <Text style={styles.newsReadMore}>Read more</Text>
                  <TouchableOpacity>
                    <Ionicons
                      name="bookmark-outline"
                      size={20}
                      color="#1a1a2e"
                    />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
        />
                 ):(

                   <View style={styles.loaderContainer}>
                   <Text style={styles.errorMessage}>{errorMessage}</Text>
                   </View>
           
                 )

       
                    )
                }
             



              
            

            </View>
    )
}