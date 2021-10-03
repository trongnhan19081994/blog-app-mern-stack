import { IComment } from "../../utils/TypeScript";

export const CREATE_COMMENT = "CREATE_COMMENT"
export const GET_COMMENT = "GET_COMMENT"

export interface ICommentState {
    data: IComment[],
    total: number
}

export interface ICreateCommentType {
    type: typeof CREATE_COMMENT
    payload: IComment
}

export interface IGetCommentsType {
    type: typeof GET_COMMENT
    payload: ICommentState
}

export type ICommentType = 
| ICreateCommentType
| IGetCommentsType