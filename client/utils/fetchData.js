import axios from 'axios';
import  Constants from 'expo-constants';

const port=5000;
const uri = Constants?.expoConfig?.hostUri
  ? Constants.expoConfig.hostUri.split(`:`).shift().concat(`:${port}`)
  : `localhost:${port}`;


export const getDataAPI=async(url)=>{
    const res=await axios.get(`http://${uri}/api/${url}`)
    return res;
}

export const postDataAPI=async(url,post)=>{
    const res=await axios.post(`http://${uri}/api/${url}`,post)
    return res;
}

export const putDataAPI=async(url,put)=>{
    const res=await axios.put(`http://${uri}/api/${url}`,put)
    return res;
}

export const patchDataAPI=async(url,post,)=>{
    const res=await axios.patch(`http://${uri}/api/${url}`,post)
    return res;
}

export const deleteDataAPI=async(url,post)=>{
    const res=await axios.delete(`http://${uri}/api/${url}`,post)
    return res;
}