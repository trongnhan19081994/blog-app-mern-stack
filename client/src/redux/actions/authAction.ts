import { postAPI, getAPI } from "../../utils/FetchData";
import { IUserLogin, IUserRegister } from "../../utils/TypeScript";
import { AUTH, IAuthType } from "../types/authType";
import {Dispatch} from 'redux'
import { ALERT, IAlertType } from "../types/alertType";
import { validREgister } from "../../utils/Valid";

export const login = (userLogin: IUserLogin) => async (dispath: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispath({type: ALERT, payload: {loading: true}})
        const res = await postAPI('login', userLogin) 
        dispath({
            type: AUTH,
            payload: res.data
        })
        dispath({type: ALERT, payload: {success: res.data.msg}})
        localStorage.setItem('logged', 'true')
    } catch (error:any) {
        dispath({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}

export const register = (userRegister: IUserRegister) => async (dispath: Dispatch<IAuthType | IAlertType>) => {
    const check = validREgister(userRegister)
    if(check.errLength > 0) return dispath({type: ALERT, payload: {errors: check.errMsg}})
    try {
        dispath({type: ALERT, payload: {loading: true}})
        const res = await postAPI('register', userRegister)
        dispath({type: ALERT, payload: {success: res.data.msg}})
    } catch (error:any) {
        dispath({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}

export const refreshToken = () => async (dispath: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')
    if(logged !== 'true') return 
    try {
        dispath({type: ALERT, payload: {loading: true}})
        const res = await getAPI('refresh_token')
        dispath({type: AUTH, payload: res.data})
        dispath({type: ALERT, payload: {loading: false}})
    } catch (error:any) {
        dispath({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}

export const logout = () => async (dispath: Dispatch<IAuthType | IAlertType>) => {
    try {
        localStorage.removeItem('logged')
        await getAPI('logout')
        window.location.href = '/'
    } catch (error:any) {
        dispath({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}