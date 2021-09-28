import {Dispatch} from 'redux'
import { getAPI, postAPI } from '../../utils/FetchData'
import { imageUpload } from '../../utils/ImageUpload'
import { IBlog } from '../../utils/TypeScript'
import { ALERT, IAlertType } from '../types/alertType'
import { GET_BLOGS_CATEGORY_ID, GET_HOME_BLOGS, IGetBlogsCategoryType, IGetHomeBlogsType } from '../types/blogType'

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
        await postAPI('blog', newBlog, token)
        dispatch({type: ALERT, payload: {loading: false}})
    } catch (error: any) {
        dispatch({type: ALERT, payload: {errors: error.response.data.msg}})
    }
} 
export const getHomeBlogs = () => async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await getAPI('home/blogs')
        dispatch({
            type: GET_HOME_BLOGS,
            payload: res.data
        })
        dispatch({type: ALERT, payload: {loading: false}})
    } catch (error: any) {
        dispatch({type: ALERT, payload: {errors: error.response.data.msg}})
    }
} 

export const getBlogsByCategoryId = (id: string, search: string) => async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
    try {
        let limit = 4
        let value = search ? search : `?page=${1}`
        dispatch({type: ALERT, payload: {loading: true}})
        const res = await getAPI(`blogs/${id}${value}&limit=${limit}`)
        dispatch({
            type: GET_BLOGS_CATEGORY_ID,
            payload: {...res.data, id, search}
        })
        dispatch({type: ALERT, payload: {loading: false}})
    } catch (error: any) {
        dispatch({type: ALERT, payload: {errors: error.response.data.msg}})
    }
} 