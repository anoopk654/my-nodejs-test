const {testLogic,testElementChecker} = require('../test_logic')
test('URL check',()=> {
    const validUrl = testLogic('https://wltest.dns-systems.net/')
    if(validUrl !== true)
    {
        throw new Error('URL should be valid')
    }
})