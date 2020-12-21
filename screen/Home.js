import firebase from 'firebase';
import React,{useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Card,FAB,} from 'react-native-paper';
import {useSelector,useDispatch} from 'react-redux';




const Home=(props) => {
   const {data,loading} = useSelector((state)=>{
      return state
    })
    const dispatch = useDispatch()
    useEffect(()=>{
      let unmounted = false;
      
    
          const myitem = firebase.database().ref("empdata")
          
         
          myitem.on("value",  datasnap=>{
           
            var aux=[]
            datasnap.forEach(child=>{
              aux.push({
                id:child.key,
                name:child.val().name,
                phone:child.val().phone,
                email:child.val().email,
                salary:child.val().salary,
                position:child.val().position,
                uploadpicture:child.val().uploadpicture,

              })
             
            
            })
            
           
            dispatch({type:"ADD_DATA",payload:aux})
            dispatch({type:"SET_LOADING",payload:false})
          })
          return () => { unmounted = true };
          },[])

     renderlist = ((item)=>{
            return(
        <Card style = {styles.Cardstyle} key={item.name} onPress={()=>{props.navigation.navigate("Profile",{item})}}>
        <View style={styles.Viewstyle}>
            <Image
                style={{width:70,height:70,borderRadius:30,}}
                source={{uri:item.uploadpicture}}
                />
    
        <View style={{marginLeft:15}}>
      <Text style={{fontSize:30}}>{item.name}</Text>
      <Text style={{fontSize:18}}>{item.position}</Text>
      </View>
      </View>
    </Card>
            )
   


    })
    
            return(
               <View style={{marginTop:10,}}>
                 {
                    loading?
                        <ActivityIndicator size="large" color="blue"/>
                       :
                        <View>
                        <FlatList
                                data={data}
                                renderItem={({item})=>{
                                    
                                    return (renderlist(item))
                                    }}
                                    keyExtractor={(item) => `${item.name}`}
                          />
                          <FAB
                    onPress={()=>{props.navigation.navigate("Createemp")}}
                        style={styles.fab}
                        small = {false}
                        icon="plus"
                        theme={{colors:{accent:'#006aff'}}}
                      />
                        </View>}    


               
            </View>
            
            )
          
    
   }
   
 
   

const styles = StyleSheet.create({
  Cardstyle: {
      margin:5,
      padding:5,
  },
  Viewstyle:{
      
    flexDirection:"row"

  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: -40,
    
    
  },
 
});

export default Home;
