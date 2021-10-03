import { Dispatch } from "react";
import { getAPI, postAPI } from "../../utils/FetchData";
import { IComment } from "../../utils/TypeScript";
import { ALERT, IAlertType } from "../types/alertType";
import { CREATE_COMMENT, GET_COMMENT, ICreateCommentType, IGetCommentsType } from "../types/commentType";

export const createComment = (data: IComment, token: string) => async (dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    try {
        const res = await postAPI('comment', data, token)
        dispatch({
            type: CREATE_COMMENT,
            payload: {...res.data, user: data.user}
        })
    } catch (error:any) {
        dispatch({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}

export const getComments = (id: string) => async (dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
        const res = await getAPI(`comment/blog/${id}`)
        dispatch({
            type: GET_COMMENT,
            payload: { 
                data: res.data.comments,
                total: res.data.total
            }
        })
    } catch (error:any) {
        dispatch({type: ALERT, payload: {errors: error.response.data.msg}})
    }
}