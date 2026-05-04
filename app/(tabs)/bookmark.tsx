import { deleteAllNews, deleteNews, getAllNews } from "@/database/bookmarkrepo";
import { styles } from "@/style/mystyle";
import { NewsItems } from "@/types/newsResponse";
import { useCallback, useEffect, useState } from "react";
import { View,Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from "react-native";
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { DbNews } from "@/types/dbnews";
import { colors } from "@/style/mycolor";
import { useFocusEffect } from "expo-router";

export default function BookMarkScreen(){

        const [news, setNews] = useState<DbNews[]>([]);

         const loadNews = useCallback(() => {
    const data = getAllNews();
    setNews(data);
  }, []);

           useFocusEffect(
    useCallback(() => {
      loadNews();
    }, [loadNews])
  );

   const handleDeleteAll = () => {
    Alert.alert(
      "Delete All",
      "Are you sure you want to remove all bookmarks?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            await deleteAllNews();
            loadNews();
          } 
        }
      ]
    );
  };


   return(
    <View style={styles.homeContainer}>

       <View style={styles.hometopBar}>
                     <Text style={styles.topBarText}>Bookmarks</Text>
                     <TouchableOpacity 
                     style={styles.editBox}
                  onPress={ () => {
                        handleDeleteAll()
                      }}
                     >
                       
          <Ionicons name="trash" size={22} color={colors.redColor} 
          style={styles.trashicon}
           
           />


                   <Text style={styles.editText}>Delete All</Text>
                     </TouchableOpacity>
              </View> 


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
                  {item.source_name} ·{" "}
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
                <TouchableOpacity onPress={() => { 
                  deleteNews(item.id);
                  loadNews();
                 }}>
             <Ionicons name="bookmark-sharp" size={20} color={colors.amberColor} />
              </TouchableOpacity>
                </View>

              </View>
            </View>
          )}
        />
    
           </View>
          )
        
     





}