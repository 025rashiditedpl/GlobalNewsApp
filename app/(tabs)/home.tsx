import { colors } from "@/style/mycolor";
import { styles } from "@/style/mystyle";
import { Categories } from "@/types/categories";
import { NewsItems } from "@/types/newsResponse";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View,Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Image } from 'expo-image';
import { keyValues } from "@/util/constants";
import { addNews, deleteNews, deleteNewsByUrl, getAllNews } from "@/database/bookmarkrepo";
import { DbNews } from "@/types/dbnews";


export default function HomeScreen(){
    const router = useRouter();
    const [categories, setCategories] = useState<Categories[]>([]);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [selectedCategory,setCategory]=useState("All")
    const [news, setNews] = useState<NewsItems[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage,setErrorMessage]=useState('')
   const [bookmarkedUrls, setBookmarkedUrls] = useState<string[]>([]);
    

     

 useEffect(() => {
    
     setCategories([
      { id: 1, name: 'All' },
      { id: 2, name: 'Business' },
      { id: 3, name: 'Entertainment' },
      { id: 4, name: 'General' },
      { id: 5,  name:'Health' },
      { id: 6,  name:'Science' },
      { id: 7,  name:'Sports' },
      { id: 8,  name:'Technology' }
    ]);
  }, []);

   useEffect(() => {
    fetchNews();
  }, [selectedCategory]);


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
      setErrorMessage('')
      setIsLoading(true);
      setNews([]); // clear old results
 
      const query = selectedCategory === "All" ? "world" : selectedCategory;
 
      const url = `https://newsapi.org/v2/everything?apiKey=${keyValues.APIKEY}&from=2026-02-29&sortBy=${keyValues.SORTBYKEY}&q=${encodeURIComponent(query)}`;
 
      const response = await fetch(url);
      const data = await response.json();
 
      if (data.articles != null) {
         setErrorMessage('')
         setNews(data.articles);
       
      }
      else if(data.status=='error'){
        setErrorMessage(data.message)
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };
 




   const handleLogout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    router.replace('/login');
  };

return(
    <View style={styles.homeContainer}>
        <View style={styles.hometopBar}>
        <Text style={styles.topBarText}>Home</Text>
        <TouchableOpacity style={styles.roundbutton} 
        onPress={()=>{
            handleLogout()
          }}>
         <Image
         style={styles.logouticon}
        source={require('../../assets/images/logoutoff.png')}
        />
       
        </TouchableOpacity>
      </View>
        <View style={styles.categoryWrapper}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isActive = selectedId === item.id;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedId(item.id)
                  setCategory(item.name)
                  console.log('categoryName:',item.name)
                }}
                style={[
                  styles.categoryChip,
                  isActive && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.categoryTextActive,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {
        isLoading?(
        <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1d1c1a" />
      </View>
        ):(
          errorMessage==''?(
 <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.newsList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
               const isSaved = bookmarkedUrls.includes(item.url);
            return(
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
                  <TouchableOpacity onPress={() => toggleBookmark(item)}>
                    <Ionicons
                      name={isSaved ? 'bookmark-sharp' : 'bookmark-outline'} 
                      size={20}
                     color={isSaved ? colors.amberColor : colors.blackColor}
                    
                    />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
          }
            
           
        />
          )
          :(
           <View style={styles.loaderContainer}>
             <Text style={styles.errorMessage}>{errorMessage}</Text>
           </View>
          )
        
        )
      }




    </View>
)

}