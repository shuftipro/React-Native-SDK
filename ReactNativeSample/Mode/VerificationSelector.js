import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Grid, Row } from "react-native-easy-grid";
import ShuftiPro from "react-native-shuftipro-kyc";

import {
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
const client_id ='';
const secret_key = '';
const uncheckedbox = '../Assets/uncheck.png';
const checkedbox = '../Assets/checked_box.png';
const doc_icon = '../Assets/document.png';
const back_icon = '../Assets/back_icon.png';
const face_icon = '../Assets/face.png';
const image_cam = '../Assets/imageCam.png';
const video_cam = '../Assets/videoCam.png';
const second_screen_icon = '../Assets/select_type_icon.png';
const continue_next = '../Assets/continue_next.png';
const address_icon = '../Assets/address.png';
const consent_icon = '../Assets/consent.png';
const phone_icon = '../Assets/2fa.png';
const bgChecks_icon = '../Assets/bgChecks.png';

const verificationObj01 = {
  face: true,
  background_checks:{},
  phone:{},
  document: {
    supported_types: [
      'passport',
      'id_card',
      'driving_license',
      'credit_or_debit_card',
    ],
    name: {
      first_name: 'John',
      last_name: 'Livone',
      middle_name: '',
    },
    dob: '1989-09-06',
    document_number: 'A123456',
    expiry_date: '2025-09-09',
    issue_date: '2001-05-02',
    fetch_enhanced_data: '1',
    gender: 'm',
    backside_proof_required: '0',
  },
  document_two: {
    supported_types: ['passport', 'id_card', 'driving_license', 'credit_or_debit_card'],
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
    backside_proof_required: '0',
},
  address: {
    full_address: '10 Downing St, Westminister, London SW1A 2AA, UK',
    name: {
      first_name: 'John',
      last_name: 'Livone',
      middle_name: '',
      fuzzy_match: '1',
      backside_proof_required: '0',
    },
    supported_types: ['id_card', 'utility_bill', 'bank_statement'],
  },
  consent: {
    supported_types: ['printed', 'handwritten'],
    text: 'My name is John Doe and I authorize this transaction of $100/-',
  },
};

const verificationObj = {
  face: true,
  background_checks:{},
  phone:{},
  document: {
    supported_types: [
      'passport',
      'id_card',
      'driving_license',
      'credit_or_debit_card',
    ],
    name: {
      first_name: '',
      last_name: '',
      middle_name: '',
    },
    dob: '',
    document_number: '',
    expiry_date: '',
    issue_date: '',
    fetch_enhanced_data: '',
    gender: '',
    backside_proof_required: '0',
  },
  document_two: {
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
    backside_proof_required: '0',
},
  address: {
    full_address: '',
    name: {
      first_name: '',
      last_name: '',
      middle_name: '',
      fuzzy_match: '',
    },
    supported_types: ['id_card', 'utility_bill', 'bank_statement'],
    backside_proof_required: '0',
  },
  consent: {
    supported_types: ['printed', 'handwritten'],
    text: 'My name is John Doe and I authorize this transaction of $100/-',
  },
};

class VerificationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paylaod: {
        country: 'GB',
        language: 'EN',
        email: '',
        callback_url: 'http://www.example.com',
        redirect_url: 'https://www.dummyurl.com/',
        show_consent: 1,
        show_results: 1,
        show_privacy_policy: 1,
      },
      config: {
        open_webview: false,
      },
      createdPayload: {},
      services: [
        {
          name: 'Face Verification',
          key: 'face',
        },
        {
          name: 'Document Verification',
          key: 'document',
        },
        {
          name:"Document Two Verification" ,
          key:"document_two"
      },
        {
          name: 'Address Verification',
          key: 'address',
        },
        {
          name: 'Consent Verification',
          key: 'consent',
        },
        {
          name: 'Two Factor Authentication',
          key: 'phone',
        },
        {
          name: 'Background Checks',
          key: 'background_checks',
        },
      ],
      servicesType: [
        {name: 'Image Proof', key: 'image'},
        {name: 'Video Proof', key: 'video'},
      ],
      selectedService: [],
      selectedServicesType: 'image',
      screenSelectServices: true,
      switchBetweenServiceAndType: true,
      isOcr: true,
    };
  }

  UNSAFE_componentWillMount() {}

  serviceSelector(action, id, obj = {}) {
    const {selectedService, createdPayload} = this.state;

    if (action === 'add') {
      createdPayload[id] = obj;
      this.setState({createdPayload});
    }

    if (action === 'delete') {
      Object.entries(createdPayload).map(item => {
        if (id === item[0]) {
          delete createdPayload[item[0]];
          this.setState({createdPayload});
        }
      });
    }

    let IsExist = selectedService.some(x => x === id);
    if (!IsExist) {
      selectedService.push(id);
      this.setState({selectedService});
    } else {
      selectedService.map((item, i) => {
        if (item === id) {
          selectedService.splice(i, 1);
          this.setState({selectedService});
        }
      });
    }
  }

  servicesTypeSelector(element) {
    this.setState({selectedServicesType: element.key});
    this.continue();
  }

  continue() {
    const {screenSelectServices} = this.state;
    if (screenSelectServices) {
      this.setState({screenSelectServices: false});
    } else {
      this.setState({switchBetweenServiceAndType: false});
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
      config,
      isOcr,
      bgCheck,
    } = this.state;

    const getIconSecondScreen = key => {
      switch (key) {
        case 'video':
          return (
            <Image
              source={require(video_cam)}
              style={{width: wp('7%'), height: wp('7%'), resizeMode: 'contain'}}
            />
          );
          break;
        case 'image':
          return (
            <Image
              source={require(image_cam)}
              style={{width: wp('7%'), height: wp('7%'), resizeMode: 'contain'}}
            />
          );
          break;
        default:
          break;
      }
    };

    const getIcon = key => {
      switch (key) {
        case 'face':
          return (
            <Image
              source={require(face_icon)}
              style={{width: wp('8%'), height: wp('8%'), resizeMode: 'contain'}}
            />
          );
          break;
        case 'document':
          return (
            <Image
              source={require(doc_icon)}
              style={{width: wp('8%'), height: wp('8%'), resizeMode: 'contain'}}
            />
          );
          break;

          case 'document_two':
              return <Image source={require(doc_icon)}  style={{width:wp('8%'),height:wp('8%'), resizeMode:'contain' }} />
              break;

        case 'address':
          return (
            <Image
              source={require(address_icon)}
              style={{width: wp('8%'), height: wp('8%'), resizeMode: 'contain'}}
            />
          );
          break;

          case 'consent':
          return (
            <Image
              source={require(consent_icon)}
              style={{width: wp('8%'), height: wp('8%'), resizeMode: 'contain'}}
            />
          );
          break;
          case 'phone':
          return (
            <Image
              source={require(phone_icon)}
              style={{width: wp('8%'), height: wp('8%'), resizeMode: 'contain'}}
            />
          );
          break;
          case 'background_checks':
          return (
            <Image
              source={require(bgChecks_icon)}
              style={{width: wp('8%'), height: wp('8%'), resizeMode: 'contain'}}
            />
          );
          break;
          default:{

          }
      }
    };

    const parentServicesScreenOne = () => {
      return (
        <Row style={styles.servicesRow}>
          <Row style={styles.txtRow}>
            <Text style={styles.textM}>Verification</Text>
          </Row>

          <Row style={styles.txtRowH}>
            <Text style={styles.textS}>
              Select Your Method of{'\n'}Verification
            </Text>
          </Row>
          <Row style={styles.txtRow} />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle} >
          {services.map((element, i) => {
            if (selectedService.indexOf(element.key) > -1) {
              return (
                <TouchableHighlight
                  underlayColor="none"
                  style={styles.servicesBtn}
                  key={i}
                  onPress={() => {
                    this.serviceSelector(
                      'delete',
                      element.key,
                      isOcr
                        ? verificationObj[element.key]
                        : verificationObj01[element.key],
                    );
                  }}>
                  <>
                    {getIcon(element.key)}
                    <Row
                      style={{
                        justifyContent: 'space-between',
                        paddingRight: hp('2'),
                        paddingLeft: hp('2'),
                      }}>
                      <Text style={styles.serviceText}>{element.name}</Text>
                      <Image
                        source={require(checkedbox)}
                        style={{
                          width: wp('6'),
                          height: wp('6'),
                          resizeMode: 'contain',
                        }}
                      />
                    </Row>
                  </>
                </TouchableHighlight>
              );
            } else {
              return (
                <TouchableHighlight
                  underlayColor="none"
                  style={styles.servicesBtn}
                  key={i}
                  onPress={() => {
                    this.serviceSelector(
                      'add',
                      element.key,
                      isOcr
                        ? verificationObj[element.key]
                        : verificationObj01[element.key],
                    );
                  }}>
                  <>
                    {getIcon(element.key)}
                    <Row
                      style={{
                        justifyContent: 'space-between',
                        paddingRight: hp('2'),
                        paddingLeft: hp('2'),
                      }}>
                      <Text style={styles.serviceText}>{element.name}</Text>
                      <Image
                        source={require(uncheckedbox)}
                        style={{
                          width: wp('6'),
                          height: wp('6'),
                          resizeMode: 'contain',
                        }}
                      />
                    </Row>
                  </>
                </TouchableHighlight>
              );
            }
          })}
          </ScrollView>

          <Row style={styles.btnRow}>
            <TouchableHighlight
              underlayColor="none"
              disabled={selectedService.length < 1}
              style={[
                styles.buttonContinue,
                {opacity: selectedService.length < 1 ? 0.5 : 1},
              ]}
              onPress={() => {
                this.continue();
              }}>
              <Text style={styles.ContinueText}>Start Verification</Text>
            </TouchableHighlight>
          </Row>
        </Row>
      );
    };

    const parentServicesSecondScreen = () => {

      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Grid style={styles.mainContainer}>
            <TouchableHighlight
              underlayColor="none"
              onPress={() => {
                this.setState({
                  switchBetweenServiceAndType: true,
                  screenSelectServices: true,
                });
              }}>
              <Image
                source={require(back_icon)}
                style={{
                  width: wp('3'),
                  height: wp('5'),
                  marginLeft: wp('6'),
                  marginTop: wp('6'),
                  resizeMode: 'contain',
                }}
              />
            </TouchableHighlight>
            <Row style={styles.servicesRow}>
              <Image
                source={require(second_screen_icon)}
                style={{
                  width: wp('55'),
                  height: wp('55'),
                  resizeMode: 'contain',
                }}
              />

              <Row style={styles.select_type_heading}>
                <Text style={styles.type_text}>Choose Verification Type</Text>
              </Row>
              {servicesType.map((element, i) => {
                return (
                  <TouchableHighlight
                    underlayColor="none"
                    style={styles.servicesBtnSecondScreen}
                    key={i}
                    onPress={() => {
                      this.servicesTypeSelector(element);
                    }}>
                    <Row
                      style={{
                        justifyContent: 'flex-start',
                        paddingRight: hp('2'),
                        paddingLeft: hp('2'),
                      }}>
                      {getIconSecondScreen(element.key)}
                      <Text style={styles.serviceTextSecondScreen}>
                        {element.name}
                      </Text>
                      {
                        <Image
                          source={require(continue_next)}
                          style={{
                            width: wp('5'),
                            height: wp('5'),
                            resizeMode: 'contain',
                            marginTop: 5,
                          }}
                        />
                      }
                    </Row>
                  </TouchableHighlight>
                );
              })}

            </Row>
          </Grid>
        </SafeAreaView>
      );
    };

    const parentServices = () => {
      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
          <Grid style={styles.mainContainer}>
    
            {screenSelectServices
              ? parentServicesScreenOne()
              : parentServicesSecondScreen()}
          </Grid>
        </SafeAreaView>
      );
    };

    const shuftPro = () => {
      return (
        <ShuftiPro
          requestPayload={{...createdPayload, ...paylaod, ...config}}
          isShow={true}
          verificationMode={selectedServicesType}
          accessToken={''}
          basicAuth={{client_id: client_id, secret_key: secret_key}}
          async={false}
          asyncResponseCallback={response => {
            if(!JSON.stringify(response).includes("verification_url") && (JSON.stringify(createdPayload).includes("background_checks") || JSON.stringify(createdPayload).includes("phone") || (JSON.stringify(config).includes("\"open_webview\":true") && response.event != "request.unauthorized" )) ){
            this.setState({
              switchBetweenServiceAndType: true,
              screenSelectServices: true,
            });
          }
          }}
          onResponseOkayButton={() => {
            this.setState({
              switchBetweenServiceAndType: true,
              screenSelectServices: true,
            });
          }}
          
          cancelBtn={cancelResponse => {
            this.setState({
              switchBetweenServiceAndType: true,
              screenSelectServices: true,
            });
          }}
        />
      );
    };

    return switchBetweenServiceAndType ? parentServices() : shuftPro();
  }
}

