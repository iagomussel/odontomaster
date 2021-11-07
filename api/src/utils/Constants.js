const IMAGE_DEFAULT = "/default.jpeg";
const JWT_KEY = process.env.JWT_KEY;
const PASSWORD_DEFAULT = process.env.PASSWORD_DEFAULT | "1234";

module.exports = {
	IMAGE_DEFAULT,
    JWT_KEY,
    PASSWORD_DEFAULT,
    GitHub:{
        user: "iagomussel",
        repo: "odontomaster",
        token: process.env.GITHUB_TOKEN
    }

}
