import webClient from "./client_axios";

class JWT {
    static authHeader(){
        // return authorization header with jwt token
        let user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            return { 'Authorization': 'Bearer ' + user.token };
        } else {
            return {'Authorization': 'none '}
        }
    }
    static async checkToken(){
        return webClient.get('/')
    }
    
}
export default JWT;
