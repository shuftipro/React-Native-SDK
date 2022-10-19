# What Is This?

Shufti Pro is an AI-based identity verification SaaS (Software as a Service) provider that offers real-time global identity verifications for seamless KYC/AML and KYB compliance.

It provides businesses with a sound risk-cover and helps prevent fraud with its automated identity verification services including face verification, document verification, document two verification, consent verification, address verification, biometric consent verification, phone verification, background checks, and 2-factor authentication.

AML screening services enable clients to gain an extra layer of security, by identifying cybercriminals and fraudsters at the source.

An easy to integrate API allows smooth customer onboarding and establishes longstanding trust while optimising customer processing costs altogether.

## Table of contents
* [General Requirements](#General-Requirements)
* [SDK Installation Guide](#SDK-Installation-Guide)
* [Packages](#Packages)
* [Dependencies in Expo](#Dependencies-in-Expo)
* [Dependencies in React Native](#Dependencies-in-React-Native)
* [Integration](#Integration)
* [Verification With OCR](#With-OCR)
* [Verification Without OCR](#Without-OCR)
* [Usage](#Usage)
* [Verification Object Parameters](#Verification-Object-Parameters)
* [Response Status Codes](#Response-Status-Codes)
* [Events](#Events)
* [Test IDs](#test-ids)
* [Contact](#contact)
* [Copyright](#copyright)


# Basic Setup
## General Requirements
Followings are minimum requirements for SDK:
  

 - Internet connection

Supported architectures in SDK:

 - armeabi-v7a, x86, arm64-v8a, x86_64
 <br><br>
## SDK Installation Guide 
### Installation through npm (Expo)
  ```
  $ npm install expo-shuftipro-kyc --save`
``` 

### Installation through npm (React Native)
  ```
  $ npm install react-native-shuftipro-kyc --save`
``` 

### Packages

We find it fair to share our `package.json` **dependencies** with you! here are the main dependencies used inside Shufti pro.
<br><br>

* #### Dependencies in Expo

```json
"dependencies": {  
  "base-64": "^0.1.0",  
  "expo": "~38.0.8",  
  "expo-av": "~8.2.1",  
  "expo-camera": "~8.3.1",  
  "prop-types": "^15.7.2",  
  "react-native-easy-grid": "^0.2.2",  
  "react-native-responsive-screen": "^1.4.1",  
  "react-redux": "^7.2.1",  
  "redux": "^4.0.5",  
  "redux-persist": "^6.0.0",  
  "redux-thunk": "^2.3.0",  
  "expo-permissions": "~9.0.1",  
  "expo-network": "~2.2.1"  
},
```
* #### Dependencies in React Native
```json
"dependencies": {  
    "@react-native-async-storage/async-storage": "^1.13.4",
    "@react-native-community/netinfo": "^5.9.6",
    "base-64": "^0.1.0",
    "prop-types": "^15.7.2",
    "react": "16.13.1",
    "react-native": "0.63.2",
    "react-native-camera": "^3.36.0",
    "react-native-easy-grid": "^0.2.2",
    "react-native-fs": "^2.16.6",
    "react-native-responsive-screen": "^1.4.1",
    "react-native-shuftipro-kyc": "^1.1.5",
    "react-native-video": "^5.1.1",
    "react-native-video-controls": "^2.7.1",
    "react-native-video-helper": "^1.4.4",
    "react-native-webview": "^11.2.3",
    "react-redux": "^7.2.1",
    "redux": "^4.0.5",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.3.0"
},
```

 ### Integration:
 See the sample project provided to learn the most common use. Make sure to build on real device.
 
 * #### Expo
 ```
 $ import ShuftiPro from "expo-shuftipro-kyc"
 ```

* #### React Native
 ```
 $ import ShuftiPro from "react-native-shuftipro-kyc"
 ```
  * ##### Android
     goto ```ProjectName/android/app/build.gradle``` and add ```missingDimensionStrategy react-native-camera, 'general``` in defaultConfig: section.
     like this :
  
     ```js
      defaultConfig {
        applicationId "com.xxxxxxxxx"
        minSdkVersion rootProject.xx.xxxxxxxxxx
        targetSdkVersion rootProject.xx.xxxxxxxx
        versionCode 1
        versionName "1.0"
        missingDimensionStrategy 'react-native-camera', 'general' //add this line
    }
     ```



***Make an instance***

Instance can be made in two ways. First is by using **clientId** and **secretKey**, other one is by providing **accessToken**.  
You can read more about **accessToken**  [here](https://api.shuftipro.com/api/docs/#access-token)


## Verification

In order to get verified, customers will have themselves verified through their mobile phones. They will do it through the merchant's mobile application. Merchant will collect the information and send us the data for verification. The Merchant shall provide us with the proofs(Videos). We will not collect them directly from the user.

*  ### With OCR
In verification with OCR, it means that the merchant has not provided us proofs (images/videos) and also no data in some keys. In this verification Shufti Pro will perform extraction of data from those proofs and finally verify the data.
 ``` js
 export const verificationObj = {  
     reference: "Unique reference",  
     country: "GB",  
     language: "EN",  
     email: "johndoe@example.com",  
     callback_url: "http://www.example.com",  
     redirect_url: "http://www.example.com",
     show_consent: 1,
     show_results: 1,
     show_privacy_policy: 1,
     open_webview:false
     face: true,  
     document: {  
              supported_types["passport","id_card","driving_license","credit_or_debit_card"],  
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
              gender: "",
              backside_proof_required: "0",
     },
     document_two: {  
              supported_types["passport","id_card","driving_license","credit_or_debit_card"],  
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
              gender: "",
              backside_proof_required: "0",
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
               backside_proof_required: "0",
    },  
    consent: {  
               supported_types: ['printed'],
               text: "This is a customized text"  
    },
    background_checks:{

    },
    phone:{

    }
   
   
 };
 ```

*  ### Without OCR
In verification without OCR, merchant gives us the data in keys as well as all the proofs required then Shufti Pro just have to verify the data. No customer interaction takes place in this kind of verification.

 ``` js
 export const verificationObj = {  
     reference: "Unique reference",  
     country: "GB",  
     language: "EN",  
     email: "johndoe@example.com",  
     callback_url: "http://www.example.com", 
     redirect_url: "http://www.example.com", 
     show_consent: 1,
     show_results: 1,
     show_privacy_policy: 1,
     open_webview:false
     face: true,  
     document: {  
              supported_types["passport","id_card","driving_license","credit_or_debit_card"],  
              name: {  
                  first_name: "John",  
                  last_name: "Carter",  
                  middle_name: "Doe"  
                  },  
              dob: "1992-10-10",  
              document_number: "2323-5629-5465-9990",  
              expiry_date: "2025-10-10",  
              issue_date: "2015-10-10",  
              fetch_enhanced_data: "1",
              gender: "m",
              backside_proof_required: "0",
     }, 
     document_two: {  
              supported_types["passport","id_card","driving_license","credit_or_debit_card"],  
              name: {  
                  first_name: "John",  
                  last_name: "Carter",  
                  middle_name: "Doe"  
                  },  
              dob: "1992-10-10",  
              document_number: "2323-5629-5465-9990",  
              expiry_date: "2025-10-10",  
              issue_date: "2015-10-10",  
              fetch_enhanced_data: "1",
              gender: "m",
              backside_proof_required: "0",
     }, 
     address: {  
               full_address: "3339 Maryland Avenue, Largo, Florida",  
               name: {  
                     first_name: "John",  
                     last_name: "Carter",  
                     middle_name: "Doe",  
                     fuzzy_match: "1",
                     backside_proof_required: "0",
                     },  
               supported_types: ["id_card", "utility_bill", "bank_statement"],  
      },  
      consent: {  
              supported_types: ["printed"],  
              text: "This is a customized text"  
      },
      background_checks:{

      },
      phone:{
      
      }     
 };
 ```

## Usage
* #### with accessToken
```js
<ShuftiPro
          requestPayload={verificationObj}
          verificationMode={"image"}
          async={false}
          asyncResponseCallback={(response)=>{
           console.log("Response : ", response)
          }}
         onResponseOkayButton={()=>{console.log("Okay Btn")}}
         cancelBtn={()=>{console.log("Cancel Btn")}}
         accessToken={""}
       />
```
* #### with Client Id and Secret Key
```js
<ShuftiPro
          requestPayload={verificationObj}
          verificationMode={"image"}
          async={false}
          asyncResponseCallback={(response)=>{
           console.log("Response : ", response)
          }}
         onResponseOkayButton={()=>{console.log("Okay Btn")}}
         cancelBtn={()=>{console.log("Cancel Btn")}}
         basicAuth={{client_id:KEYS.BASIC_AUTH_UNAME,secret_key:KEYS.BASIC_AUTH_PWD }}
/>
```

## Asyncronous Feedback

If async value is set to ****true**** you'll instantly get the user's control back so you don't have to wait for the verification results. When a request is completed you'll automatically get a callback.

 ```sh
async = true
```

## Verification Mode

This parameter specifies the types of proof that can be used for verification. If verificationMode value is set to ****image**** SDK will be capturing images. However by default it capture images as proofs for verification.

```sh
verificationMode = "image"
```

## Verification Object Parameters

It is important to note here that each verification option offered by Shufti Pro is an exclusive service, and is activated following the nature of user’s request. Clients can choose one or all of the optional API keys.

In case a key is given in document and address verification, and no value is provided, then OCR will be performed for those particular keys.

   *  ## reference
      Required: ****Yes****
     Type: ****string****
     Minimum: ****6 characters****
     Maximum: ****250 characters****

      This is the unique reference ID of request, which we will send you back with each response, so you can verify the request. Only alphanumeric values are allowed.    This reference can be used to get status of already performed verification requests.
   
   *  ## country
      
      Required: ****No****
     Type: ****string****
     Length: ****2 characters****

      Send the 2 characters long [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) country code of where your customer is from. Please consult [Supported Countries](https://api.shuftipro.com/api/docs/offsite_with_ocr/#supported-countries) for country codes.

     

   *  ## language
      
      Required: ****No****
     Type: ****string****
     Length: ****2 characters****

      Send the 2 characters long language code of your preferred language to display the verification screens accordingly. Please consult [Supported Languages](https://api.shuftipro.com/api/docs/offsite_with_ocr/#supported-languages) for language codes. Default language english will be selected if this key is missing in the request.

     

   *  ## email

      Required: ****No****
     Type: ****string****
     Minimum: ****6 characters****
     Maximum: ****128 characters****

      This field represents email of the end-user.

     

   *  ## callback_url

      Required: ****No****
      Type: ****string****
      Minimum: ****6 characters****
      Maximum: ****250 characters****

      During a verification request, we make several server to server calls to keep you updated about the verification state. This way you can update the request status at your end even if the customer is lost midway through the process.


   * ## show_privacy_policy
       
       Required: **No**  
       Type: **Bool**  
       Accepted Values: **0**, **1**
       
       This key specifies if privacy policy must be shown to the user or not. If show_privacy_policy is **0**, then privacy policy is not shown. If it is **1**, privacy policy is displayed to the user on the result screen.

   * ## show_results
       
       Required: **No**  
       Type: **Bool**  
       Accepted Values: **0**, **1**
       
       This key specifies whether the verification results will be displayed to the user or not. .If show_results is 0, then verification results are not shown to the user and sent to the merchant. If show_results is 1, then verification results are shown to the user. 


   * ## show_consent
       
       Required: **No**  
       Type: **Bool**  
       Accepted Values: **0**, **1**
       
       This key specifies if the consent is shown to the user or not. If show_consent is 0, then consent screen is not shown to the user. If show_consent is 1, then consent is shown to the user at the start of the verification.   

   * ## open_webview

     Required: **No**  
     Type: **Bool**  
     Accepted Values: **true**, **false**

     This boolean type of parameter is used to identify if you want to perform verification in its hybrid view. If open_webview is true, it means that the user wants verification in hybrid view. If false, then the user wants verification with OCR or Without OCR. The value is false by default.    

   *  ## face

      The easiest of all verifications is done by authenticating the face of the users. In case of face verification, end-user will have to capture video of their face that essentially makes it a selfie verification.

      For ****face verification**** just add the key "face" in data dictionary as ****"face": true****

     

   <!-- -------------------------------------------------------------------------------- -->


*  ## Document or Document 2
   Shufti Pro provides document verification through various types of documents. The supported formats are passports, ID Cards, driving licenses and debit/credit cards. You can opt for more than 1 document type as well.

   For ****document verification**** just add key "document" in data dictionary. Here are the additional keys for document

   * <h4>supported_types</h4>
   
     Required: ****No****
     Type: ****Array****
     
     |  Supported Types       | 
     | :------------- | 
     |  passport | 
     |  id_card  | 
     |  driving_license  |
     |  credit_or_debit_card  |

     ****Example 1**** ["driving_license"]
     
     ****Example 2**** ["id_card", "credit_or_debit_card", "passport"]

  

   * <h4>name</h4>

     Required: ****No****
     Type: ****object****

     For a name verification, first_name field is required.

     ****Example 1****  { "first_name" : "John", "last_name" : "Doe" }
     
     ****Example 2****  { "first_name" : "John", "last_name" : "Doe", "fuzzy_match" : "1"}

       <h5>first_name</h5>
     
        Required: ****Yes****
        Type: ****string****
        Minimum: ****2 characters****
        Maximum: ****32 chracters****
        Allowed Characters are alphabets, - (dash), comma, space, dot and single             quotation mark.
        Example ****John'O Harra****

     <h5>middle_name</h5>

       Required: ****No****
       Type: ****string****
       Minimum: ****2 characters****
       Maximum: ****32 chracters****
       Allowed Characters are alphabets, - (dash), comma, space, dot and single quotation mark.
       Example ****Carter-Joe****

     <h5>last_name</h5>
   
       Required: ****No****
       Type: ****string****
       Minimum: ****2 characters****
       Maximum: ****32 chracters****

       Allowed Characters are alphabets, - (dash), comma, space, dot and single     quotation mark.
       Example ****John, Huricane Jr.****

  

   * <h4>fuzzy_match</h4>

      Required: ****No****
      Type: ****string****
      Value Accepted: ****1****

     Provide 1 for enabling a fuzzy match of the name. Enabling fuzzy matching attempts to find a match which is not a 100% accurate.

  

   * <h4>dob</h4>

     Required: ****No****
     Type: ****string****
     Format: ****yyyy-mm-dd****
     
     Provide a valid date. Please note that the date should be before today.
Example 1990-12-31

  

   * <h4>document_number</h4>

     Required: ****No****
   Type: ****string****
   Minimum: ****2 characters****
    Maximum: ****100 chracters****

     Allowed Characters are numbers, alphabets, dots, dashes, spaces, underscores and commas.
Examples 35201-0000000-0, ABC1234XYZ098

  

    * <h4>issue_date</h4>

      Required: ****No****
      Type: ****string****
       Format: ****yyyy-mm-dd****

      Provide a valid date. Please note that the date should be before today.
      Example 2015-12-31

  

   * <h4>expiry_date</h4>

     Required: ****No****
     Type: ****string****
     Format: ****yyyy-mm-dd****

     Provide a valid date. Please note that the date should be after today.
     Example 2025-12-31

   * <h4>fetch_enhanced_data</h4>
   
      Required: ****No****
      Type: ****string****
       Accepted value: ****1****

  

     Provide 1 for enabling enhanced data extraction for the document. Shufti Pro provides its customers with the facility of extracting enhanced data features using OCR technology. Now, instead of extracting just personal information input fields, Shufti Pro can fetch all the additional information comprising more than 100 data points from the official ID documents supporting 150 languages. For example height, place_of_birth, nationality, marital_status, weight, etc.(additional charges apply)

      Extrated data will be returned in object under the key additional_data in case of verification.accepted or verification.declined.

     For Details on additional_data object go to [Additional Data](https://api.shuftipro.com/api/docs/#additional-data)

  

<!-- -------------------------------------------------------------------------------- -->

*  ## address

   Address of an individual can be verified from the document. For ****address
   verification**** just add key "address" in data dictionary. Here are the 
   additional keys for address

    * <h4>supported_types</h4>
    
      Required: ****No****
      Type: ****Array****


      |   Supported Types       | 
      | :------------- | 
      |  id_card | 
      | utiltiy_bill   | 
      | bank_statement   | 



         ****Example 1**** [ "utility_bill" ]
         ****Example 2**** [ "id_card", "bank_statement" ]

   * <h4>full_address</h4>

     Required: ****No****
     Type: ****string****
     Minimum: ****2 characters****
     Maximum: ****250 chracters****

     Allowed Characters are numbers, alphabets, dots, dashes, spaces,     underscores, hashes and commas.



   * <h4>name</h4>

      Required: ****No****
      Format ****object****
      Name verification from an address image, provide first_name as necessary.

     ****Example 1****  { "first_name" : "John", "last_name" : "Doe" }
     ****Example 2****  { "first_name" : "John", "last_name" : "Doe", "fuzzy_match" : "1"}



     <h5>first_name</h5>

       Required: ****No****
       Type: ****string****
       Minimum: ****2 characters****
       Maximum: ****32 chracters****

       Allowed Characters are alphabets, - (dash), comma, space, dot and single    quotation mark.
       Example ****John'O Harra****

     <h5>middle_name</h5>

      Required: ****No****
     Type: ****string****
     Minimum: ****2 characters****
     Maximum: ****32 chracters****

     Allowed Characters are alphabets, - (dash), comma, space, dot and single quotation mark.
     Example ****Carter-Joe****

     <h5>last_name</h5>

     Required: ****No****
     Type: ****string****
     Minimum: ****2 characters****
     Maximum: ****32 chracters****

     Allowed Characters are alphabets, - (dash), comma, space, dot and single quotation mark.
     Example ****John, Huricane Jr.****


   * <h4>fuzzy_match</h4>
   
      Required: ****No****
      Type: ****string****
       Value Accepted: ****1****

     Provide 1 for enabling a fuzzy match of the name. Enabling fuzzy matching attempts to find a match which is not a 100% accurate.



<!-- -------------------------------------------------------------------------------- -->


*  ## consent

Customised documents/notes can also be verified by Shufti Pro. Company documents, employee cards or any other personalised note can be authenticated by this module. You can choose handwritten or printed document format but only one form of document can be verified in this verification module. Text whose presence on the note/customized document is to be verified, is also needed to be provided.

For ****consent verification**** just add key "consent" in data dictionary. Here are the additional keys for consent

* <h4>supported_types</h4>

    Required: ****No****
   Type: ****string****


   Text provided in the consent verification can be verified by handwritten documents or printed documents. If “any” is mentioned in the format parameter, then user can verify provided note using either of these two documents. Mention only one format from the following list.

   |   Formats       | 
   | :------------- | 
   |  handwritten | 
   | printed   | 
   | any   | 

    
    ****Example 1****  "printed"
    ****Example 2****  "any"





 * <h3>text</h3>
 
     Required: ****Yes****
     Type: ****string****
     Minimum: ****2 characters****
     Maximum: ****100 chracters****

   Provide text in the string format which will be verified from a given proof.

* ## phone

Verify the phone number of end-users by sending a random code to their number from Shufti Pro. Once the sent code is entered into the provided field by end-user, a phone number will stand verified. It is primarily an on-site verification and you have to provide phone number of the end-user to us, in addition to the verification code and the message that is to be forwarded to the end-user. Shufti Pro will be responsible only to send the message along with verification code to the end-user and verify the code entered by the end-user.

* <h3>phone_number</h3>

Required: **No**  
Type: **string**  
Minimum: **2 characters**  
Maximum: **64 chracters**

Allowed Characters: numbers and plus sign at the beginning. Provide a valid customer’s phone number with country code. Shufti Pro will directly ask the end-user for phone number if this field is missing or empty.

* <h3>random_code</h3>

Required: **No**  
Type: **string**  
Minimum: **2 characters**  
Maximum: **10 chracters**

Provide a random code. If this field is missing or empty. Shufti Pro will generate a random code.

* <h3>text</h3>

Required: **No**  
Type: **string**  
Minimum: **2 characters**  
Maximum: **100 chracters**

Provide a short description and random code in this field. This message will be sent to customers. ***This field should contain random_code***. If random_code field is empty then Shufti Pro will generate a random code and append the code with this message at the end.

<!-- -------------------------------------------------------------------------------- -->
* ## background_checks

It is a verification process that will require you to send us the full Name of end-user in addition to the date of birth. Shufti Pro will perform AML based background checks based on this information. Please note that the name and dob keys will be extracted from document service if these keys are empty.

* <h3>name</h3>

Required: **No**  
Format: **object**

In name object used in background checks service, first_name is required and other fields are optional.

* <h4>first_name</h4>

Required: **No**  
Type: **string**  
Minimum: **2 characters**  
Maximum: **32 chracters**

Allowed Characters are alphabets, - (dash), comma, space, dot and single quotation mark. 
Example **John'O Harra**

* <h4>middle_name</h4>

Required: **No**  
Type: **string**  
Minimum: **2 characters**  
Maximum: **32 chracters**

Allowed Characters are alphabets, - (dash), comma, space, dot and single quotation mark.  
Example **Carter-Joe**

* <h4>last_name</h4>

Required: **No**  
Type: **string**  
Minimum: **2 characters**  
Maximum: **32 chracters**

Allowed Characters are alphabets, - (dash), comma, space, dot and single quotation mark. 
Example **John, Huricane Jr.**

* <h3>dob</h3>

Required: **No**  
Type: **string**  
Format: **yyyy-mm-dd**

Provide a valid date. Please note that the date should be before today. 
Example 1990-12-31

<br>




## Response Status Codes

Shufti Pro Verification API uses conventional HTTP response codes to indicate the success or failure of an API request. Every response is generated in JSON with a specific HTTP code.

  

## HTTP Codes

Following is a list of HTTP codes which are generated in responses by Shufti Pro Verification API.


   HTTP code | HTTP message | Message  |
 | :------------- | :------------- | :------------- | 
   200 | OK | success
   400 | Bad Request  | bad request: one or more parameter is invalid or missing
   401 | Unauthorized | unauthorized: invalid signature key provided in the request
   402 | Request Failed | invalid request data: missing required parameters
   403 | Forbidden  | forbidden: service not allowed
   404 | Not Found  | resource not found
   409 | Conflict | conflicting data: already exists
   500 | Server Error | internal server error
<br>

## Events

  

Events are sent in responses which show the status of request. These events are sent in both HTTP and callback responses.

  Event | description | HTTP Response | Callback Response
| :------------- | :------------- | :------------- | :------------- | 
request.pending | Request parameters are valid and verification url is generated in case of on-site verification.|Yes|Yes
request.invalid | Request parameters provided in request are invalid.|Yes|Yes
request.cancelled | Request is cancelled by the user. This event occurs when end-user disagrees to terms and conditions before starting verifications.|Yes|Yes
request.timeout | Request has timed out after a specific period of time.|No|Yes
request.unauthorized  | Request is unauthorized. The information provided in authorization header is invalid.|Yes|No
verification.accepted | Request was valid and accepted after verification.|Yes|Yes
verification.declined | Request was valid and declined after verification.|Yes|Yes

## Sample project setup

In Mode/VerificationSelector.js add your ****Client ID**** on line 17 and ****Secret Key**** on line 18, thats it!

>  ****_Note:_**** _Run project on real device._

  

## Test IDs

Shufti Pro provides the users with a number of test documents. Customers may use these to test the demo, instead of presenting their actual information. <br><br>

  

  

[![](https://raw.githubusercontent.com/shuftipro/integration-guide/master/assets/realFace.jpg?v=1)](https://raw.githubusercontent.com/shuftipro/integration-guide/master/assets/realFace.jpg?v=1)

  

[![](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/real-id-card.jpg)](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/real-id-card.jpg)

  

[![](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/fake-id-card.jpg)](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/fake-id-card.jpg)

  

## Contact

If you have any questions/queries regarding implementation SDK please feel free to contact our [tech support](mailto:support@shuftipro.com).

  

## Copyright

2017-21 © Shufti Pro Ltd.

## Revision History

   Date | Description |
 | :------------- | :------------- |
   11 Mar 2021 | Update design and add extra functionality|
   1 Jun 2021 | Content update and improve user experience|
