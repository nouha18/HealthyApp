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
 import { useNavigation, NavigationContainer } from '@react-navigation/native';
 //import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
       source={require('./handy.png')}
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
       <Stack.Navigator 
       screenOptions={{
         title:'header',
         headerStyle: {
           backgroundColor: '#f4511e',
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
           fontWeight: 'bold',
         },
       }}>
         <Stack.Screen name="Home" component={HomeScreen}   options={{
           title: 'Myhome',
           headerStyle: {
             backgroundColor: '#127741',
              color:'#000'
           },
           headerTitle: (props) => <LogoTitle {...props} />,
           headerRight: () => (
             <Button
               onPress={() => alert('Setting Page')}
               title="Info"
               color="#000"
           />
           ),
           headerTintColor: '#127456',
           headerTitleStyle: {
             fontWeight: 'bold',
             height:50,
           },
         }} />
       <Stack.Screen name="Details" component={DetailsScreen}  options={{
           title: 'Details',
           headerStyle: {
             backgroundColor: '#125741',
           },}} />
            <Stack.Screen name="Profile" component={Profile}  options={{
           title: 'Profile',
           headerStyle: {
             backgroundColor: '#125741',
           },}} />
       </Stack.Navigator>
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
