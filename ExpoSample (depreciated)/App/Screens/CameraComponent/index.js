import React, { Component } from "react";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    widthPercentageToDP, heightPercentageToDP
} from "react-native-responsive-screen";
import { Text, View, TouchableOpacity, StyleSheet, Platform, Image, SafeAreaView,PermissionsAndroid, WebView } from "react-native";
import { isObjEmpty, getFileAsBase64 } from "../../Constants/Helpers";
import { STATUS_CODE, SERVICE } from "../../Constants";
import  Header  from "../../Components";
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../Redux/Actions/userActions";
const FlipIcon = '../../Assets/Camera/flip_camera_ios.png';
const LogoMini = '../../Assets/logo_mini.png';
const play ='../../Assets/play.png';
import * as Permissions from 'expo-permissions';
import InternetConnection from '../../Components/InternetConnection'
class CameraComponent extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isLoader:false,
            loaderMsg:"",
            loaderIcon:'uploading',
            hasPermission:null,
            type:this.props.service === SERVICE.FACE ? Camera.Constants.Type.front : Camera.Constants.Type.back,
            capturedShot:{},
            isRecording:false,
            requestStatus:null,
            isPlay:true,
            recordCounter: 10,
            counterShow:false,
            ratio:'16:9',
            isvideoended:false,

        };
    }

    async UNSAFE_componentWillMount() {
        console.disableYellowBox = true;
        this._isMounted = true;
        if(this._isMounted){
        }
    }

    async UNSAFE_componentWillMount(){
        this.checkPermission()
        this.checkAudioPermission()
    }

    componentWillUnmount(){
        this._isMounted = false;

    }

    async isVideoEnd(){
        const {isPlay} = this.state
        if (this.video) {
            let x = await this.video.getStatusAsync();
            if (!x.isPlaying) {
                this.setStateObj({isPlay: !x.isPlaying})
            }
        }
    }
    _onPlaybackStatusUpdate = playbackStatus => {
        const {isPlay} = this.state
        if (playbackStatus.didJustFinish){
            this.setStateObj({isPlay: false, isvideoended: true})

        }else{
            this.setStateObj({isPlay: true, isvideoended: false})
        }

    }

    /***************************************************************************************
     *                             Camera & Permissions
     ***************************************************************************************/
    async checkPermission(){
        const { status } = await Camera.requestPermissionsAsync();
        this.setHasPermission(status === 'granted');
    }
    async checkAudioPermission(){
         await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    }
    setHasPermission(status){
        this.setStateObj({ hasPermission:status })
    }

    /***************************************************************************************
     *                             Take Picture
     ***************************************************************************************/
    async takePicture(){
        const camOptions = {
            // base64:true,
            quality:0.6,
            skipProcessing:true
        }

        try {
            let photo = await this.camera.takePictureAsync(camOptions);
            if(photo){
                this.setStateObj({ capturedShot:photo });
                getFileAsBase64(photo.uri, (base64)=>{
                    // console.log("dataphp",photo)
                    if(this.props.service === SERVICE.FACE){
                        this.props.setFacePayload({ proof:`data:image/png;base64,${base64}` })
                    }
                    if(this.props.service === SERVICE.DOCUMENT){
                        this.props.setDocumentPayload({ proof:`data:image/png;base64,${base64}` })
                    }
                    if(this.props.service === SERVICE.ADDRESS){
                        this.props.setAddressPayload({ proof:`data:image/png;base64,${base64}`})
                    }
                    if(this.props.service === SERVICE.CONSENT){
                        this.props.setConsentPayload({ proof:`data:image/png;base64,${base64}` })
                    }
                });
            }


            // console.log(photo)





        } catch (err) {
            console.error('this does not error', err)
        }
    }
    /***************************************************************************************
     *                             Take Video
     ***************************************************************************************/

    takeVideo = async () => {

        const videoOptions = {
            base64:true,
            maxDuration:10,
            // quality:'480p',
            // quality:0.5,
            mute:true,
        }

        this.timer = setInterval(() => {
            this.setStateObj({ recordCounter: this.state.recordCounter-1, isRecording: true })
            if(this.state.recordCounter < 1){
                clearInterval(this.timer);
                if(this.camera !== null){ this.camera.stopRecording() }
            }
        }, 1000);

        if (this.camera) {
            try {
                const promise = this.camera.recordAsync(videoOptions);
                if (promise) {
                    this.setStateObj({ isRecording: true });
                    const data = await promise;
                    this.setStateObj({ isRecording: false, capturedShot:data });

                    getFileAsBase64(data.uri, (data)=>{
                        if(this.props.service === SERVICE.FACE){
                            this.props.setFacePayload({ proof:`data:video/mp4;base64,${data}` })
                        }
                        if(this.props.service === SERVICE.DOCUMENT){
                            this.props.setDocumentPayload({ proof:`data:video/mp4;base64,${data}` })
                        }
                        if(this.props.service === SERVICE.ADDRESS){
                            this.props.setAddressPayload({ proof:`data:video/mp4;base64,${data}` })
                        }
                        if(this.props.service === SERVICE.CONSENT){
                            this.props.setConsentPayload({ proof:`data:video/mp4;base64,${data}` })
                        }
                    })
                }
            } catch (e) {
                this.setStateObj({ isRecording: false });
                alert(e)
            }
        }
    };

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }


    render() {
        const {
            hasPermission,
            type,
            capturedShot,
            isRecording,
            isPlay,ratio,
            isvideoended
        } = this.state;

        // console.log(capturedShot)


        const {
            verificationMode,
            headTitle,
            useItBtn,
            getNetInfo
        } = this.props;
        // const DESIRED_RATIO = "16:9"


        if (hasPermission === null) {
            this.checkPermission()
            return <View />;
        }

        const prepareRatio = async () => {
            if (Platform.OS === 'android' && this.camera) {
                const ratios = await this.camera.getSupportedRatiosAsync();
                const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];
                this.setStateObj({ ratio:ratio });
            }
        }

        const _renderTakeShotView = () => {
            return(<>
                <View style={styles.camView}>
                    <Camera
                        style={{ flex: 1,justifyContent:'center',alignItems:'center'}}
                        autoFocus={'on'}
                        onCameraReady={prepareRatio}
                        ratio={ratio}
                        focusPosition={{x: 10, y: 10}}
                        type={type}
                        ref={ref => { this.camera = ref; }}>
                        {isRecording  ? <Text  style={styles.cameraTimer}>{this.state.recordCounter}</Text> : <></>}


                    </Camera>
                </View>

                <View style={styles.bottomView}>
                    {/*play capture button*/}
                    <TouchableOpacity
                        style={styles.takePhotoBtn}
                        onPress={() => {
                            if(verificationMode === STATUS_CODE.PIC_MODE){ this.takePicture() }
                            if(verificationMode === STATUS_CODE.VIDEO_MODE){
                                if(isRecording){
                                    this.camera.stopRecording()
                                    clearInterval(this.timer);
                                    this.setStateObj({isRecording: false })
                                }else{
                                    this.takeVideo()
                                }
                            }
                        }}>
                    </TouchableOpacity>

                    <View style={styles.footerView}>
                        <Text style={styles.footerText}>&#169; Powered by </Text>
                        <Image source={require(LogoMini)} style={{ width:widthPercentageToDP('15'), resizeMode:'contain' }} />
                    </View>
                </View>
            </>)
        }

        const _renderCapturedShot = () => {
            return (<>
                <View style={styles.photoVeiw}>
                    {
                        verificationMode === STATUS_CODE.PIC_MODE &&
                            // (<Image source={{ uri:`data:image/gif;base64,${capturedShot.base64}` }} style={{ height:"100%", resizeMode:'contain' }} />) ||
                        (<Image source={{ uri:capturedShot.uri }} style={{ height:"100%", resizeMode:'contain' }} />) ||

                        verificationMode === STATUS_CODE.VIDEO_MODE && !isvideoended && (<>
                            <Video
                                onPlaybackStatusUpdate=
                                    {(playbackStatus) => this._onPlaybackStatusUpdate(playbackStatus)}
                                source={{ uri: capturedShot.uri }}
                                ref={(ref)=>{ this.video = ref; }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={true}
                                resizeMode="contain"
                                shouldPlay
                                isLooping={false}
                                style={{ height:"100%" }}/>
                        </>)
                    }
                </View>

                <View style={styles.bottomView01}>
                    <TouchableOpacity
                        style={styles.tryAgainBtn}
                        onPress={() => { this.setStateObj({ capturedShot:{},recordCounter:10, isPlay:true, isvideoended:false }) }}>
                        <Text style={styles.takePhotoBtnText}>Retake</Text>
                    </TouchableOpacity>

                    { verificationMode === STATUS_CODE.VIDEO_MODE && !isPlay &&
                        <TouchableOpacity
                            style={styles.tryAgainBtn}
                            onPress={() => {
                                this.setStateObj({ isPlay:!isPlay })
                                this.setStateObj({ isvideoended:!isvideoended })

                            }}>
                            {!isPlay && <Image source={require(play)}  style={{width:wp('8'),height:wp('8'),resizeMode:'contain'}}/>}
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => {
                            useItBtn(capturedShot)
                            this.setStateObj({ isPlay:true, isvideoended:false, isRecording: false })
                        }}>
                        <Text style={styles.takePhotoBtnText}>Use it</Text>
                    </TouchableOpacity>
                </View>
            </>)
        }

        const _renderAllViews = () =>{
            if(hasPermission === false){
                return(
                    <View style={[styles.photoMsgView, { height:'80%', alignItems:'center', justifyContent:'center' }]}>
                        <Text style={styles.photoMsg}>No access to camera</Text>
                    </View>
                )
            }

            if(isObjEmpty(capturedShot)){
                return _renderTakeShotView();
            }else{
                return _renderCapturedShot();
            }
        }

        if(!getNetInfo.isConnected && !getNetInfo.isInternetReachable){
            return (<InternetConnection />)
        }

        return (<>
            <SafeAreaView style={{ flex:1, backgroundColor: '#FFFFFF' }}>
                <Header
                    title={headTitle ? headTitle : ""}
                    isGoBack
                    goBack={(res)=>{
                        this.setStateObj({ capturedShot:{} })
                        this.props.goBack(res)
                    }}
                    renderRightSideView={()=>{
                        // console.log("type",Camera.Constants)
                        if(isObjEmpty(capturedShot)){
                            return(
                                <TouchableOpacity
                                    disabled={isRecording}
                                    style={{ alignItems:'center', justifyContent:'center', width:wp("10"), height:wp('10'), opacity: isRecording ? 0.5 : 1 }}
                                    onPress={()=>{
                                        if(type === Camera.Constants.Type.back){
                                            this.setStateObj({ type:Camera.Constants.Type.front });    
                                        }
                                        if(type === Camera.Constants.Type.front){
                                            this.setStateObj({type:Camera.Constants.Type.back});
                                        }
                                    }}>
                                    <Image source={require(FlipIcon)} style={{ width:wp("5"), height:wp("5"), resizeMode:'contain' }} />
                                </TouchableOpacity>
                            )
                        }
                    }}/>

                { _renderAllViews() }

            </SafeAreaView>
        </>)
    }
}

