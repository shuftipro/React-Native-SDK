# What Is This?

Shufti Pro is a SaaS, that provides quick and accurate digital identity and document verification. E-KYC using government-issued documents like ID card, passport, driving license and even credit/debit cards, etc. has never been easier. Shufti Pro allows for simple and easy ID checks online, securing the virtual trading platforms and FinTech institutions against scams, frauds and money launderers.


# Basic Setup
## General Requirements
Followings are minimum requirements for SDK:
  

 - Internet connection

Supported architectures in SDK:

 - armeabi-v7a, x86, arm64-v8a, x86_64
## SDK Installation Guide 
### Installation through npm (Expo)
  ```
  $ npm install expo-shuftipro-kyc --save`
``` 

### SDK Installation Guide (React Native)
  ```
  $ npm install react-native-shuftipro-kyc --save`
``` 

### Packages

We find it fair to share our `package.json dependencies`  with you! here are the main dependencies used inside Shuftipro.
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
   "@react-native-community/netinfo": "^5.9.6",
    "base-64": "^0.1.0",
    "prop-types": "^15.7.2",
    "react-native-camera": "^3.36.0",
    "react-native-easy-grid": "^0.2.2",
    "react-native-responsive-screen": "^1.4.1",
    "react-native-video": "^5.1.0-alpha7",
    "react-native-video-helper": "^1.4.4",
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
	face: true,
	document: {
		supported_types["passport", "id_card", "driving_license", "credit_or_debit_card"],
			name: {
				first_name: "",
				last_name: "",
				middle_name: ""
			},
			dob: "",
			document_number: "",
			expiry_date: "",
			issue_date: "",
			fetch_enhanced_data: "1"
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
		format: "printed",
		text: "This is a customized text"
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
	face: true,
	document: {
		supported_types["passport", "id_card", "driving_license", "credit_or_debit_card"],
			name: {
				first_name: "John",
				last_name: "Carter",
				middle_name: "Doe"
			},
			dob: "1992-10-10",
			document_number: "2323-5629-5465-9990",
			expiry_date: "2025-10-10",
			issue_date: "2015-10-10",
			fetch_enhanced_data: "1"
	},
	address: {
		full_address: "3339 Maryland Avenue, Largo, Florida",
		name: {
			first_name: "John",
			last_name: "Carter",
			middle_name: "Doe",
			fuzzy_match: "1"
		},
		supported_types: ["id_card", "utility_bill", "bank_statement"],
	},
	consent: {
		format: "printed",
		text: "This is a customized text"
	}
};
 ```




 
 
## Usage
* #### with accessToken
```js
            <ShuftiPro
                requestPayload={verificationObj}
                verificationMode={"video"}
                async={true}
                asyncResponseCallback={(response) => {
                    console.log("Response : ", response)
                }}
                onResponseOkayButton={() => {
                    console.log("Okay Btn")
                }}
                cancelBtn={() => {
                    console.log("Cancel Btn")
                }}
                accessToken={""}
            />
```
* #### with Client Id and Secret Key
```js
        <ShuftiPro
                requestPayload={verificationObj}
                verificationMode={"video"}
                async={true}
                asyncResponseCallback={(response) => {
                    console.log("Response : ", response)
                }}
                onResponseOkayButton={() => {
                    console.log("Okay Btn")
                }}
                cancelBtn={() => {
                    console.log("Cancel Btn")
                }}
                basicAuth={{client_id: KEYS.BASIC_AUTH_UNAME, secret_key: KEYS.BASIC_AUTH_PWD}}
            />
```

## Asyncronous Feedback

If async value is set to ****true**** you'll instantly get the user's control back so you don't have to wait for the verification results. When a request is completed you'll automatically get a callback.

 ```sh
async = "true"
```

## Verification Mode

This parameter specifies the types of proof that can be used for verification. If verificationMode value is set to ****image**** SDK will be capturing images. However by default it records videos as proofs for verification.

```sh
verificationMode = "image"
```

## Request Parameters

Parameters for request with OCR can be found [here](With-ocr-request-parameters-Readme.md) 

Parameters for request without OCR can be found [here](With-out-ocr-request-parameters-Readme.md)


  

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

In Mode/VerificationSelector.js add your ****Client ID**** on line 13 and ****Secret Key**** on line 14, thats it!

>  ****_Note:_**** _Run project on real device._

  

## Test IDs

Shufti Pro provides the users with a number of test documents. Customers may use these to test the demo, instead of presenting their actual information. <br><br>

  

  

[![](https://raw.githubusercontent.com/shuftipro/integration-guide/master/assets/realFace.jpg?v=1)](https://raw.githubusercontent.com/shuftipro/integration-guide/master/assets/realFace.jpg?v=1)

  

[![](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/real-id-card.jpg)](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/real-id-card.jpg)

  

[![](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/fake-id-card.jpg)](https://raw.githubusercontent.com/shuftipro/RESTful-API-v1.3/master/assets/fake-id-card.jpg)

  

## Contact

If you have any questions/queries regarding implementation SDK please feel free to contact our [tech support](mailto:support@shuftipro.com).

  

## Copyright

2016-20 © Shufti Pro Ltd.
  
