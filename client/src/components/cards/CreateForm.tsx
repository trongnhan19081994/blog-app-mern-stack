import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore, IBlog, InputChange } from '../../utils/TypeScript'

interface IProps {
    blog: IBlog,
    setBlog: (blog: IBlog) => void
}

const CreateForm: React.FC<IProps> = ({blog, setBlog}) => {
    const {categories} = useSelector((state: RootStore) => state)

    const handleChangeInput = (e: InputChange) => {
        e.preventDefault()
        const {value, name} = e.target
        setBlog({...blog, [name]: value})
    }

    const handleChangeThumbnail = (e: InputChange) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        if(files) {
            const file = files[0]
            setBlog({...blog, thumbnail: file})
        }
    }

    return (
        <form>
            <div className="form-group position-relative">
                <input type="text" className="form-control" name="title" value={blog.title}  onChange={handleChangeInput} />
                <small className="text-muted position-absolute"
                    style={{bottom: 0, right: '3px', opacity: 0.4}}
                > {blog.title.length}/50 </small>
            </div>
            <div className="form-group my-3">
                <input type="file" className="form-control" name="" accept="image/*" 
                    onChange={handleChangeThumbnail}
                />
                <small className="text-muted position-absolute"
                    style={{bottom: 0, right: '3px'}}
                > 0/50 </small>
            </div>
            <div className="form-group position-relative">
                <textarea className="form-control" name="description" value={blog.description} style={{resize: 'none'}} 
                    onChange={handleChangeInput}
                />
                <small className="text-muted position-absolute"
                    style={{bottom: 0, right: '3px'}}
                > {blog.description.length}/200 </small>
            </div>

            <div className="form-group my-4">
                <select className="form-control text-capitalize" name="category"
                    value={blog.category} 
                    onChange={handleChangeInput}
                >
                    <option value=""> Choose a category </option>
                    {
                        categories.map(category => (
                            <option value={category._id} key={category._id}>  {category.name}  </option>
                        ))
                    }
                </select>
            </div>
        </form>
    )
}

export default CreateForm
