import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity, StyleSheet, Text, Platform, Image } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import { Footer } from "../../Components";
import expo from "expo-constants";
import {REQUEST_STATUS} from "../../Constants/index";
const verifiedIcon= '../../Assets/Verified/verifiedIcon.png';
const declinedIcon= '../../Assets/Verified/error.png';


export default class ResponseScreen extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { onOkayButton,status,statusHeader } = this.props;
        return (
            <Grid style={styles.mainContainer}>
                <Row style={styles.firstRow}>
                    <Row style={[styles.verifiedBtn, status === REQUEST_STATUS.VERIFIED ? styles.verifyStyle : styles.notVerifyStyle  ]}>

                        {
                            status === REQUEST_STATUS.VERIFIED ?<Image source={require(verifiedIcon)}
                                                                       style={{height: hp('6%'), width: wp('6%'), resizeMode: 'contain'}}/>
                                                                       : <Image source={require(declinedIcon)}
                                                                                style={{height: hp('6%'), width: wp('6%'), resizeMode: 'contain'}}/>

                        }


                            <Text style={styles.verifiedBtnText}>{status === REQUEST_STATUS.VERIFIED ? 'VERIFIED' : 'NOT VERIFIED'}</Text>

                    </Row>
                </Row>
                <Row style={styles.verifiedPRow}>
                    <Text style={styles.verifiedP}>{statusHeader}</Text>
                </Row>
                <Row style={styles.paragraphRow}>
                    <Text>
                        <Text style={styles.pText}>
                            Shufti Pro acknowledges your right to request access or erasure of your data. You may review our
                        </Text>
                        <Text style={styles.pTextBold}> Privacy Policy </Text>
                        <Text style={styles.pText}>here or contact us at </Text>
                        <Text style={styles.pTextBold}>privacy@shuftipro.com </Text>
                    </Text>
                </Row>
                <Row style={styles.btnRow}>
                    <TouchableOpacity
                        style={styles.buttonContinue}
                        onPress={onOkayButton ? onOkayButton : ()=>{}}>
                        <Text style={styles.ContinueText}>OK</Text>
                    </TouchableOpacity>
                </Row>
                <Footer />
            </Grid>
        );

    }
}

const styles = StyleSheet.create({
    mainContainer:{
        height:hp('100')-expo.statusBarHeight,
        backgroundColor:'#FFFFFF',
    },
    firstRow:{
        width:wp('100'),
        ...Platform.select({
            ios:{
                height:hp('22%')
            },
            android:{
                height:hp('24%')
            }
        })
        ,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    verifiedBtn:{
        // backgroundColor:'#12DB8E',
        width:wp("45%"),
        ...Platform.select({
            ios:{
                height:hp("6%"),
            },
            android:{
                height:hp("6%"),
            }
        }),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2
    },
    verifiedBtnText:{
        color:'#FFFFFF',
        fontSize:16,
        fontWeight:'500',
        marginLeft:hp("1")
    },
    verifiedP:{
        color: '#1D2C42',
        fontSize:16,
        fontWeight: '600'
    },
    verifiedPRow:{
        width:wp("100%"),
        ...Platform.select({
            ios:{
                height:hp("10%"),
            },
            android:{
                height:hp("12%"),
            }
        }),
        alignItems:'center',
        justifyContent:'center',
    },
    paragraphRow:{
        width:wp("90%"),
        ...Platform.select({
            ios:{
                height:hp("20%"),
            },
            android:{
                height:hp("23%"),
            }
        }),
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
    },
    pText:{
        color: '#1D2C42',
        fontSize:13
    },
    pTextBold:{
        color: '#1090FF',
        fontSize:14,

    },
    btnRow:{
        ...Platform.select({
            ios:{
                height:hp('25%'),
                width:wp('90%')
            },
            android:{
                height:hp('25%'),
                width:wp('90%')
            }
        }),
        justifyContent:'center',
        alignItems:'flex-end',
        alignSelf:'center',
    },
    buttonContinue:{
        backgroundColor: '#2B6AD8',
        ...Platform.select({
            ios:{
                height:hp('6%'),
                width:wp('50%')
            },
            android:{
                height:hp('6%'),
                width:wp('50%')
            }
        }),
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
    },
    ContinueText:{
        fontSize:16,
        color:'#FFFFFF'
    },
    verifyStyle:{
        backgroundColor:'#12DB8E'
    },
    notVerifyStyle:{
        backgroundColor:'#F56B68'
    }



});