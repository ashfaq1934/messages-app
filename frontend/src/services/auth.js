import decode from 'jwt-decode'

const AUTH_TOKEN_KEY = 'authToken'
const USER_DETAILS = 'user'

export function logoutUser() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS);
}

export function setUserDetails(token, user) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DETAILS, user);
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)    
}

export function getUser(){
    return localStorage.getItem(USER_DETAILS)
}
// export function clearAuthToken() {
//     axios.defaults.headers.common['Authorization'] = ''
//     localStorage.removeItem(AUTH_TOKEN_KEY)
// }

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}
  
function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}