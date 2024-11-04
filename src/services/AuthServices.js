import requests from "./api";

const AuthServices = {
    allUserLogin: async (body) => {
        console.log(body)
        return requests.post(`/login`, body);
    },
};

export default AuthServices;
