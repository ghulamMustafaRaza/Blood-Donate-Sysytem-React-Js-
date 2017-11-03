
export class DonorActions {
    constructor() { }

    static I = 'I'

    static LOAD_DONORS = 'LOAD_DONORS'
    static LOAD_DONORS_FULL_FILL = 'LOAD_DONORS_FULL_FILL'
    static LOAD_DONORS_FAIL = 'LOAD_DONORS_FAIL'

    static TEST_HELLO = "TEST_HELLO"
    static AFTER_TEST_HELLO = "AFTER_TEST_HELLO"
}
Object.keys(DonorActions).map(a => {
    let b = a.split('_').map(a => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join('')
    b = b.charAt(0).toLowerCase() + b.slice(1)
    DonorActions[b] = payload => ({ type: a, payload })
})
// testHelloWorld = () => {
//     return({
//         type: DonorActions.TEST_HELLO
//     })
// }    
