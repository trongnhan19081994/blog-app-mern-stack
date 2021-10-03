import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { showErrMsg } from '../../components/alert/Alert'
import DisplayBlog from '../../components/blog/DisplayBlog'
import Loading from '../../components/global/Loading'
import { getAPI } from '../../utils/FetchData'
import { IBlog, IParams } from '../../utils/TypeScript'

const DetailBlog = () => {
    const dispatch = useDispatch()
    const id = useParams<IParams>().slug
    const [blog, setBlog] = useState<IBlog>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        if(!id) return
        setLoading(true)
        getAPI(`blog/${id}`).then(res => {
            setBlog(res.data)
            setLoading(false)
        }).catch(err => {
            setError(err.response.data.msg)
            setLoading(false)
        })
        return () => setBlog(undefined)
    }, [id])
    if(loading) return <Loading />
    return (
        <div className="my-4"> 
            {
                error && showErrMsg(error)
            }
            {
                blog && <DisplayBlog blog={blog}/>
            }
        </div>
    )
}

export default DetailBlog
