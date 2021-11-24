require("dotenv").config();
const IMAGE_DEFAULT = "/default.jpeg";
const JWT_KEY = process.env.JWT_KEY || "secret";
const PASSWORD_DEFAULT = process.env.PASSWORD_DEFAULT || "1234";

module.exports = {
	IMAGE_DEFAULT,
    JWT_KEY,
    PASSWORD_DEFAULT,
    GitHub:{
        user: "iagomussel",
        repo: "odontomaster",
        token: process.env.GITHUB_TOKEN
    },
    AVAILABLE_DAYS: {
        1: { open: "08:00", close: "18:00" },
        2: { open: "08:00", close: "18:00" },
        3: { open: "08:00", close: "18:00" },
        4: { open: "08:00", close: "18:00" },
        5: { open: "08:00", close: "18:00" },
    }

}
