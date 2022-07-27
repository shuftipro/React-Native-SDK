import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { STATUS_CODE, SERVICE, HEAD_TITLE, REQUEST_STATUS } from "./../Constants";
import Preview from "./CommonScreens/Preview";
import CameraComponent from "./CameraComponent";
import { StyleSheet, SafeAreaView, View } from "react-native";
import expo from 'expo-constants';
import Loader from "../Components/Loader";
import { requestApi } from "../Constants/ApiMethods";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../Redux/Actions/userActions";
import ResponseScreen from "./CommonScreens/ResponseScreen";
import * as Network from 'expo-network';

class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoader:false,
          loaderMsg:"The image is uploading, please wait...",
          loaderIcon:'uploading',
          addressInstraction:{
              one: 'Make sure light is not too low or too bright',
              two: 'Ensure the address is visible(hold document steady)',
              three: 'Ensure your address is visible to capture',
          },
          documentInstration:{
              one: 'Make sure light is not too low or too bright',
              two: 'Ensure the text is visible(hold document steady)',
              three: 'Ensure your document is visible to capture',
          },
          faceInstraction:{
              one:'Make sure light is not too low or too bright',
              two:'Remove extra accessories:sunglasses, hat, etc.',
              three:'Ensure your face is visible to capture',
          },
          consentInstraction:{
              one:'Make sure light is not too low or too bright',
              two:'Ensure the text is visible(hold note steady)',
              three:'Ensure the consent is visible to capture',
          },
          isShowComponent:false,
          servicesList:[],
          requestStatus:null,
          uploadingProgress:0,
          isRequestCall:false
        };
    }

   async UNSAFE_componentWillMount(){

      this.setStateObj({ servicesList: this.props.verificationTypeList })
      this.props.setReqPayload({ ...this.props.payload })

       setInterval(async ()=>{
           let netInfo = await Network.getNetworkStateAsync();
           this.props.setNetInfo(netInfo)
       },2000)

    }

    setStateObj(obj){
      this.setState({ ...this.state, ...obj })
    }

    doReadyRequest(data){
      const { servicesList } = this.state;

      if(servicesList.length > 0){
        let tempServivesList = servicesList;
        tempServivesList.shift();
        this.setStateObj({ servicesList:tempServivesList, isShowComponent:false })
      }

      if(servicesList.length < 1){
        this.setStateObj({ isLoader:true, loaderIcon:"uploading", loaderMsg:"Uploading is inprocess please wait..." })
        this.doRequest()
      }

    }

    doRequest(){
      const {
        accessToken,
        basicAuth,
        getReqPayload,
        asyncResponseCallback,
        setReqPayload,
      } = this.props;
      
      //api request
        console.log(this.props.getReqPayload)
      requestApi(
        getReqPayload,
        accessToken ? accessToken : basicAuth,
        this.getUploadProgressVal,
        (data)=>{
          asyncResponseCallback(data)
          this.setStateObj({ requestStatus: data.event, uploadingProgress:0,isRequestCall: false, isLoader:false, loaderIcon:"uploading", loaderMsg:"Uploading is inprocess please wait..." })
          setReqPayload({})
      })
      setTimeout(()=>{
        this.setStateObj({ isRequestCall:true })
      })
    }

    getUploadProgressVal=(val)=>{
      const {
        async,
        asyncResponseCallback,
        onResponseOkayButton,
      } = this.props;

      if(val < 1){
        this.setStateObj({ uploadingProgress: val })
      }else{
        if(this.state.isRequestCall){
          if(async){
            asyncResponseCallback({ event:"request.pending", error:"", reference:this.props.payload.reference })
            onResponseOkayButton()
          }
          this.setStateObj({ uploadingProgress:0, isLoader:true, loaderIcon:'verifying', loaderMsg:"Verification is inprocess please wait…" })
        }
      }
    }

    render() {
        const {
          addressInstraction,
          documentInstration,
          faceInstraction,
          consentInstraction,
          isShowComponent,
          loaderIcon,
          loaderMsg,
          isLoader,
          servicesList,
          requestStatus,
          uploadingProgress,
        } = this.state;

        const {
          onResponseOkayButton, //func
          verificationMode, //string
          goBack, //funcs
        } = this.props;

        const getVerificationMode = () => verificationMode ? verificationMode : STATUS_CODE.PIC_MODE;

        const getInstarction = () => {
            if(servicesList[0] === SERVICE.ADDRESS){
              return addressInstraction
            }

            if(servicesList[0] === SERVICE.DOCUMENT){
              return documentInstration
            }

            if(servicesList[0] === SERVICE.FACE){
              return faceInstraction
            }

            if(servicesList[0] === SERVICE.CONSENT){
                return consentInstraction
            }
            return{}
        }

        const getPreviewTitle = () => {
            if(servicesList[0] === SERVICE.ADDRESS){
              return `Capture address document ${getVerificationMode()}`
            }

            if(servicesList[0] === SERVICE.DOCUMENT){
              return `Capture your document ${getVerificationMode()}`
            }

            if(servicesList[0] === SERVICE.FACE){
              return `Capture your face ${getVerificationMode()}`
            }
            if(servicesList[0] === SERVICE.CONSENT){
              return `Capture handwritten note ${getVerificationMode()}`
            }
        }

        const getHeadTitle = () => {
          if(servicesList[0] === SERVICE.ADDRESS){
            return HEAD_TITLE.ADDRESS
          }
          if(servicesList[0] === SERVICE.DOCUMENT){
            return HEAD_TITLE.DOCUMENT
          }
          if(servicesList[0] === SERVICE.FACE){
            return HEAD_TITLE.FACE
          }
          if(servicesList[0] === SERVICE.CONSENT){
              return HEAD_TITLE.CONSENT
          }
          return ""
        }

        const _renderComponent = () => {
          return (
            <SafeAreaView style={styles.mainContainer}>
                {
                  !isShowComponent ?
                    <Preview
                        service={servicesList[0]}
                        InstructionsTitle={getPreviewTitle()}
                        headTitle={getHeadTitle()}
                        takePhoto={getInstarction()}
                        goBack={goBack ? goBack : ()=>{}}
                        continueBtn={()=>{ this.setStateObj({ isShowComponent:true }) }}/>
                  : <CameraComponent
                      headTitle={getHeadTitle()}
                      service={servicesList[0]}
                      verificationMode={ verificationMode ? verificationMode : STATUS_CODE.PIC_MODE}
                      useItBtn={this.doReadyRequest.bind(this)}
                      onResponseOkayButton={()=>{
                        this.setStateObj({ isShowComponent:false })
                        if(onResponseOkayButton){ onResponseOkayButton() }
                      }}
                      goBack={(res)=>{
                        this.setStateObj({ isShowComponent:false })
                        if(goBack){ goBack(res) }
                      }}/>
                }
            </SafeAreaView>
          );
        }

        if(requestStatus !== null && requestStatus !== REQUEST_STATUS.VERIFIED){
          return(
            <ResponseScreen
                status={requestStatus}
                statusHeader={'Your request has been declined.'}
              onOkayButton={()=>{
                this.setStateObj({ capturedShot:{} })
                onResponseOkayButton()
              }}/>
          )
        }

        if(requestStatus === REQUEST_STATUS.VERIFIED){
          return(
            <ResponseScreen
                statusHeader={'Your request has been verified.'}
                status={REQUEST_STATUS.VERIFIED}
              onOkayButton={()=>{
                this.setStateObj({ capturedShot:{} })
                onResponseOkayButton()
              }}/>
          )
        }

        if(isLoader){
          return (<>
            <Loader
              isLoader={isLoader}
              loaderIcon={loaderIcon}
              loaderMsg={loaderMsg}/>
              {
                uploadingProgress > 0 &&
                <View style={{ position:'absolute', borderTopWidth:2, top:70, borderTopColor:'red', backgroundColor:'red', width:`${uploadingProgress*100}%`, height:'0.1%' }}/>
              }
          </>)
        }

        if(servicesList.length > 0){
          if(servicesList[0] === SERVICE.FACE){
            return _renderComponent(SERVICE.FACE);
          }
          if(servicesList[0] === SERVICE.DOCUMENT){
            return _renderComponent(SERVICE.DOCUMENT);
          }
          if(servicesList[0] === SERVICE.ADDRESS){
            return _renderComponent(SERVICE.ADDRESS);
          }
          if(servicesList[0] === SERVICE.CONSENT){
            return _renderComponent(SERVICE.CONSENT);
          }
        }
        return <></>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification);

const styles = StyleSheet.create({
  mainContainer:{
    marginTop:expo.statusBarHeight,
    height:hp('100')-expo.statusBarHeight,
      flex:1,
    backgroundColor:'#FFFFFF',
  },
});