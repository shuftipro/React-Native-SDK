import React, { Component } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import expo from 'expo-constants';
import {mapDispatchToProps, mapStateToProps} from "../Redux/Actions/userActions";
import {connect} from "react-redux";

const LogoMini = './../Assets/logo_mini.png';

class Header extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if(this._isMounted){
      // console.log(this.props)
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const { title, renderRightSideView,getReqPayload } = this.props;
    return (
        <View style={styles.headerView}>
          <View style={{width:"20%", paddingLeft:"2%"}}>
            {this.props.isGoBack &&
              <TouchableOpacity
                  style={styles.headBackBtn}
                  onPress={()=>{
                    this.props.goBack ? this.props.goBack({
                         "reference":getReqPayload.reference, "event":"verification.cancelled", "error":""
                    }) : ()=>{}
                  }}>
                  <Text style={styles.headTitle}>Cancel</Text>
              </TouchableOpacity>
            }
          </View>

          <View style={{width:"60%", alignItems:'center'}}>
            <Text style={[styles.headTitle, { alignSelf:'center', fontSize:16, fontWeight:'500', color:'#1D2C42' }]}>
              {title ? title : ''}
            </Text>
          </View>

          <View style={{width:"20%", alignItems:'flex-end', paddingRight:"2%"}}>
            { renderRightSideView ? renderRightSideView() : <></> }
          </View>
        </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

export class Footer extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    if(this._isMounted){

    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const { title, renderRightSideView } = this.props;
    return (
      <View style={styles.footerView}>
        <Text style={styles.footerText}>&#169; Powered by </Text>
        <Image source={require(LogoMini)} style={{ width:wp('15'), resizeMode:'contain' }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    marginTop:expo.statusBarHeight,
    height:hp('100')-expo.statusBarHeight,
    backgroundColor:'#FFFFFF',
  },

  headerView:{
    flexDirection:'row',
    ...Platform.select({
      ios:{
        height:hp("7%"),
      },
      android:{
        height:hp("8%"),
      }
    }),
    backgroundColor:'#F6F9FC',
    alignItems:'center',
    borderColor:'#F4F6FA',
    borderWidth:2,
    justifyContent:'space-between'
  },
  headBackBtn:{
    justifyContent:'center',
    alignItems:'center',
    ...Platform.select({
      ios:{
        height:hp("3"),
        width:hp("7")
      },
      android:{
        height:hp("3"),
        width:hp("7")
      }
    }),
    backgroundColor:'#F6F9FC',
  },
  headTitle:{
    fontSize:14,
    fontWeight:'500',
    color:'#2D6DDF'
  },



  footerView:{
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    backgroundColor:'#F4F6FA',
    width:wp("100%"),
    alignItems:'center',
    justifyContent:'center',
    ...Platform.select({
      ios:{
        height:hp("4%"),
      },
      android:{
        height:hp("5%"),
      }
    }),
  },
  footerText:{
    color:'#38405F',
    fontSize:12,
  }

});