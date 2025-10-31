import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:5235'
export default axios