function validateUsername(inputText){
    const usernameFormat = /^[a-zA-Z0-9]+$/;
    return inputText.match(usernameFormat);
}
function MTInput(inputText){
    return (inputText.length == 0)
}
function validateName (inputName){
    const nameFormat = /^[a-zA-Z ]+$/;
    return inputName.match(nameFormat);
}
function checkPass(inputPass){
    const passFormat = /^[A-Za-z]\w{7,14}$/;
    return inputPass.match(passFormat);
}
function validatePass(inputPass, thePass){
    return inputPass.match(thePass);
}
function showPassword(id){
    let element = document.getElementById(id)
    if (element.type === "text"){
        element.type = "password"
    }
    else
        element.type = "text"
        
}
