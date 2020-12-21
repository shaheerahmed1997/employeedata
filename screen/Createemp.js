import firebase from 'firebase';
import React, { useState } from 'react';
import {View,Text,StyleSheet,Modal,Image, KeyboardAvoidingView, Alert,ActivityIndicator} from 'react-native';
import {TextInput,Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';



const Createemp=({navigation,route})=>{
  const getdetail=(type)=>{
    if(route.params)
    {
      switch (type) {
        case "name":
          return route.params.name;
          break;
       case "phone":
          return route.params.phone;  
          break;
       case "email":
          return route.params.email;
          break;
       case "salary":
          return route.params.salary;
          break;
      case "position":
          return route.params.position;
          break;
     case "uploadpicture":
            return route.params.uploadpicture;
            break;
      }
      
    }
    else{
      return '';
    }


  }

 
const[name,setName] = useState(getdetail("name"))
const[phone,setphone] = useState(getdetail("phone"))
const[email,setemail] = useState(getdetail("email"))
const[salary,setsalary] = useState(getdetail("salary"))
const[position,setposition] = useState(getdetail("position"))
const[picture,setpicture] = useState(getdetail("uploadpicture"))
const[uploadpicture,setuploadpicture] = useState(null)
const[model,setmodel] = useState(false)
const [loading,setloading] = useState(false)
const [enableshift,setenableshift] = useState(false)

const submitdata=()=>{
    setloading(true) 
    if(route.params)
    {
      console.log(route.params.id)
      firebase.database().ref("empdata/"+ route.params.id).update({

        name:name,
        phone:phone,
        email:email,
        salary:salary,
        position:position,
        time:Date.now(),

      }).then(()=>{
        setName('')
  setemail('')
  setphone('')
  setpicture('')
  setposition('')
  setsalary('')
  setuploadpicture(null)
  setpicture(null)
  setloading(false)
  Alert.alert("Data is submitted")
  navigation.navigate('Home')


      })
      .catch(err=>Alert.alert(err))
    } 
    else{
  firebase.database().ref("empdata/").push().set({
    name:name,
    phone:phone,
    email:email,
    salary:salary,
    position:position,
    uploadpicture:uploadpicture,
    time:Date.now(),

    
  }).then(()=>{
  setName('')
  setemail('')
  setphone('')
  setpicture('')
  setposition('')
  setsalary('')
  setuploadpicture(null)
  setpicture(null)
  setloading(false)
  Alert.alert("Data is submitted")
  navigation.navigate('Home')

}).catch((err)=>{Alert.alert(err)
console.log(err)
})
}

  

            }
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const onloading=()=>{

    if(loading)
    {
        return(
            <View style={{margin:5}}>
           <ActivityIndicator size="large" color="#006aff"/>
            </View>
        )
    }
    else{
        return(
          
            <Button icon="content-save" mode="contained" style={{margin:5,backgroundColor:"#006aff"}} onPress={()=>{submitdata()}}>
    Save 
  </Button>
        )
    }




  }
  const handleupload=(image)=>
  {
    const data = new FormData();
    data.append('file',image)
    data.append('upload_preset','employeeApp')
    data.append('cloud-name','shaheerkk')
    fetch("https://api.cloudinary.com/v1_1/shaheerkk/image/upload",{
      method:"post",
      body:data
    }).then(res=>res.json())
    .then(data=>{console.log(data)
      setuploadpicture(data.url)
      
    })
    .catch(error=>console.log(error))

   
  }
    
    const opengallery=()=>{

        ImagePicker.launchImageLibrary( options,(response) => {
          //  console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = {uri:response.uri,type:`test/${response.uri.split('.')[1]}`,
              name:`test.${response.uri.split('.')[1]}`}
              handleupload(source)
              setpicture(response.uri)
              setmodel(false)
            
            }}
              
       
    
        )}
        const opencamera=()=>{

          ImagePicker.launchCamera( options,(response) => {
             // console.log('Response = ', response);
             
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                
               const source = {uri:response.uri,type:`test/${response.uri.split('.')[1]}`,
              name:`test.${response.uri.split('.')[1]}`}
              handleupload(source)
                setpicture(response.uri)
                setmodel(false)
                
              };} )
            
            
            
            
            }


   

return(
  <KeyboardAvoidingView behavior="position" style={{flex:1}} enabled = {enableshift} >
    <View> 
      <View>
        <Image   source={{uri: picture ? picture : null}} style={{marginLeft:115,margin:10,height:140,width:140,borderRadius:140/2,backgroundColor:"white"}} />
      </View>
      <Button icon="camera" mode="contained" style={{margin:5,backgroundColor:"#006aff"}} onPress={()=>{setmodel(true)}}>
    Upload Picture
  </Button>
        <TextInput
        style={styles.textinputstyle}
        returnKeyType="next"
        label="Name"
        value={name}
        onFocus={()=>{setenableshift(false)}}
        theme={{colors:{primary:"#006aff"}}}
        onChangeText={(val)=>{setName(val)}}
        mode="outlined"
        
        />
        <TextInput
        style={styles.textinputstyle}
        returnKeyType="next"
        label="Position"
        value={position}
        onFocus={()=>{setenableshift(false)}}
        theme={{colors:{primary:"#006aff"}}}
        onChangeText={(val)=>{setposition(val)}}
        mode="outlined"
        
        />
        <TextInput
        style={styles.textinputstyle}
        returnKeyType="next"
        label="Phone No"
        keyboardType={"number-pad"}
        onFocus={()=>{setenableshift(false)}}
        value={phone}
        theme={{colors:{primary:"#006aff"}}}
        onChangeText={(val)=>{setphone(val)}}
        mode="outlined"
        
        
        />

        <TextInput
        style={styles.textinputstyle}
        returnKeyType="next"
        label="email"
        keyboardType="email-address"
        value={email}
        onFocus={()=>{setenableshift(true)}}
        theme={{colors:{primary:"#006aff"}}}
        onChangeText={(val)=>{setemail(val)}}
        mode="outlined"
        
        
        />

        <TextInput
        style={styles.textinputstyle}
        returnKeyType="done"
        label="salary"
        value={salary}
        keyboardType="number-pad"
        onFocus={()=>{setenableshift(true)}}
        theme={{colors:{primary:"#006aff"}}}
        onChangeText={(val)=>{setsalary(val)}}
        mode="outlined"
     
        />
        
  {onloading()}
  <Modal
  visible={model}
  onRequestClose={()=>{setmodel(false)}}
  animationType={"slide"}
  transparent={true}
  >
  <View style={styles.modelviewstyle}>
  <View style={{flexDirection:"row",justifyContent:"space-around",margin:10}}>
            <Button icon="image-area" mode="contained" style={{backgroundColor:"#006aff",width:150}} onPress={()=>{opengallery()}}>
               Gallery
            </Button>
            <Button icon="camera" mode="contained" style={{backgroundColor:"#006aff",width:150}} onPress={()=>{opencamera()}}>
                Take Picture
            </Button>


  </View>
  
            <Button  mode="outlined" style={{margin:5}} theme={{colors:{primary:"#006aff"}}} onPress={()=>{setmodel(false)}}>
                Cancel
            </Button>

  
  </View>




  </Modal>
    </View>
    </KeyboardAvoidingView>
    


)



}

const styles = StyleSheet.create({

    textinputstyle:{
        margin:5
    },
    modelviewstyle:{
        position:"absolute",
        bottom:0,
        width:"100%",
        backgroundColor:"white",
        
    }



})

export default Createemp;