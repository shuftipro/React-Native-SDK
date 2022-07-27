import React, { Component } from "react";
import EntryPoint from './EntryPoint';
import configureStore from "./../Redux/Store";
const { store } = configureStore();
import { Provider } from "react-redux";
import { SERVICE, STATUS_CODE } from "../Constants";
import PropTypes from 'prop-types';
import { Platform } from "react-native";

class ShuftiPro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload:{
                reference               : `SP_REQUEST_${Platform.OS.toUpperCase()}_SDK-${Platform.OS === 'android' ? Platform.constants.Serial : Math.floor(Math.random() * Date.now())}-${Date.now()}`,
                verification_mode       : `${this.props.verificationMode}_only`,
                initiated_source_version:'1.0.1',
                initiated_source        :'react_native_ocr'
            },
            document:{
                proof               : '',
            },
            address:{
                proof               : '',
            },
            consent:{
                proof               :''
            },
            face:{
                proof               : '',
            },
            verificationTypeListArray:[]
        }
    }

    UNSAFE_componentWillMount(){
        console.disableYellowBox = true
        const { requestPayload } = this.props;
        const { payload,verificationTypeListArray } = this.state;


        let tempPayload = payload
        Object.entries(requestPayload).map((item, i)=>{
            if(item.length > 0){
                if(typeof(item[1]) !== 'object'){
                    tempPayload[item[0]] = item[1]
                }
            }
        });

        Object.entries(requestPayload).map(item=>{
            if(item[0].indexOf('face') > -1){
                if(item[1] === true){
                    verificationTypeListArray.push(SERVICE.FACE);
                    this.setState({ verificationTypeListArray });
                }
            }
            if(item[0].indexOf('document') > -1){
                verificationTypeListArray.push(SERVICE.DOCUMENT);
                this.setState({ verificationTypeListArray });
            }
            if(item[0].indexOf('address') > -1){
                verificationTypeListArray.push(SERVICE.ADDRESS);
                this.setState({ verificationTypeListArray });
            }
            if(item[0].indexOf('consent') > -1){
                verificationTypeListArray.push(SERVICE.CONSENT);
                this.setState({ verificationTypeListArray });
            }
        });

        this.setStateObj({ payload:tempPayload })
        // verificationTypeList
        if(verificationTypeListArray){
            let tempData = {}
            verificationTypeListArray.forEach(str => {
                if(str.indexOf(SERVICE.FACE) > -1){
                    tempData['face'] = { ...this.state.face, ...requestPayload.face }
                }
                if(str.indexOf(SERVICE.DOCUMENT) > -1){
                    tempData['document'] = { ...this.state.document, ...requestPayload.document }
                }
                if(str.indexOf(SERVICE.ADDRESS) > -1){
                    tempData['address'] = { ...this.state.address, ...requestPayload.address }
                }
                if(str.indexOf(SERVICE.CONSENT) > -1){
                    tempData['consent'] = { ...this.state.consent, ...requestPayload.consent }
                }
                this.setStateObj({ payload:{ ...payload, ...tempData } })
            });
        }
    }

    setStateObj(obj){
        this.setState({ ...this.state, ...obj })
    }

    render() {
        const { payload,verificationTypeListArray } = this.state;
        const {
            isShow,
            verificationMode,
            cancelBtn,
            accessToken,
            basicAuth,
            onResponseOkayButton,
            async,
            asyncResponseCallback
        } = this.props;

        if(!isShow){ return <></> }

        return (
            <Provider store={store}>
                <EntryPoint
                    payload={payload}
                    accessToken={accessToken}
                    basicAuth={basicAuth}
                    verificationTypeList={verificationTypeListArray}
                    verificationMode={verificationMode}
                    onResponseOkayButton={onResponseOkayButton}
                    goBack={cancelBtn}
                    async={async}
                    asyncResponseCallback={asyncResponseCallback}/>
            </Provider>
        );
    }
}

Component.propTypes = {
    verificationMode        : PropTypes.oneOf([STATUS_CODE.PIC_MODE, STATUS_CODE.VIDEO_MODE]),
    onResponseOkayButton    : PropTypes.func,
    cancelBtn               : PropTypes.func,
    accessToken             : PropTypes.string,
    basicAuth               : PropTypes.object,
    isShow                  : PropTypes.bool,
    async           : PropTypes.bool,
    asyncResponseCallback   : PropTypes.func,
    requestPayload          : PropTypes.object
}

Component.defaultProps = {
    verificationMode        : STATUS_CODE.PIC_MODE,
    onResponseOkayButton    : ()=>{},
    cancelBtn               : ()=>{},
    accessToken             : null,
    basicAuth               : { client_id:null, secret_key:null },
    isShow                  : true,
    async           : false,
    asyncResponseCallback   : ()=>{},
    requestPayload          : {}
}

export default ShuftiPro