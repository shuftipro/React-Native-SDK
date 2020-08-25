## Request Parameters (Without OCR)


It is important to note here that each service module is independent of other and each one of them is activated according to the nature of request received from you. There are a total of four services which include face, document, address and consent.

  

All verification services are optional. You can provide Shufti Pro a single service or mixture of several services for verifications. All keys are optional too.

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

*  ## face

   The easiest of all verifications is done by authenticating the face of the users. In case of face verification, end-user will have to capture video of their face that essentially makes it a selfie verification.

   For ****face verification**** just add the key "face" in data dictionary as ****"face": true****

  

<!-- -------------------------------------------------------------------------------- -->

*  ## document
   Shufti Pro provides document verification through various types of documents. The supported formats are passports, ID Cards, driving licenses and debit/credit cards. You can opt for more than 1 document type as well.

   For ****document verification**** just add key "document" in data dictionary. Here are the additional keys for document

   * <h4>supported_types</h4>
   
     Required: ****Yes****
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
       
         Required: ****Yes****
         Type: ****Array****


         |   Supported Types       | 
         | :------------- | 
         |  id_card | 
         | utiltiy_bill   | 
         | bank_statement   | 



            ****Example 1**** [ "utility_bill" ]
            ****Example 2**** [ "id_card", "bank_statement" ]

      * <h4>full_address</h4>

        Required: ****Yes****
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

          Required: ****Yes****
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

   * <h4>format</h4>
   
       Required: ****Yes****
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
 
