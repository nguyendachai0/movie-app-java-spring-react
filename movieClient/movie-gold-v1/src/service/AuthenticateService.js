import {jwtDecode} from "jwt-decode";
class AuthenticateService {
    static logout() {
        localStorage.removeItem('token');
    }

    static isAuthenticated() {;
        const token = this.getToken()
        return ( token != null && !(this.isTokenExpired()) )
    }
    static getToken(){
        return localStorage.getItem('token');
    }
    static decodeToken(){
        return jwtDecode(this.getToken());

    }
    static getExp(){ 
        const decodedToken = this.decodeToken();
        if (!decodedToken) {
            return null;
        }
        return decodedToken.exp;
    }
    static isTokenExpired(){
        try {
            const exp = this.getExp();
            if (!exp) {
                return true; // If there's no expiration, consider the token expired
            }
            const currentTime = Date.now() / 1000; // Current time in seconds
            return currentTime > exp;
        } catch (error) {
            console.error("Error checking if token is expired", error);
            return true; // Consider the token expired if there's an error
        }

    }

}

export default AuthenticateService;
