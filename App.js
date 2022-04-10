/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {onFacebookButtonPress} from './pages/GooGLELogin.js';
 import { useNavigation, NavigationContainer } from '@react-navigation/native';
 //import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 import {
   SafeAreaView,
   ScrollView,
   Image,
   Text,
   TouchableOpacity,
   StatusBar,
   TextInput,
   StyleSheet,
   useColorScheme,
   View,
   Button,
   Dimensions,
   Plateform,
 } from 'react-native';
 import logo from './handy.png';
 const Stack = createNativeStackNavigator();
 //const Tab = createBottomTabNavigator();
 const {width,height} = Dimensions.get('screen');
 const Drawer = createDrawerNavigator();
 function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}
  
 function DetailsScreen({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Details Screen</Text>
       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
     <Text style={styles.button}>Home</Text>
      </TouchableOpacity>
      <Button
         title="Go back to first screen in stack"
         onPress={() => navigation.popToTop()}
       />
     </View>
   );
 }
 function LogoTitle() {
   return (
     <Image
       style={{ width: 50, height: 50 }}
       source={require('./handy.png')}
     />
   );
 }
 function Profile() {
   return (
     <Image
       style={{ width: 50, height: 50 }}
       source={require('./launchicon.png')}
     />
   );
 }
 function HomeScreen({ navigation }) {
   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Home Screen</Text>
  
        <Button
         title="Go to Details"
         onPress={() =>     navigation.navigate('Profile', {
           screen: 'DetailsSCreen',
           params: {
             screen: 'HomeScreen',
             params: {
               screen: 'Profile',
             },
           },
         })
         
         }
       />
       <Button
         title="Go to Details"
         onPress={() => navigation.navigate('Details')}
       />
       
 <Button
   title="Update the title"
   onPress={() => navigation.setOptions({ title: 'Updated!' })}
 />
 <Button
   title="Go to Profile.."
       onPress={() => navigation.navigate('Profile')}
    
  />
 </View>
 );
 }
 
 function MyDrawer() {
  return (
    // <Drawer.Navigator useLegacyImplementation>
    //   <Drawer.Screen name="Feed" component={Feed} />
    //   <Drawer.Screen name="Article" component={Article} />
    // </Drawer.Navigator>
    <onFacebookButtonPress/>
  );
}
onFacebookButtonPress
 const App = ({navigation}) => {
   const [text, setText] = React.useState(' ');
   const [passwordVisible, setPasswordVisible] = React.useState(true);
   const isDarkMode = useColorScheme() === 'dark';
  
  React.useEffect(()=>{
    if (Plateform == 'ios') {
      console.log('ios');
    } else {
      console.log('android');
    }
  },[]);
   return (
     <NavigationContainer>
   <MyDrawer/>
      
     </NavigationContainer>
 
   );
 };
 
 const styles = StyleSheet.create({
   password:{padding:10,
   height:50,
   borderRadius: 10,
   width:320,
   borderWidth:1,
   borderColor:'#127bcc'},
   sectionContainer: {
   marginTop: 32,
   paddingHorizontal: 24,
   },
   backgroundStyle:{
     marging:20,
   }
 });
 
 export default App;
