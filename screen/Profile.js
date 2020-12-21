import firebase from 'firebase';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Linking,
  Platform,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import{Card,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const Profile=(props)=>{
    const {id,name,email,phone,salary,position,uploadpicture} = props.route.params.item

    const opendailer=()=>{
        if(Platform.OS == "android")
        {
            Linking.openURL("tel:03344616166")
        }
        else{
            Linking.openURL("telprompt:03344616166")

        }


    }
    const fireemployee=()=>{
        
        firebase.database().ref('empdata').child(id).remove()
        .then(()=>{
            Alert.alert("Deleted")
            props.navigation.navigate("Home")
    })
    .catch(err=>Alert.alert(err))
         
    }
        

    
    return(
    <View style={styles.viewstyle}> 
        <LinearGradient
        colors={["#0033ff","#6bc1ff"]}
        style={{height:"20%"}}
        />
        <View style={{alignItems:"center"}}>
            <Image
                style={{height:140,width:140,borderRadius:140/2,marginTop:-70}}
                source={{uri:uploadpicture}}
            />
            <Text style={{fontSize:30,fontWeight:"bold",marginTop:20}}> {name}</Text>
            <Text style={{fontSize:18}}>{position}</Text>
        </View>
        
        <Card style={{margin:5,padding:10,marginTop:40}} onPress={()=>{Linking.openURL(`mailto:${email}`)}}> 
            <View style={{flexDirection:"row"}}>
            <Icon
            name="envelope-o"
            size={30}
            color="#006aff"
            
            />
            <Text style={{fontSize:18,marginLeft:10}}>{email}</Text>
            </View>
        </Card>
        <Card style={{margin:5,padding:10}} onPress={()=>opendailer()}>
            <View style={{flexDirection:"row"}}>
            <Icon
            name="phone-square"
            size={30}
            color="#006aff"
            
            />
            <Text style={{fontSize:18,marginLeft:10}}>{phone}</Text>
            </View>
        </Card>
        <Card style={{margin:5,padding:10}}>
            <View style={{flexDirection:"row"}}>
            <Icon
            name="dollar"
            size={30}
            color="#006aff"
            
            />
            <Text style={{fontSize:18,marginLeft:10}}>{salary}</Text>
            </View>
        </Card>
        <View style={{flexDirection:"row",justifyContent:"space-around"}}>
             <Button icon="account-edit" mode="contained" style={{margin:5,backgroundColor:"#006aff"}} 
             onPress={()=>{
                    props.navigation.navigate("Createemp",{id,name,email,phone,salary,position,uploadpicture})
                             }}>
                Edit Data
            </Button>
            <Button icon="delete" mode="contained" style={{margin:5,backgroundColor:"#006aff"}} onPress={()=>{fireemployee()}}>
                Fire
            </Button>



        </View>
        
    </View>
    )




}
const styles = StyleSheet.create({


    viewstyle:{
        flex:1,


    }





})
export default Profile;