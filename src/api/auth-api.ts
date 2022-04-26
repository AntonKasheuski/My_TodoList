import {instance} from "./api-instance";
import {FormValuesType} from "../features/Login";
import {ResponseType} from "./todolist-api";

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>('/auth/me')
            .then(res => res.data)
    },
    login(values: FormValuesType) {
        return instance.post<ResponseType<{userId: number}>>('/auth/login', values)
            .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType<{}>>('/auth/login')
            .then(res => res.data)
    },
}

type MeResponseType = {
    id: number
    email: string
    login: string
}