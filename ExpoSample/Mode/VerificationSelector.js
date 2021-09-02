import React from "react";
import {
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Grid, Row } from "react-native-easy-grid";
import expo from 'expo-constants';
// import ShuftiPro from "expo-shuftipro-sdk";
import ShuftiPro from "../App/Screens/ShuftiPro";
const client_id = "2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3";
const secret_key = "B1die6pUKBvpS2LblqLiCzCGLSGCQwsB";
const un_check_circle = "../App/Assets/circle_icon.png";
const check_circle = "../App/Assets/checked.png";
const documentService ="../App/Assets/documentService.png";
const faceService ="../App/Assets/face_service.png";
const addressService ="../App/Assets/address_service.png";

const verificationObj01 = {
    face: true,
    document: {
        supported_types: ["passport", "id_card", "driving_license", "credit_or_debit_card"],
        name: {
            first_name: "John",
            last_name: "Livone",
            middle_name: ""
        },
        dob: "06-09-989",
        document_number: "A123456",
        expiry_date: "2025-09-09",
        issue_date: "2001-05-02",
        fetch_enhanced_data: "1",
        gender:"m",
    },
    address: {
        full_address: "10 Downing St, Westminister, London SW1A 2AA, UK",
        name: {
            first_name: "John",
            last_name: "Livone",
            middle_name: "",
            fuzzy_match: "1"
        },
        supported_types: ["id_card", "utility_bill", "bank_statement"],
    },
    consent: {
        supported_types: ["printed"],
        text: "My name is John Doe and I authorise this transaction of $100/-"
    }
};

const verificationObj = {
    face: true,
    document: {
        supported_types: ["passport", "id_card", "driving_license", "credit_or_debit_card"],
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
        gender:"",
    },
    address: {
        full_address: "",
        name: {
            first_name: "",
            last_name: "",
            middle_name: "",
            fuzzy_match: ""
        },
        supported_types: ["id_card", "utility_bill", "bank_statement"],
    },
    consent: {
        supported_types: ["printed"],
        text: ""
    }
};

class VerificationSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            servicesDisable:true,
            payload:{
                country: "",
                language: "EN",
                email: "",
                callback_url: "http://www.example.com",
            },
            createdPayload:{},
            services:[
                {
                    name:"Face Verification",
                    key:'face'
                },
                {
                    name:'Address Verification' ,
                    key:'address'
                },
                {
                    name:"Document Verification" ,
                    key:"document"
                },
                {
                    name:"Consent Verification" ,
                    key:'consent'
                }
            ],
            servicesType:[
                {
                    name:'Video' ,
                    key:'video'
                },
                {
                    name:'Image' ,
                    key:'image'
                }
            ],
            selectedService:[],
            selectedServicesType:'image',
            screenSelectServices:true,
            switchBetweenServiceAndType:true,
            isOcr:true
        };
    }
    componentDidMount() {

    }

    serviceSelector(action, id, obj={}){
        const {selectedService, createdPayload} = this.state;


        if(action === 'add'){
            createdPayload[id] = obj;
            this.setState({ createdPayload })
        }

        if(action === 'delete'){
            Object.entries(createdPayload).map((item)=>{
                if(id === item[0]){
                    delete createdPayload[item[0]];
                    this.setState({ createdPayload })
                }
            })
        }
    

        let IsExist = selectedService.some(x => x === id);

        if(!IsExist){
            selectedService.push(id);
            this.setState({ selectedService });
        }else{
            selectedService.map((item,i)=>{
                if(item === id){
                    selectedService.splice(i,1);
                    this.setState({ selectedService });
                }
            })


        }

    }
    servicesTypeSelector(element){
        this.setState({selectedServicesType:element.key})
    }
    continue(){
        const {screenSelectServices,selectedService} = this.state;
       if(selectedService.length !== 0){
           if(screenSelectServices){
               this.setState({screenSelectServices:false})
           }else{
               this.setState({switchBetweenServiceAndType:false})
           }
       }else{
           alert("please choice method of verification")
       }

    }


    render() {

        const {
            services,
            selectedService,
            screenSelectServices,
            servicesType,
            selectedServicesType,
            switchBetweenServiceAndType,
            createdPayload,
            payload,
            isOcr
        } = this.state;

        const checkServiceImage=(key)=>{
            if(key === 'face_verification'){
               return(<Image  source={require(faceService)}
                                                style={{width: wp('7'), height: wp('7'), resizeMode: 'contain'}}/>)
            }else if(key === 'address_verification'){
              return(<Image  source={require(documentService)}
                                style={{width: wp('7'), height: wp('7'), resizeMode: 'contain'}}/>)
            }
            else if(key === 'document_verification'){
                return(<Image  source={require(addressService)}
                                  style={{width: wp('7'), height: wp('7'), resizeMode: 'contain'}}/>)
            }
            else if(key === 'consent_verification'){
                return(<Image  source={require(faceService)}
                                  style={{width: wp('7'), height: wp('7'), resizeMode: 'contain'}}/>)
            }
        };
        const parentServicesScreenOne = () =>{
           return (
               <Row style={styles.servicesRow}>
                   <Row style={{ width:wp('85'), height:hp('9'), alignItems:'center', justifyContent:'space-between' }}>
                       <TouchableHighlight
                           underlayColor='none'
                           style={[styles.servicesBtn, { width:wp('40'), height:hp('5') }]}
                           onPress={()=>{ this.setState({ ...this.state, isOcr:true, createdPayload:{}, selectedService:[] }) }}>
                           <>
                               <Row style={{justifyContent:'space-between', paddingRight:hp('2'), }}>
                                   <Text style={[styles.serviceText, { width:null, paddingLeft:hp('2') }]}>OCR </Text>
                                   <Image source={isOcr ? require(check_circle) : require(un_check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                               </Row>
                           </>
                       </TouchableHighlight>

                       <TouchableHighlight
                           underlayColor='none'
                           style={[styles.servicesBtn, { width:wp('40'), height:hp('5') }]}
                           onPress={()=>{ this.setState({ ...this.state, isOcr:false, createdPayload:{}, selectedService:[] }) }}>
                           <>
                               <Row style={{justifyContent:'space-between', paddingRight:hp('2'), }}>
                                   <Text style={[styles.serviceText,  { width:null, paddingLeft:hp('2') }]}>Without OCR</Text>
                                   <Image source={isOcr ? require(un_check_circle) : require(check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                               </Row>
                           </>
                       </TouchableHighlight>
                   </Row>

                   {
                       services.map((element,i)=>{
                            if(selectedService.indexOf(element.key) > -1) {
                                return (
                                    <TouchableHighlight
                                        underlayColor='none'
                                        style={styles.servicesBtn}
                                        key={i}
                                        onPress={()=>{this.serviceSelector('delete', element.key, isOcr ? verificationObj[element.key] : verificationObj01[element.key])}}><>
                                        <Row style={{
                                            justifyContent: 'space-between',
                                            alignItems:'center',
                                            paddingRight: hp('2'),
                                            paddingLeft: hp('2')
                                        }}>

                                            {checkServiceImage(element.key)}


                                            <Text style={styles.serviceText}>{element.name}</Text>

                                            <Image  source={require(check_circle)}
                                                   style={{width: wp('5'), height: wp('5'), resizeMode: 'contain'}}/>
                                        </Row>

                                    </></TouchableHighlight>
                                )
                            }else {
                                return (
                                    <TouchableHighlight
                                        underlayColor='none'
                                        style={styles.servicesBtn}
                                        key={i}
                                        onPress={()=>{this.serviceSelector('add', element.key, isOcr ? verificationObj[element.key] : verificationObj01[element.key])}}><>
                                        <Row style={{
                                            justifyContent: 'space-between',
                                            alignItems:'center',
                                            paddingRight: hp('2'),
                                            paddingLeft: hp('2')
                                        }}>
                                            {checkServiceImage(element.key)}
                                            <Text style={styles.serviceText}>{element.name}</Text>
                                            <Image  source={require(un_check_circle)}
                                                   style={{width: wp('5'), height: wp('5'), resizeMode: 'contain'}}/>
                                        </Row>
                                    </></TouchableHighlight>
                                )
                            }
                       })
                   }

               </Row>
           );
       };
        const parentServicesSecondScreen = ()=>{
           return( <Row style={styles.servicesRow}>

               {
                   servicesType.map((element ,i)=>{
                       return(
                           <TouchableHighlight
                               underlayColor='none'
                               style={styles.servicesBtn}
                               key={i}
                               onPress={()=>{this.servicesTypeSelector(element)}}
                           >
                               <Row style={{justifyContent:'space-between', paddingRight:hp('2'), paddingLeft:hp('2') }}>

                                   <Text style={styles.serviceText}>{element.name}</Text>
                                   {
                                       selectedServicesType === element.key ?
                                           <Image  source={require(check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                                           : <Image  source={require(un_check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />


                                   }
                               </Row>

                           </TouchableHighlight>
                       )
                   })
               }

           </Row>)
        };

        const parentServices = () =>{
            return(
                <SafeAreaView style={{ flex:1, backgroundColor: '#FFFFFF' }}>
                    <Grid style={styles.mainContainer}>
                        <Row style={styles.txtRow}>

                        </Row>
                        <Row style={styles.txtRowH}>
                            <Text style={styles.textS}>Select Your</Text>
                        </Row>
                        <Row style={styles.txtRowH}>
                            <Text style={styles.textM}>Method of Verification</Text>
                        </Row>
                        <Row style={styles.txtRow}>

                        </Row>
                        {screenSelectServices && parentServicesScreenOne() ? parentServicesScreenOne(): parentServicesSecondScreen()}

                        <Row style={styles.btnRow}>
                            <TouchableHighlight
                                underlayColor='none'
                                // disabled={servicesDisable}
                                style={styles.buttonContinue}
                                onPress={()=>{this.continue()}}
                            >
                                <Text style={styles.ContinueText}>Continue</Text>
                            </TouchableHighlight>
                        </Row>
                    </Grid>

                </SafeAreaView>
            )
        };

        const shuftPro = ()=>{
            return(
                <ShuftiPro
                    requestPayload={{ ...payload, ...createdPayload }}
                    isShow={true}
                    verificationMode={selectedServicesType}
                    accessToken={""}
                    basicAuth={{ client_id:client_id, secret_key:secret_key }}
                    async={false}
                    asyncResponseCallback={(response)=>{
                        console.log("Response : ", response)
                    }}
                    onResponseOkayButton={()=>{
                        this.setState({ switchBetweenServiceAndType:true, screenSelectServices:true })
                    }}
                    cancelBtn={(res)=>{
                        console.log(res);
                        this.setState({ switchBetweenServiceAndType:true,  screenSelectServices:true })
                    }}
                />
            )
        };


        return(switchBetweenServiceAndType ? parentServices() : shuftPro())

    }
}

export default VerificationSelector;

const styles = StyleSheet.create({
    mainContainer:{
        height:hp('100')-expo.statusBarHeight,
        backgroundColor:'#FFFFFF',
    },
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
    txtRow:{
        ...Platform.select({
            ios:{
                height:hp('5%')
            },
            android:{
                height:hp('5%')
            }
        }),
        width:wp('100%'),
        alignItems:'center',
        flexDirection:'column'

    },
    txtRowH:{
        ...Platform.select({
            ios:{
                height:hp('5%')
            },
            android:{
                height:hp('5%')
            }
        }),
        justifyContent:'center',

    },
    textS:{
        // color:'#C6C6C6',
        fontSize: 16,

    },
    textM:{
        // color:'#C6C6C6',
        fontSize: 18,

    },
    servicesRow:{
        flexDirection:'column',
        width:wp('100%'),
        // borderWidth:1,
        ...Platform.select({
            ios:{
                height:hp('40%')
            },
            android:{
                height:hp('42%')
            }
        }),
        alignItems: 'center',
        alignSelf :'center'
    },
    servicesBtn:{
        width:wp('85%'),
        borderWidth:1,
        borderColor:'#F6F6F6',
        ...Platform.select({
            ios:{
                height:hp('8%')
            },
            android:{
                height:hp('8%')
            }
        }),
        marginBottom:hp('2'),
        justifyContent:'center',
        borderRadius: 100,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "rgba(88,88,88,0.34)",
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.6,


    },
    serviceText:{
        width:wp('50%'),
        color:'#212E8D',
        fontWeight:'500'

    },
    Ocr:{
            width:wp('35%'),
            borderWidth:1,
            borderColor:'#F6F6F6',
            ...Platform.select({
                ios:{
                    height:hp('8%')
                },
                android:{
                    height:hp('8%')
                }
            }),
            marginBottom:hp('2'),
            justifyContent:'center',
            borderRadius: 100,
            backgroundColor:'#FFFFFF',
            alignItems:'center',
            flexDirection:'row',
            shadowColor: "rgba(88,88,88,0.34)",
            shadowOffset: { width: 5, height: 3 },
            shadowOpacity: 0.6,
    },
    OcrText:{
        width:wp('50%'),
        color:'#212E8D',
        fontWeight:'500'
    }


});
