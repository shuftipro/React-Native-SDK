import React from "react";
import {Text, Image, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Grid, Col, Row } from "react-native-easy-grid";
import expo from 'expo-constants';
import  Header  from './../../Components/index';
import { SERVICE } from "../../Constants";

const faceVerificationImage = '../../Assets/faceVerificationImage.png';
const AddressInstruction    ='../../Assets/address/AddressInstruction.png';
const faceVerification      ='../../Assets/face/face_verification.png';
const consent               ='../../Assets/Consent/consent.png';

 class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        const {takePhoto,service,InstructionsTitle} = this.props;
        /***************************************************************************************
         *                              Dynamic Image Return base of (Service Image)
         ***************************************************************************************/
        const _imageReturn = () =>{
            if(service === SERVICE.DOCUMENT){
                return(<Image source={require(faceVerificationImage)} style={styles.imageHeight}/>)
            } else if(service === SERVICE.ADDRESS){
                return(<Image source={require(AddressInstruction)} style={styles.imageHeight}/>)
            } else if(service === SERVICE.FACE){
                return(<Image source={require(faceVerification)} style={styles.imageHeight}/>)
            }
                // else if(service === SERVICE.CONSENT){
            //     return(<Image source={require(faceVerification)} style={styles.imageHeight}/>)
            // }
            else if (service ===SERVICE.CONSENT){
                return(<Image source={require(consent)} style={styles.imageHeight}/>)
            }
        };
        
        /***************************************************************************************
         *       Dynamic Instruction Return base of type (take photo & upload photo)
         ***************************************************************************************/
        const typeBasedInstructions = () => {
                 return(
                     Object.values(takePhoto).map((value, i)=>{
                         return(
                             <Row key={i}>
                                 <Col style={{width: wp('5%')}}>
                                     <Text style={styles.infoText}>{i+1}. </Text>
                                 </Col>
                                 <Col>
                                     <Text style={styles.infoText}>{value}</Text>
                                 </Col>
                             </Row>
                         )
                     })
                 )
        };


        return (
            <SafeAreaView style={{ flex:1, backgroundColor: '#FFFFFF' }}>
                <Header isGoBack title={this.props.headTitle ? this.props.headTitle : '' } goBack={this.props.goBack ? this.props.goBack : ()=>{}}/>
                <Grid style={styles.mainContainer}>
                        <Row style={styles.faceVerificationImage}>
                            {_imageReturn()}
                        </Row>
                    <Row style={styles.InstructionsRow}>
                        <Text style={styles.InstructionsText}>{InstructionsTitle}</Text>
                    </Row>
                    <Row style={styles.infoRow}>
                        {
                            typeBasedInstructions()
                        }
                    </Row>

                        <Row style={styles.btnRow}>
                            <TouchableOpacity
                                style={styles.buttonContinue}
                                onPress={this.props.continueBtn ? this.props.continueBtn : ()=>{}}>
                                <Text style={styles.ContinueText}>Proceed</Text>
                            </TouchableOpacity>
                        </Row>
                </Grid>

            </SafeAreaView>

        );
    }
}

export default Preview;

const styles = StyleSheet.create({
    mainContainer:{
        height:hp('100')-expo.statusBarHeight,
         backgroundColor:'#FFFFFF',
        // borderWidth: 3,
    },
    // header 7%
    header:{
        ...Platform.select({
            ios:{
                height:hp('7%')
            },
            android:{
                height:hp('7%')
            }
        }),
        borderWidth:0.5
    },
    InstructionsRow:{
        ...Platform.select({
            ios:{
                height:hp('12%')
            },
            android:{
                height:hp('12%')
            }
        }),
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        width:wp('90%'),
    },
    InstructionsText:{
        fontSize:18,
        fontWeight:'500'
    },
    infoRow:{
        ...Platform.select({
            ios:{
                height:hp('16%')
            },
            android:{
                height:hp('16%')
            }
        }),
        alignSelf:'center',
        width:wp('90%'),
        flexDirection:'column'
    },
    infoText:{
        color: '#1D2C42',
        fontSize:14
    },
    faceVerificationImage:{
        ...Platform.select({
            ios:{
                height:hp('40%')
            },
            android:{
                height:hp('40%')
            }
        }),
        justifyContent:'center',
        alignItems:'center',
    },
    imageHeight:{
        ...Platform.select({
            ios:{
                height:hp('28%'),
                width:hp('27%')
            },
            android:{
                height:hp('28%'),
                width:hp('27%')
            }
        }),
        resizeMode:'contain'
    },
    btnRow:{
        ...Platform.select({
            ios:{
                bottom:hp("0%"),
            },
            android:{
                bottom:hp("0%"),
            }
        }),
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        position:'absolute',
        // borderWidth: 1,


    },
    buttonContinue:{
        backgroundColor: '#2B6AD8',
        ...Platform.select({
            ios:{
                height:hp('9%'),
            },
            android:{
                height:hp('9%'),
            }
        }),
        width:wp('100%'),
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
    },
    ContinueText:{
      fontSize:16,
        color:'#FFFFFF',
        fontWeight:'600'
    },
});