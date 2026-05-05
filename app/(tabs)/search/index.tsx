import { styles } from "@/style/mystyle";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View,Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { NewsItems } from "@/types/newsResponse";
import { Image } from 'expo-image';
import { keyValues } from "@/util/constants";
import { addNews, deleteNewsByUrl, getAllNews } from "@/database/bookmarkrepo";
import { useFocusEffect, useRouter } from "expo-router";
import { DbNews } from "@/types/dbnews";
import { colors } from "@/style/mycolor";
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternet from "@/components/Nointernet";


export default function SearchScreen(){
 const router = useRouter();
 const [dateObj, setDateObj] = useState(new Date()); 
 const [selectDate, setSelectDate] = useState('');   
 const [showPicker, setShowPicker] = useState(false);
 const [inputquery,setQuery]=useState('')
 const [news, setNews] = useState<NewsItems[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [errorMessage,setErrorMessage]=useState('')
 const[isNewsEmpty,setNewsEmpty]=useState(false)
 const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const [bookmarkedUrls, setBookmarkedUrls] = useState<string[]>([]);
 const [refreshing, setRefreshing] = useState(false);
const { isConnected } = useNetInfo();
 const onDateChange = (event: any, selectedDate?: Date) => {setShowPicker(false)
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

const updateBookmarkStatus = useCallback(() => {
    const savedItems = getAllNews();
    const urls = savedItems.map(item => item.url);
    setBookmarkedUrls(urls);
  }, []);

    useFocusEffect(
      useCallback(() => {
        updateBookmarkStatus();
      }, [updateBookmarkStatus])
    );

     const toggleBookmark = (item: NewsItems) => {
        const isBookmarked = bookmarkedUrls.includes(item.url);
    
        if (isBookmarked) {
          
          deleteNewsByUrl(item.url);
        } else {
      
          const saveNews: DbNews = {
            id: 0,
            source_id: item.source.id ?? '',
            source_name: item.source.name,
            author: item.author ?? '',
            title: item.title ?? '',
            description: item.description ?? '',
            url: item.url,
            urlToImage: item.urlToImage ?? '',
            publishedAt: item.publishedAt,
            content: item.content ?? ''
          };
          addNews(saveNews);
        }
        
        updateBookmarkStatus();
      };


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

      const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchNews();
        setRefreshing(false);
      }, [selectDate,inputquery]);
      
       
        if (!isConnected) {
          return (
            <NoInternet onRetry={fetchNews}/>
          )
        }

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
               refreshControl={
                  <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                      colors={["#1a1a2e"]} 
                      tintColor={"#1a1a2e"}  
                      title="Refreshing news..." 
                      titleColor={"#888"}
                    />
               }
               renderItem={({ item }) => {
                 const isSaved = bookmarkedUrls.includes(item.url)
                 return  (
               <TouchableOpacity
               style={styles.newsCard}
               activeOpacity={1}
               onPress={()=>{
                   router.push({
               pathname: "/(tabs)/search/detail",
               params:{detailitem:JSON.stringify(item)}
              })
               }}
               >
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
                 <TouchableOpacity onPress={() => toggleBookmark(item)}>
                  <Ionicons
                  name={isSaved ? 'bookmark-sharp' : 'bookmark-outline'} 
                  size={20}
                  color={isSaved ? colors.amberColor : colors.blackColor}
                  />
                </TouchableOpacity>
                </View>

              </View>
            </TouchableOpacity>
          )}  
               }
                
                
               
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