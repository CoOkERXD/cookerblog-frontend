import axios from './AxiosHelper'

export const GetTitleWithCategoryDtoes = async () =>{
    var result = await axios.get("/Post/GetTitleWithCategoryDtoes")
    return result.data
}

export const GetArticleAsync = async ({categoryName, title}) =>{
    var result = await axios.get("/Post", {params: {categoryName, title}})
    return result.data
}