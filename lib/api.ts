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
    (error) => {
        if (isAxiosError(error) && error.response) {
            // NestJS returns `message` as a string or an array of validation messages
            const raw = error.response.data?.message;
            const message = Array.isArray(raw) ? raw.join(", ") : raw ?? error.message;
            return Promise.reject(new ApiError(error.response.status, message));
        }
        return Promise.reject(error);
    }
)

