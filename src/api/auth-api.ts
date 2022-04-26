import {instance} from "./api-instance";
import {FormValuesType} from "../features/Login";
import {ResponseType} from "./todolist-api";

export const authAPI = {
    login(values: FormValuesType) {
        return instance.post<ResponseType<{userId: number}>>('/auth/login', values)
            .then(res => res.data)
    }
}