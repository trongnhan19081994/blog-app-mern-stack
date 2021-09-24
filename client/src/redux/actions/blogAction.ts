import {Dispatch} from 'redux'
import { imageUpload } from '../../utils/ImageUpload'
import { IBlog } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'

export const createBlog = (blog: IBlog, token: string) => async (dispatch: Dispatch<IAlertType>) => {
    let url
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        if(typeof(blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail)
            url = photo.url
        } else {
            url = blog.thumbnail
        }
        const newBlog = {...blog, thumbnail: url}
        console.log({blog: newBlog, token})
        dispatch({type: ALERT, payload: {loading: false}})
    } catch (error: any) {
        dispatch({type: ALERT, payload: {errors: error.response.data.msg}})
    }
} 