import { CREATE_COMMENT, GET_COMMENT, ICommentState, ICommentType } from "../types/commentType"

const initialState = {
    data: [],
    total: 1
}

const commentReducer = (state: ICommentState = initialState, action: ICommentType) => {
    switch (action.type) {
        case CREATE_COMMENT:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case GET_COMMENT: 
        return action.payload
        default:
            return state
    }
}

export default commentReducer