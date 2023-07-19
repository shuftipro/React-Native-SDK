/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NativeModules} from 'react-native';
const {ShuftiproReactNativeModule} = NativeModules;

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = async () => {
    
    const config = {
      "open_webview": false,
      "asyncRequest": false,
      "captureEnabled": false
    };
    const verificationObj = 
    {  
      reference: "Unique_reference",
      country: "",
      language: "",  
      email: "johndoe@example.com",  
      callback_url: "http://www.example.com",  
      redirect_url: "http://www.example.com",
      show_consent: 1,
      show_results: 1, 
      verification_mode:"image_only",
      show_privacy_policy: 1,
      open_webview:false,
      face: {proof: ""},
      document: {  
               supported_types:["passport","id_card" ,"driving_license","credit_or_debit_card"],
               name: {  
                   first_name: "",  
                   last_name: "",  
                   middle_name: ""  
                   },  
               dob: "",  
               document_number: "",  
               expiry_date: "",  
               issue_date: "",  
               fetch_enhanced_data: "",
               gender: "",
               backside_proof_required: "0",
      }, 
    
  };
  const auth = {
    "auth_type":"basic_auth", 
    "client_id": "enter_your_client_id",
    "secret_key": "enter_your_secret_key"
  }; 

  ShuftiproReactNativeModule.verify(JSON.stringify(verificationObj), JSON.stringify(auth), JSON.stringify(config), (res)=>{
    //setDisplayText(res);
     const parsedResponse = JSON.parse(res); // Parse the JSON string into an object

     const event = parsedResponse.event; // Access the value of the "event" property

    });
  };


  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic"
      >
    <Button
      title="Open ShuftiPro Mobile SDK"
      color="#841584"
      onPress={onPress}
    />
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
