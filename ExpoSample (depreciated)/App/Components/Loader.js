import React from "react";
import {View, Text, ActivityIndicator, Image, StyleSheet, ImageBackground, SafeAreaView} from "react-native";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";

const loadingGif= '../Assets/Gif/upload_ie_new.gif';
const loaderGif= '../Assets/Gif/loaderImage.gif';
const LogoMini = './../Assets/logo_mini.png';

export default class Loader extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { loaderMsg, isLoader, loaderIcon } = this.props;

    const loaderTitle = () =>{
      return loaderMsg === null || loaderMsg === undefined ? "Loading" : loaderMsg;
    }

    if(isLoader){
      return (
        <View style={loaderStyles.mainContainer}>
            <View style={loaderStyles.lowerContainer}>
                {
                    loaderIcon === "uploading" &&  <ImageBackground source={require(loadingGif)} style={loaderStyles.bakcgroundImage} ></ImageBackground> ||
                    loaderIcon === "verifying" &&  <ImageBackground source={require(loaderGif)} style={loaderStyles.bakcgroundImage} ></ImageBackground>
                }
              <Text style={loaderStyles.loadText}>{loaderTitle()}</Text>
            </View>
          <View style={loaderStyles.footerView}>
          <Text style={loaderStyles.footerText}>&#169; Powered by </Text>
          <Image source={require(LogoMini)} style={{ width:widthPercentageToDP('15'), resizeMode:'contain' }} />
        </View>
        </View>
      );
    }else{ return (<></>) }
  }
}

const loaderStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent:'center',
  },
  bakcgroundImage: {
    width: widthPercentageToDP('50'),
    height: widthPercentageToDP('50'),
    borderRadius:100
  },
  lowerContainer: {
    marginBottom:heightPercentageToDP('10%'),
    alignItems:'center',
    justifyContent:'center'
  },
  loadText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1D2C42",
    textAlign: "center",
  },
  footerView:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    backgroundColor:'#F4F6FA',
    width:widthPercentageToDP("100%"),
    alignItems:'center',
    justifyContent:'center',
    ...Platform.select({
      ios:{
        height:heightPercentageToDP("4%"),
      },
      android:{
        height:heightPercentageToDP("5%"),
      }
    }),
  },
  footerText:{
    color:'#38405F',
    fontSize:12,
  }
});