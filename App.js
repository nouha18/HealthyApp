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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  useColorScheme,
  View,
  Button,
  Plateform,
} from 'react-native';

const Stack = createNativeStackNavigator();

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home... again"
        onPress={() => navigation.navigate('Home')}
      />
         <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
      source={require('@expo/snack-static/react-native-logo.png')}
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
              screen: 'DetailsSCreen',
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
  onPress={() => navigation.push('Profile')}
/>
    </View>
  );
}
function Profile() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={DetailsScreen} />
      <Tab.Screen name="Start" component={HomeScreen} />
    </Tab.Navigator>
  );
}
const App = () => {
  const [text, setText] = React.useState(' ');
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const isDarkMode = useColorScheme() === 'dark';
 
 React.useEffect(()=>{
   if(Plateform == 'ios'){
     console.log("ios");
   } else{
     console.log('android');
   }
 },[])
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? 'black' : 'white', flex: 1,flexDirection:'row',
            justifycontent:'center',padding:20,margin:10,
          }}>
            <TextInput 
              style={styles.password}
              selectionColor={'pink'}
              placeholder="Password ..."
              onChangeText={newText => setText(newText)} 
             />
      </View>

      </ScrollView>
      <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
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
            backgroundColor: '#f4511e',
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Details" component={DetailsScreen}  options={({ route }) => ({ title: route.params.name })} />
        <Stack.Screen name="Profile" component={Profile}  options={({ route }) => ({ title: route.params.name })} />
  
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
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
