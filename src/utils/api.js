import axios from 'axios'
import 'dotenv/config'

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL
})