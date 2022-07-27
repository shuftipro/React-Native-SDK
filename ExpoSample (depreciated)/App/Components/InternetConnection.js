import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import { Grid, Row } from "react-native-easy-grid";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Redux/Actions/userActions';
const connectIcon = '../Assets/connection.png';
class InternetConnection extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {};
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
        const { isConnected, isInternetReachable } = this.props.getNetInfo;
        if(!isConnected && !isInternetReachable){
            return(
                <SafeAreaView style={{flex: 1}}>

                    <Grid style={styles.mainContainer}>
                        <Row style={styles.imgRow}>
                            <Image  source={require(connectIcon)} style={styles.imageconnection}   />
                        </Row>
                        <Row style={{justifyContent: 'center',height:hp('8%')}}>
                            <Text style={styles.connectionTest}>Connection lost</Text>
                        </Row>
                        <Row style={styles.imgRow1}>
                            <Text style={{fontSize: 14,textAlign:'center'}}>
                                Looks like you have lost connection Check your connection and try again.
                            </Text>
                        </Row>
                    </Grid>
                </SafeAreaView>
            )
        }else{
            return (<></>)
        }
    }
}
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#FFFFFF',
    },
    imgRow:{
        height:hp('40%'),
        justifyContent:'center',
        alignItems:'flex-end'
    },
    imageconnection:{
        width:wp('23%'),
        height:hp('17%'),
        resizeMode: 'contain',
    },
    connectionTest:{
        color: '#1D2C42',
        fontSize:16,
        fontWeight:'600'
    },
    imgRow1:{
        height:hp('40%'),
        width:wp('70%'),
        justifyContent:'center',
        alignSelf:'center',
        fontWeight:'500'
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(InternetConnection);