var validUrl = require('valid-url');
const testLogic = (url)=> {
    if (validUrl.isUri(url)){
        return true
    } 
    else {
        return false
    }
}
module.exports = {
    testLogic
}