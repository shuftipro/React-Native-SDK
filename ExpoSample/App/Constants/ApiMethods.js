import { decode as atob, encode as btoa } from 'base-64';
import { URI } from "./index";
const xhr = new XMLHttpRequest();

export const requestApi = (payload={}, auth=null, uploadProgress=()=>{}, callback=()=>{}) => {
    let token = null
    if(typeof(auth) === 'object'){
        token = 'Basic '+btoa(`${auth.client_id}:${auth.secret_key}`)
    }
    if(typeof(auth) === 'string'){
        token = 'Bearer '+ auth
    }

    let t = new Date().getTime();
    let t2 = Math.floor(t/10000);
    let  url =  (URI.BASE_URL) + "?t=" + t2;

    xhr.open('POST',url);
    xhr.onLoad = (res)=>{ console.log("res : ", res) };
    xhr.onerror = (err)=>{ console.log("err : ", err) };
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization',token);
    xhr.setRequestHeader('Cache-Control','max-age=0');
    xhr.send(JSON.stringify(payload));

    if (xhr.upload) {
        xhr.upload.onprogress = ({ total, loaded }) => { uploadProgress(loaded/total) }
    }

    xhr.onreadystatechange = function() {
        if(this.readyState === 4){
            uploadProgress(1)
        }
        if(this.readyState === 4 && this.status === 200) {
            if(xhr.responseText){
                callback(JSON.parse(xhr.responseText))
                xhr.abort();
            }else{
                callback({ reference:payload.reference, error:"", event:"request.invalid" })
                xhr.abort();
            }
        }else if(this.readyState === 4 && this.status === 400) {
            if(xhr.responseText){
                callback(JSON.parse(xhr.responseText))
                xhr.abort();
            }else{
                callback({ reference:payload.reference, error:"", event:"request.invalid" })
                xhr.abort();
            }
        }else if(this.readyState === 4 && this.status === 401) {
            if(xhr.responseText){
                callback(JSON.parse(xhr.responseText))
                xhr.abort();
            }else{
                callback({ reference:payload.reference, error:"", event:"request.invalid" })
                xhr.abort();
            }
        }
    }


    // fetch(URI.BASE_URL,
    //         {
    //         method : 'post',
    //         headers : {
    //             'Accept'        : 'application/json',
    //             'Content-Type'  : 'application/json',
    //             'Authorization' : token
    //         },
    //         body: JSON.stringify(payload)
    //     })
    //     .then(function(response) {
    //             return response.json();
    //         }).then(function(data) {
    //                 callback(data)
    //             }).catch((err)=>{
    //                     callback(err)
    //                 })
}
