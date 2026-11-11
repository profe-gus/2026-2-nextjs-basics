import "server-only"
import axios, {isAxiosError} from 'axios';

export class ApiError extends Error{
    constructor(
        public readonly status: number,
        message: string
    ){
        super(message);
        this.name = "ApiError";
    }
}

export const api = axios.create({
    baseURL : process.env.API_URL,
    headers : {"Content-Type": "application/json"},
    timeout : 10_000
})

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

