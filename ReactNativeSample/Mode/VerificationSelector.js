import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Text, Image, TouchableHighlight, StyleSheet, SafeAreaView } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import ShuftiPro from "react-native-shuftipro-kyc";

const client_id = "oEPYGaRFbzvwvhVLQp91uZKS2qdhqNAMqzJRUgsA5OFdTqCCwI1598014778";
const secret_key = "$2y$10$/XH0YGN3bE54Uqud/.iKsuGfShCvvmjCGrh3HvgGORCf2CU9hhWFC";

const check_circle = "../Assets/checked.png";
const un_check_circle = "../Assets/un-checked.png";
const doc_icon = "../Assets/docIcon.png";
const face_icon = "../Assets/faceIcon.png";
const address_icon = "../Assets/addressIcon.png";

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
            paylaod:{
                country: "GB",
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
                { name:'Video' , key:'video' },
                { name:'Image' , key:'image' }
            ],
            selectedService:[],
            selectedServicesType:'video',
            screenSelectServices:true,
            switchBetweenServiceAndType:true,
            isOcr:true
        };
    }

    UNSAFE_componentWillMount(){
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
        const { screenSelectServices, switchBetweenServiceAndType } = this.state;
        if(screenSelectServices){
            this.setState({screenSelectServices:false})
        }else{
            this.setState({switchBetweenServiceAndType:false})
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
            paylaod,
            isOcr
        } = this.state;

        const getIcon = (key) => {
            switch (key) {
                case 'face':
                    return <Image source={require(face_icon)}  style={{width:wp('4'),height:wp('4'), resizeMode:'contain' }} />
                    break;
                case 'document':
                    return <Image source={require(doc_icon)}  style={{width:wp('4'),height:wp('4'), resizeMode:'contain' }} />
                    break;
                case 'address':
                    return <Image source={require(address_icon)}  style={{width:wp('4'),height:wp('4'), resizeMode:'contain' }} />
                    break;
                default:
                    return <Image source={require(face_icon)}  style={{width:wp('4'),height:wp('4'), resizeMode:'contain' }} />
                    break;
            }
        }

        const parentServicesScreenOne = () => {
            return (
                <Row style={styles.servicesRow}>
                    <Row style={{ width:wp('85'), height:hp('9'), alignItems:'center', justifyContent:'space-between' }}>
                        <TouchableHighlight
                            underlayColor='none'
                            style={[styles.servicesBtn, { width:wp('40'), height:hp('5') }]}
                            onPress={()=>{ this.setState({ ...this.state, isOcr:true, selectedService:[], createdPayload:{} }) }}>
                            <>
                                <Row style={{justifyContent:'space-between', paddingRight:hp('2'), }}>
                                    <Text style={styles.serviceText}>OCR </Text>
                                    <Image source={isOcr ? require(check_circle) : require(un_check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                                </Row>
                            </>
                        </TouchableHighlight>
                        
                        <TouchableHighlight
                            underlayColor='none'
                            style={[styles.servicesBtn, { width:wp('40'), height:hp('5') }]}
                            onPress={()=>{ this.setState({ ...this.state, isOcr:false, selectedService:[], createdPayload:{} }) }}>
                            <>
                                <Row style={{justifyContent:'space-between', paddingRight:hp('2'), }}>
                                    <Text style={styles.serviceText}>Without OCR</Text>
                                    <Image source={isOcr ? require(un_check_circle) : require(check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                                </Row>
                            </>
                        </TouchableHighlight>
                    </Row>
                    {
                        services.map((element,i)=>{
                            if(selectedService.indexOf(element.key) > -1){
                                return(
                                    <TouchableHighlight
                                        underlayColor='none'
                                        style={styles.servicesBtn}
                                        key={i}
                                        onPress={()=>{this.serviceSelector('delete', element.key, isOcr ? verificationObj[element.key] : verificationObj01[element.key])}}>
                                        <>
                                            {getIcon(element.key)}
                                            <Row style={{justifyContent:'space-between', paddingRight:hp('2'), paddingLeft:hp('2') }}>
                                                <Text style={styles.serviceText}>{element.name}</Text>
                                                <Image source={require(check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                                            </Row>
                                        </>
                                    </TouchableHighlight>
                                )
                            }else{
                                return(
                                    <TouchableHighlight
                                        underlayColor='none'
                                        style={styles.servicesBtn}
                                        key={i}
                                        onPress={()=>{this.serviceSelector('add', element.key, isOcr ? verificationObj[element.key] : verificationObj01[element.key])}}>
                                        <>
                                            {getIcon(element.key)}
                                            <Row style={{justifyContent:'space-between', paddingRight:hp('2'), paddingLeft:hp('2') }}>
                                                <Text style={styles.serviceText}>{element.name}</Text>
                                                <Image source={require(un_check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                                            </Row>
                                        </>
                                    </TouchableHighlight>
                                )
                            }
                        })
                    }
                </Row>
            );
        };

        const parentServicesSecondScreen = () => {
            return( <Row style={styles.servicesRow}>
                {
                   servicesType.map((element ,i)=>{
                        return( 
                            <TouchableHighlight
                                underlayColor='none'
                                style={styles.servicesBtn}
                                key={i}
                                onPress={()=>{this.servicesTypeSelector(element)}}>

                                <Row style={{justifyContent:'space-between', paddingRight:hp('2'), paddingLeft:hp('2') }}>
                                    <Text style={styles.serviceText}>{element.name}</Text>
                                    {
                                        selectedServicesType === element.key ?
                                            <Image source={require(check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
                                            : <Image source={require(un_check_circle)}  style={{width:wp('5'),height:wp('5'), resizeMode:'contain' }} />
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
                        <Row style={styles.txtRow}></Row>

                        <Row style={styles.txtRowH}>
                            <Text style={styles.textS}>Select Your</Text>
                        </Row>
                        <Row style={styles.txtRowH}>
                            <Text style={styles.textM}>Method of Verification</Text>
                        </Row>

                        <Row style={styles.txtRow}></Row>

                        {screenSelectServices ? parentServicesScreenOne() : parentServicesSecondScreen()}

                        <Row style={styles.btnRow}>
                            <TouchableHighlight
                                underlayColor='none'
                                disabled={selectedService.length < 1}
                                style={[styles.buttonContinue, { opacity:selectedService.length < 1 ? 0.5 : 1 }]}
                                onPress={()=>{this.continue()}}>
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
                    requestPayload={{ ...createdPayload, ...paylaod }}
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
                    cancelBtn={()=>{
                        this.setState({ switchBetweenServiceAndType:true,  screenSelectServices:true })
                    }}/>
            )
        };

        return(switchBetweenServiceAndType ? parentServices() : shuftPro())
    }
}

export default VerificationSelector;

const styles = StyleSheet.create({
    mainContainer:{
        height:hp('100'),
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
    },
    buttonContinue:{
        backgroundColor: '#2B6AD8',
        ...Platform.select({
            ios:{
                height:hp('7%'),
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
        fontSize: 16,
    },
    textM:{
        fontSize: 18,
    },
    servicesRow:{
        flexDirection:'column',
        width:wp('100%'),
        ...Platform.select({
            ios:{
                height:hp('40%')
            },
            android:{
                height:hp('42%')
            }
        }),
        alignItems:'center',
        alignSelf: 'center'
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
        paddingLeft:hp('3'),
        marginBottom:hp('2'),
        justifyContent:'center',
        borderRadius: 100,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        flexDirection:'row',
        shadowColor: "rgba(88,88,88,0.34)",
        elevation:2,
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.6,
    },
    serviceText:{
        color:'#212E8D',
        fontWeight:'500'
    }
});