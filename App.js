
import 'react-native-gesture-handler';
import  firebase from 'firebase';
import React from 'react';
import {
  StyleSheet,
  LogBox,
  StatusBar
  
} from 'react-native';
import Home from './screen/Home';
import Createemp from './screen/Createemp';
import Profile from './screen/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer/reducer'



const store = createStore(reducer)

const Stack = createStackNavigator();

const headerstyle={
  title:"Suffa & Beta $$$",
  headerTintColor:"white",
  headerStyle:{
    backgroundColor:"#006aff"
  }

}

class App extends React.Component {

  componentDidMount()
  {
    firebaseconfig={


      apiKey: "AIzaSyDuUKvwRiC86I-5bLjRi0Cx29WD_igU2T4",
      authDomain: "employeedata-aa0ae.firebaseapp.com",
      databaseURL: "https://employeedata-aa0ae.firebaseio.com",
      projectId: "employeedata-aa0ae",
      storageBucket: "employeedata-aa0ae.appspot.com",
      messagingSenderId: "375482925688",
      appId: "1:375482925688:web:a5d570234b5aa71056238d",
      measurementId: "G-Y41RWJLC41"
  }
  if(!firebase.apps.length)
      {
        firebase.initializeApp(firebaseconfig)

      }


  }
 
 render()
 {
 
  return (
    <Provider store = {store}>
    <NavigationContainer>
    <StatusBar
          backgroundColor = "black"
          barStyle = "light-content"
          />
          
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}  options={headerstyle}/>
        <Stack.Screen name="Createemp" component={Createemp} options={{...headerstyle,title:"Create New Employee"}}/>
        <Stack.Screen name="Profile" component={Profile} options={{...headerstyle,title:"Employee Profile"}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}
}   

const styles = StyleSheet.create({
  Viewstyle: {
    flex:1,
    backgroundColor:"#ebebeb"  
  },
 
});

export default App;
