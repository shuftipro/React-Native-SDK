## Request Parameters (With OCR)

It is important to note here that each service module is independent of other and each one of them is activated according to the nature of request received from you. There are a total of four services which include face, document, address and consent.

All verification services are optional. You can provide Shufti Pro a single service or mixture of several services for verifications. All keys are optional too.

* ## reference

  Required: **Yes**  
  Type: **string**  
  Minimum: **6 characters**  
  Maximum: **250 characters**

  This is the unique reference ID of request, which we will send you back with each response, so you can verify the request. Only alphanumeric values are allowed. This reference can be used to get status of already performed verification requests.


* ## country

  Required: **No**  
  Type: **string**  
  Length: **2 characters**

  Send the 2 characters long [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) country code of where your customer is from. Please consult [Supported Countries](https://api.shuftipro.com/api/docs/offsite_with_ocr/#supported-countries) for country codes.

* ## language

  Required: **No**   
  Type: **string**  
  Length: **2 characters**

  Send the 2 characters long language code of your preferred language to display the verification screens accordingly. Please consult [Supported Languages](https://api.shuftipro.com/api/docs/offsite_with_ocr/#supported-languages) for language codes. Default language english will be selected if this key is missing in the request.

* ## email

  Required: **No**  
  Type: **string**  
  Minimum: **6 characters**  
  Maximum: **128 characters**

  This field represents email of the end-user.

* ## callback_url

  Required: **No**  
  Type: **string**  
  Minimum: **6 characters**  
  Maximum: **250 characters**

  During a verification request, we make several server to server calls to keep you updated about the verification state. This way you can update the request status at your end even if the customer is lost midway through the process.

* ## face

  The easiest of all verifications is done by authenticating the face of the users. In case of face verification, end-user will have to capture video of their face that essentially makes it a selfie verification. 
 For **face verification** just add the key "face" in data dictionary as **"face": true**

<!-- -------------------------------------------------------------------------------- -->

* ## document

  Shufti Pro provides document verification through various types of documents. The supported formats are passports, ID Cards, driving licenses and debit/credit cards. You can opt for more than 1 document type as well. 
 For **document verification** just add key "document" in data dictionary. Here are the additional keys for document
 
  * <h3>supported_types</h3>

    Required: **Yes**  
    Type: **Array**
 
      Supported Types      |
      ---------------------|
      passport             |
      id_card            |
      driving_license    |
      credit_or_debit_card |

    **Example 1** ["driving_license"]  
    **Example 2** ["id_card", "credit_or_debit_card", "passport"]

   * <h3>name</h3>

      Required: **No**  
      Type: **Boolean**

      In name object used in document service, first_name and last_name are extracted from the document provided if name is set to **true**. 
 
 
   * <h3>dob</h3>

     Required: **No**  
     Type: **Boolean**  

     Set **true** to perform dob extraction from provided proofs.

   * <h3>document_number</h3>

     Required: **No**  
     Type: **Boolean**  

     Set **true** to perform document number extraction from provided proofs.

   * <h3>issue_date</h3>

     Required: **No**  
     Type: **Boolean**  

     Set **true** to perform issue date extraction from provided proofs. 

   * <h3>expiry_date</h3>

     Required: **No**  
     Type: **Boolean**  

     Set **true** to perform expiry date extraction from provided proofs.

   * <h3>fetch_enhanced_data</h3>

     Required: **No**  
     Type: **string**  
     Accepted value: **1**

     Provide 1 for enabling enhanced data extraction for the document. Shufti Pro provides its customers with the facility of extracting enhanced data features using OCR technology. Now, instead of extracting just personal information input fields, Shufti Pro can fetch all the additional information comprising more than 100 data points from the official ID documents supporting 150 languages. For example height, place_of_birth, nationality, marital_status, weight, etc.(additional charges apply)
Extrated data will be returned in object under the key additional_data in case of verification.accepted or verification.declined.
For Details on additional_data object go to [Additional Data](https://api.shuftipro.com/api/docs/#additional-data)
 

* ## address

  Address of an individual can be verified from the document. For **address verification** just add key "address" in data dictionary. Here are the additional keys for address
   
     * <h3>supported_types</h3>

          Required: **Yes**  
          Type: **Array**
 
          Supported Types      |
          ---------------------|
          id_card             |
          utiltiy_bill           |
          bank_statement   |

         **Example 1** [ "utility_bill" ]  
         **Example 2** [ "id_card", "bank_statement" ]
    
    * <h3>full_address</h3>

       Required: **No**  
       Type: **Boolean** 

       Set **true** to perform full address extraction from provided proofs. Allowed Characters are numbers, alphabets, dots, dashes, spaces, underscores, hashes          and commas.

     * <h3>name</h3>

       Required: **No**  
       Format **Boolean**

       Set **true** to perform name extraction from provided proofs.
    
 * ## consent
  
      Customised documents/notes can also be verified by Shufti Pro. Company documents, employee cards or any other personalised note can be authenticated by this       module. You can choose handwritten or printed document format but only one form of document can be verified in this verification module. Text whose presence       on the note/customized document is to be verified, is also needed to be provided.
      For **consent verification** just add key "consent" in data dictionary. Here are the additional keys for consent
 
    * <h3>format</h3>

      Required: **Yes**  
      Type: **string**

      Text provided in the consent verification can be verified by handwritten documents or printed documents. If “any” is mentioned in the format parameter, then       user can verify provided note using either of these two documents. Mention only one format from the following list.

      Formats              |
      ---------------------|
      handwritten          |
      printed            |
      any                |

      **Example 1**  "printed"  
      **Example 2**  "any"

   

    * <h3>text</h3>

      Required: **Yes**  
      Type: **string**  
      Minimum: **2 characters**  
      Maximum: **100 chracters**

      Provide text in the string format which will be verified from a given proof.
