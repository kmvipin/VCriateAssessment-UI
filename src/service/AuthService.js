import { privateAxios, myAxios } from "./helper";

export const userLogin = async (authCredential)=>{
    try{
        const response = await myAxios.post(
            `/api/public/auth/login`, authCredential
        );
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const savePerson = async (person,OTP) =>{
    try{
        const response = await myAxios.post(
            `/api/public/auth/signup?otp=${OTP}`, person
        );
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const logoutUser = async () =>{
    try{
        const response = await privateAxios.post(
            `/api/person/logout`
        );
        return response.data;
    }
    catch(err){
        throw err;
    }
}

export const getOTP =async (email) =>{
    try{
        const res = await myAxios.post(`/api/public/send-otp?email=${email}`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export const verifyOTP = async (email, OTP) =>{
    try{
        const res = await myAxios.get(`/api/public/verify-otp?email=${email}&&otp=${OTP}`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}

export const validateEmail = async (email) =>{
    try{
        const res = await myAxios.get(`/api/public/verify/user-email?email=${email}`);
        return res.data;
    }
    catch(err){
        throw err;
    }
}