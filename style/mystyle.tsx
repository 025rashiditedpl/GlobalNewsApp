import { Platform, StyleSheet } from "react-native";
import { colors } from "./mycolor";

export const styles = StyleSheet.create({
container:{
    width:'100%',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: colors.whitecolor,
     gap:5
},
 homeContainer: {
  width:'100%',
  flex: 1,
  backgroundColor: '#fff',
},
topBar: {
  paddingVertical: 25,
    
  backgroundColor: '#ffae00',
  alignItems: 'center',
  justifyContent: 'center',
  alignContent: 'center',
},
hometopBar: {
  backgroundColor:'#fff',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: 50,
  paddingBottom: 10,
   borderBottomWidth: 0.9,
    borderBottomColor: "rgba(0,0,0,0.08)",

},
topBarText: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#333',
},
  roundbutton: {
    
    backgroundColor: '#ff0000',
      height: 45,   
      width: 45,
      // make it circular
      borderRadius: 22.5,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
       alignSelf: 'center',
      
  },
  logouticon:{
  width: 26,
  height: 26,
  tintColor: '#e9ebec',
},
splashimage:{
    width:175,
    height:175
},
splashtext:{
    color:'#111010',
    fontSize:18,
    fontStyle:'normal',
    alignItems:'center',
    fontWeight: 'bold',

},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  errorMessage:{
    fontSize: 15,
    fontWeight:'400',
    margin:10,
    alignContent:'center',
    justifyContent:'center',
    alignSelf:'center',
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.amberColor,
     height: 60,
     width: '55%',
      borderRadius: 10.0,
  },
  buttonText: {
    color: 'rgb(5, 5, 5)',
    fontSize: 16,
    fontFamily: 'arial',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 60,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
    inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 0.4,
  borderRadius: 8,
  paddingHorizontal: 10,
  width: '75%',
  height: 50,
  marginVertical:4,
  backgroundColor: '#f0f0f0',
},
input: {
  flex: 1,
  marginLeft: 10,
},
registerLink: {
  marginTop: 18,
  color: '#0e0f0f',
  textDecorationLine: 'underline',
  fontSize: 14,
},

rememberMe: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',  
  marginLeft: '12.5%',      
  marginBottom: 10,
  gap: 8,
},
rememberMeText: {
  fontSize: 14,
  color: '#333',
},
errorText: {
  color: 'red',
  fontSize: 12,
  alignSelf: 'flex-start',  
  paddingLeft: '12.5%',
},



// home
 categoryWrapper: {
    marginVertical:5,
    height: 60,     
    backgroundColor: "#ffffff",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  categoryList: {
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
  },
  categoryChip: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#f5f4f0",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryChipActive: {
    backgroundColor: colors.amberColor,
    borderColor: colors.amberColor,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
  },
  categoryTextActive: {
    color: colors.blackColor,
    fontWeight: "600",
  },
  loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
 newsList: {
    padding: 12,
    gap: 12,
   
  },
  newsCard: {
    margin:10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 0.5,
    elevation:0.2,
    borderColor: "rgba(0,0,0,0.07)",
    
  },
  newsImage: {
    width: "100%",
    height: 180,
  },
  newsImagePlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  newsImagePlaceholderText: {
    color: "#aaa",
    fontSize: 12,
  },
  newsContent: {
    padding: 12,
    gap: 6,
  },
  newsSource: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1a2e",
    lineHeight: 20,
  },
  newsDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  newsFooter: {
  flexDirection: "row",
  justifyContent: "space-between",  // ← left & right
  alignItems: "center",
  marginTop: 8,
},
newsReadMore: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  newsbookmarkicon:{
    alignContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end'

  },

  sortcontainer:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:10,
     alignContent:'flex-start',
    alignItems:'center',
  },

  searchContainer:{
    flexDirection:'row',
    width:'76%',
    height:58,
    alignContent:'flex-start',
    alignItems:'center',

    padding:10,
    marginStart:10,
    borderRadius:14,
    borderWidth:0.4,
    borderColor:colors.blackColor,
    backgroundColor:'#eeece7'
  },
  searchinputcontainer:{
    width:'84%',
    backgroundColor:'#fff',
    borderColor:colors.blackColor,
    borderWidth:0.5,
    borderRadius:10,
    height:42,
    paddingStart:8,
    marginHorizontal:10
  },
  filterbox:{
    width:46,
    height:46,
    backgroundColor:'#fff',
    borderColor:colors.blackColor,
    borderWidth:0.5,
    borderRadius:10,
    marginEnd:10,
    alignContent:'center',
    justifyContent:'center'
  },
  filtericon:{
    alignSelf:'center'
  },
  dateTest:{
    fontWeight:'400',
    fontSize:16,
    marginEnd:10,
    alignSelf:'flex-end'
  },
