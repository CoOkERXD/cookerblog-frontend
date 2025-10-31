import axios from "./AxiosHelper";

export const GetIndexPage = async ()=>{
    var result = await axios.get("/index")
    return result.data
}