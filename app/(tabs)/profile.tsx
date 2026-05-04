import { styles } from "@/style/mystyle";
import { useEffect, useState } from "react";
import { View,Text,Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import ProfileModal from "@/components/profileModal";

export default function ProfileScreen(){
   const[isReadOnly,SetReadOnly]=useState(true)
   const [users, setUsers] = useState<User>();

   const [profileImage, setProfileImage] = useState<string | null>(null);
   const [modalVisible, setModalVisible] = useState(false);
   const[editingValue,setEditValue]=useState('')
   const [placeHolderValue,setPlaceHolder]=useState('')

   const FIELD_MAP: Record<string, keyof User> = {
  "Username": "username",
  "Email":    "email",
  "Phone":    "phone",
  "Country":  "country",
};

 useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUsers(JSON.parse(userData));
      
      }
  
      const savedImage = await AsyncStorage.getItem('profileImage');
      if (savedImage) {
        setProfileImage(savedImage);
      }
    };
    fetchUserData();
  }, []);

   const handlePickImage = async (type: 'camera' | 'gallery') => {
   
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Camera permission is required.');
        return;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Gallery permission is required.');
        return;
      }
    }

   
    const result = type === 'camera'
      ? await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        })
      : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem('profileImage', uri); 
    }
  };

   const showImageOptions = () => {
    alert('Choose Option');
    Alert.alert('Update Profile Photo', 'Choose an option', [
      { text: 'Camera',  onPress: () => handlePickImage('camera')  },
      { text: 'Gallery', onPress: () => handlePickImage('gallery') },
      { text: 'Cancel',  style: 'cancel' },
    ]);
  };

    return(
         <View style={styles.profileContainer}>
                <View style={styles.hometopBar}>
                <Text style={styles.topBarText}>Profile</Text>
                <TouchableOpacity 
                style={styles.editBox}
                onPress={()=>{
                  SetReadOnly(!isReadOnly)
                }}
                >
                   <Image
                     style={styles.editicon}
                     source={require('../../assets/images/edit_icon.png')}
                          />
                          <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
         </View> 
          <View style={styles.imagecontainer}>
             <TouchableOpacity onPress={showImageOptions} style={styles.avatarWrapper}>
          <Image
            style={styles.profileimage}
            source={
              profileImage
                ? { uri: profileImage }                              
                : require('../../assets/images/profile.png')        
            }
          />
      
          <View style={styles.cameraIconOverlay}>
            <Ionicons name="camera" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
         <View style={styles.userdetail}>
           {users ? (
          <Text style={styles.username}>{users.username}</Text>
        ) : (
          <Text style={styles.username}></Text>
        )}

         {users ? (
          <Text style={styles.useritemText}>{users.email}</Text>
        ) : (
          <Text style={styles.useritemText}></Text>
        )}
         </View>

          </View>

          <View style={styles.profilebody}>
            <Text style={styles.infotitle}>Personal info</Text>
          <ProfileRow
         icon="people-outline"
         label="Username"
         value={users?.username}
         isEdit={isReadOnly}
         onPress={(value,placeholder)=>{
             setModalVisible(true)
             setEditValue(value)
             setPlaceHolder(placeholder)
           }}
         />

       <ProfileRow
        icon="mail-outline"
        label="Email"
        value={users?.email}
        isEdit={isReadOnly}
        onPress={(value,placeholder)=>{
            setModalVisible(true)
             setEditValue(value)
             setPlaceHolder(placeholder)
        }}
     />

<ProfileRow
  icon="call-outline"
  label="Phone"
   value={users?.phone}
   isEdit={isReadOnly}
   onPress={(value,placeholder)=>{
             setModalVisible(true)
             setEditValue(value)
             setPlaceHolder(placeholder)
  }}
  />

   <ProfileRow
   icon="globe-outline"
   label="Country"
   value={users?.country}
   isEdit={isReadOnly}
   onPress={(value,placeholder)=>{
              setModalVisible(true)
              setEditValue(value)
              setPlaceHolder(placeholder)
  }}
  />

          </View>

           
<ProfileModal
  visible={modalVisible}
  editItem={editingValue}
  placeholder={placeHolderValue}
  onUpdate={async (value, placeholder) => {
    const fieldKey = FIELD_MAP[placeholder ?? ""];

    if (!fieldKey) return;

    const updatedUser: User = { ...users, [fieldKey]: value } as User;

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

    setUsers(updatedUser);       
    setModalVisible(false);
  }}
  onClose={() => setModalVisible(false)}
/>

            </View>
    )
}

const ProfileRow = ({
  icon,
  label,
  value,
  isEdit,
  onPress,
}: {
  icon: any;
  label: string;
  value: string | undefined
  isEdit:boolean
  onPress: (value: string,placeHolder:string) => void;
}) => {
  return (
    <View>
      
      <TouchableOpacity
       style={styles.profilemainrow}
      >
          <View 
      style={styles.profilecontentrow}
       
      >
       

        <View style={styles.iconbody}>
          <Ionicons name={icon} size={20} color="#1a1a2e" />
        </View>

        <View style={styles.userverticalcolumn}>
          <Text style={styles.hintText}>{label}</Text>
          <Text style={styles.hintText}>{value}</Text>
        </View>

      </View>
     {
      !isEdit?(
         <TouchableOpacity
          onPress={()=>{
        onPress(value??'',label)
      }}
         > 
             <Image
    style={styles.itemediticon}
    source={require('../../assets/images/edit_icon.png')}
    />
          </TouchableOpacity>
      ):(
        <View></View>
      )
     }
        
      </TouchableOpacity>
    

    
      {
        label!='Country'?(
          <View style={styles.profiledivider} />
        ):(
          <View></View>
        )
      }
    </View>
  );
};