profileContainer: {
  width:'100%',
  flex: 1,
  backgroundColor: '#f5f1e5',
},

  editBox:{
    flexDirection:'row',
    width:'auto',
    height:40,
    borderWidth:0.8,
    borderRadius:10,
    borderColor:colors.blackColor,
    backgroundColor:colors.whitecolor,
    alignContent:'center',
    justifyContent:'center'

  },
    editicon:{
    width: 20,
    height: 20,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginStart:10,
    tintColor:colors.blackColor,
},
editText:{
  fontSize:16,
  fontWeight:'600',
  paddingHorizontal:15,
  alignContent:'center',
  alignItems:'center',
  alignSelf:'center',
  color:colors.blackColor
},
imagecontainer:{
  width:'100%',
  height:'auto',
  borderWidth:0.2,
  alignContent:'center',
  alignItems:'center',
  alignSelf:'center',
  backgroundColor:colors.whitecolor,
},
avatarWrapper: {
  position: 'relative',
  marginBottom: 8,
},
cameraIconOverlay: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#ffae00',
  borderRadius: 12,
  padding: 6,
},
profileimage: {
  height: 100,
  width: 100,
  borderRadius: 50,
  marginTop:10,
  alignSelf: 'center', 

},
useritemText:{
  fontSize:18,
  fontWeight:'400',
  color:colors.blackColor
},
username:{
fontSize:18,
  fontWeight:'bold',
  color:colors.blackColor
},
userdetail:{
  alignContent:'center',
  alignItems:'center',
  marginBottom:12
},
profilebody: {
  backgroundColor: colors.whitecolor,
  borderWidth:0.3,
  borderRadius:12,
  marginTop: 20,
  marginHorizontal: 16,
  
},
infotitle:{
  fontSize:16,
  marginVertical:10,
  marginHorizontal:16,
  color:'#858181'
},

profilecontentrow:{
  flexDirection:'row',
  
},
profilemainrow:{
  marginVertical:10,
  paddingHorizontal: 16, 
  flexDirection:'row', 
 justifyContent:'space-between',
  alignItems:'center',
  width:'100%'
},
itemediticon:{
  width:20,
  height:20,
  alignItems:'center',
  
  alignContent:'center'
},

iconbody:{
  width:'auto',
  height:'auto',
  padding:10,
  borderRadius:12,
  backgroundColor:colors.amberColor
},
userverticalcolumn:{
  marginHorizontal:10,
  flexDirection:'column'
},
hintText:{
  fontSize:16,
  color:'#858181'
},
profiledivider: {
  flexDirection:'row',
  width: '100%',
  height: 1,
  backgroundColor: '#ccc', 
  marginVertical: 8,       
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},

modalBox: {
  width: '85%',
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 12,
},

modalinput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  padding: 10,
  marginVertical: 8,
},
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 15,
},
trashicon:{
     alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginStart:10,
},

// error boundary

errorcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f4f0",
    paddingHorizontal: 24,
    gap: 12,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FCEBEB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  errortitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a2e",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
  },

  errorBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#E24B4A",
    marginTop: 4,
  },
  errorBodyText: {
    fontSize: 12,
    color: "#E24B4A",
    fontFamily: "monospace",
    lineHeight: 18,
  },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 8,
  },
  retryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
   alertText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 20,
    color: '#333',
  },

   webcontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 54 : 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a2e",
  },
  webview: {
    flex: 1,
  },



})