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

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Plateform,
} from 'react-native';

const App = () => {
  const [text, setText] = React.useState(' ');
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const isDarkMode = useColorScheme() === 'dark';
 
 React.useEffect(()=>{
   if(Plateform =='ios'){
     console.log("ios");
   }else{
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  password:{padding:10,
  height:50,
  borderRadius: 10,
  width:320,
  lineHeight: 2,
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
