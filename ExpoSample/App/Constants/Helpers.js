export function isObjEmpty(obj){
    if(obj){
        return Object.keys(obj).length === 0;
    }
    return false;
}

export const getFileAsBase64 = async (url, callback) => {
    const response = await fetch(url);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.onload = function(event){
        callback(event.target.result.split(';base64,')[1])
    };
    reader.readAsDataURL(blob);
}