import { postAPI } from "../../utils/FetchData";
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
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        dispath({type: ALERT, payload: {success: res.data.msg}})
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
        console.log(res)
        dispath({type: ALERT, payload: {success: res.data.msg}})
    } catch (error:any) {
        dispath({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}