export default VerificationSelector;

const styles = StyleSheet.create({
  mainContainer: {
    height: hp('100'),
    backgroundColor: '#FFFFFF',
  },
  header: {
    ...Platform.select({
      ios: {
        height: hp('7%'),
      },
      android: {
        height: hp('7%'),
      },
    }),
    borderWidth: 0.5,
  },

  btnRow: {
    ...Platform.select({
      ios: {
        bottom: hp('0%'),
      },
      android: {
        bottom: hp('0%'),
      },
    }),
    marginTop: '-200%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },

  buttonContinue: {
    backgroundColor: '#2C6CDD',
    ...Platform.select({
      ios: {
        height: hp('6%'),
      },
      android: {
        height: hp('7%'),
      },
    }),
    width: wp('90%'),
    borderRadius: 2,
    alignItems:'center',
    justifyContent: 'center',
  },

  ContinueText: {
    fontSize: wp('6%'),
    color: '#FFFFFF',
  },

  scrollStyle: {
    marginBottom: '10%',
  },

  txtRow: {
    ...Platform.select({
      ios: {
        height: hp('7%'),
      },
      android: {
        height: hp('5%'),
      },
    }),
    width: wp('100%'),
    alignItems: 'center',
    flexDirection: 'column',
  },
  txtRowH: {
    width: wp('90%'),
    marginLeft: wp('10%'),
    ...Platform.select({
      ios: {
        height: hp('11%'),
        marginBottom: wp('0%'),
        marginTop: wp('10%'),
      },
      android: {
        height: hp('11%'),
        marginBottom: wp('2%'),
      marginTop: wp('17%'),
      },
    }),
  },
  select_type_heading: {
    height: hp('8%'),
    marginTop: wp('4'),
    marginBottom: wp('8'),
    justifyContent: 'center',
  },
  textS: {
    fontWeight: 'bold',
    color: '#1D2C42',
    fontSize: wp('6%'),
  },
  textM: {
    color: '#030303',
    marginTop: '7%',
    justifyContent: 'center',
    fontSize: 20,
  },
  type_text: {
    fontSize: 21,
    color: '#1D2C42',
    fontWeight: 'bold',
  },
  servicesRow: {
    flexDirection: 'column',
    width: wp('100%'),
    ...Platform.select({
      ios: {
        height: hp('80%'),
      },
      android: {
        height: hp('80%'),
      },
    }),
    alignItems: 'center',
    alignSelf: 'center',
  },
  servicesBtn: {
    width: wp('90%'),
    borderWidth: 1,
    borderColor: '#F6F6F6',
    ...Platform.select({
      ios: {
        height: hp('7%'),
      },
      android: {
        height: hp('7%'),
      },
    }),
    paddingLeft: hp('1.5'),
    marginBottom: hp('2'),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(88,88,88,0.34)',
    elevation: 1,
  },
  servicesBtnSecondScreen: {
    width: wp('85%'),
    borderWidth: 1,
    borderColor: '#F6F6F6',
    ...Platform.select({
      ios: {
        height: hp('7%'),
      },
      android: {
        height: hp('7%'),
      },
    }),
    marginBottom: hp('2'),
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(88,88,88,0.34)',
    elevation: 2,
    shadowOffset: {width: 5, height: 3},
    shadowOpacity: 0.6,
  },

  serviceTextSecondScreen: {
    color: '#1D2C42',
    fontWeight: '500',
    fontSize: wp('5'),
    width: wp('60'),
    marginLeft: wp('5'),
  },

  serviceText: {
    color: '#1D2C42',
    fontWeight: '900',
    fontSize: wp('4'),
    width: wp('64'),
  },

});
