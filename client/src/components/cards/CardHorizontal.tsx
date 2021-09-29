import React from 'react'
import { Link } from 'react-router-dom'
import { IBlog } from '../../utils/TypeScript'

interface IProps {
    blog: IBlog,
}
const CardHorizontal: React.FC<IProps> = ({blog}) => {
    return (
        <div className="card mb-3" style={{minWidth: "280px"}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    {
                        blog.thumbnail && 
                        <>
                        {
                            typeof(blog.thumbnail) === 'string' 
                            ?   <Link to={`/blog/${blog._id}`}>
                                 <img src={blog.thumbnail} className="card-img" alt="thumbnail" />
                                </Link>
                            :  <img src={URL.createObjectURL(blog.thumbnail)} className="card-img" alt="thumbnail" />
                        }
                        </>
                    }
                   
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/blog/${blog._id}`}
                                className="text-capitalize text-decoration-none"
                            > 
                                {blog.title.slice(0,50) + '...'} 
                            </Link>
                        </h5>
                        <p className="card-text">{blog.description}</p>
                        <p className="card-text d-flex justify-content-end">
                            <small className="text-muted">
                                {new Date(blog.createdAt).toLocaleString()}
                            </small>
                        </p>
                    </div>
                </div>
            </div>
            </div>
    )
}

export default CardHorizontal
