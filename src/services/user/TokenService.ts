export class TokenService {
    static getUserInfo() {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            return JSON.parse(userInfo);
        }
        return null; 
    }

    static saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static saveUserInfo(userInfo: string) {
        localStorage.setItem('userInfo', userInfo);
    }

    // static getUserInfo() {
    //     return localStorage.getItem('userInfo');
    // }
}