const styles = StyleSheet.create({
    camView:{
        ...Platform.select({
            ios:{
                height:hp("80%"),
            },
            android:{
                height:hp("83%"),
            }
        }),
        width:wp("100%"),
        alignSelf:'center',
    },

    bottomView:{
        position:'absolute',
        backgroundColor:"#FFFFFF",
        ...Platform.select({
            ios:{
                height:hp("9%"),
            },
            android:{
                height:hp("9%"),
            }
        }),
        bottom:0,
        width:wp('100'),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },

    InstractionsView:{
        ...Platform.select({
            ios:{ height:hp("50%") },
            android:{ height:hp("50%") }
        }),
        backgroundColor:'black',
        width:wp("85%"),
        marginTop:"4%",
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
    },

    yesBtn:{
        backgroundColor:"#2B6AD8",
        width:wp('60'),
        ...Platform.select({
            ios:{
                height:hp("6%"),
            },
            android:{
                height:hp("7%"),
            }
        }),
        marginTop:hp('2'),
        justifyContent:'center',
        alignItems:'center'
    },
    yesText:{
        fontSize:18,
        fontWeight:'500',
        color:"#FFFFFF",
    },

    photoMsgView:{
        ...Platform.select({
            ios:{
                height:hp("9%"),
            },
            android:{
                height:hp("11%"),
            }
        }),
        width:wp("90%"),
        alignSelf:'center',
        justifyContent:'center',
    },
    photoMsg:{
        color:"#1D2C42",
        fontSize:18,
        fontWeight:"500",
        lineHeight:25,
        letterSpacing:0.2
    },

    photoVeiw:{
        ...Platform.select({
            ios:{
                height:hp("80%"),
            },
            android:{
                height:hp("83%"),
            }
        }),
        width:wp("100%"),
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'black',


    },

    bottomView01:{
        flexDirection:"row",
        backgroundColor:'#FFFFFF',
        ...Platform.select({
            ios:{
                height:hp("9%"),
            },
            android:{
                height:hp("9%"),
            }
        }),
        alignItems:'center',
        justifyContent:'space-between',
        position:'absolute',
        bottom:0,
        width:wp('100'),
    },

    continueBtn:{
        backgroundColor:'#FFFFFF',
        width:wp("30%"),
        ...Platform.select({
            ios:{
                height:hp("6%"),
            },
            android:{
                height:hp("8%"),
            }
        }),
        alignItems:'center',
        justifyContent:'center',
    },

    tryAgainBtn:{
        width:wp("30%"),
        ...Platform.select({
            ios:{
                height:hp("6%"),
            },
            android:{
                height:hp("8%"),
            }
        }),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',

    },
    takePhotoBtnText:{
        color:'#2B6AD8',
        fontSize:20,
        fontWeight:"500"
    },

    takePhotoBtn:{
        backgroundColor:'#2B6AD8',
        ...Platform.select({
            ios:{
                width:wp("15%"),
            },
            android:{
                width:wp("15%"),
            }
        }),
        height:wp("15"),
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },

    footerView:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        right:5,
        // backgroundColor:'#F4F6FA',
        // width:widthPercentageToDP("93%"),
        alignSelf:'flex-end',
        alignItems:'center',
        justifyContent:'flex-end',
        ...Platform.select({
            ios:{
                height:heightPercentageToDP("5%"),
            },
            android:{
                height:heightPercentageToDP("5%"),
            }
        }),
        // borderWidth: 1
    },
    footerText:{
        color:'#38405F',
        fontSize:8,
    },
    cameraTimer:{
        fontSize:48,
        position:'absolute',
        color:'#2B6AD8',
        opacity:0.5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent);
