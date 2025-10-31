import axios from "./AxiosHelper";

export const GetCategories = async () =>{
    var result = await axios.get("/Category")
    return result.data
}

export const GetCategoryWithArticleDto = async () =>{
    var result = await axios.get("/Category/GetCategoryWithArticleDtoAsync")
    return result.data
}