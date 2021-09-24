import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotFound from '../components/global/NotFound'
import { createCategory, deleteCategory, updateCategory } from '../redux/actions/categoryAction'
import { FormSubmit, RootStore } from '../utils/TypeScript'
import {ICategory} from '../utils/TypeScript'

const Category = () => {
    const [name, setName] = useState('')
    const [edit, setEdit] = useState<ICategory | null>(null)
    const dispatch = useDispatch()
    const {auth, categories} = useSelector((state: RootStore) => state)

    useEffect(() => {
        if(edit) setName(edit.name)
    }, [edit])

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        if(!auth.access_token || !name) return

        if(edit) {
            if(edit.name === name) return
            const data = {...edit, name}
            dispatch(updateCategory(data, auth.access_token))
        } else {
            dispatch(createCategory(name, auth.access_token))
        }
        setName('')
        setEdit(null)
    }

    const handleDelete = (id: string) => {
        if(!auth.access_token) return
        dispatch(deleteCategory(id, auth.access_token))
    }

    if(auth.user?.role !== 'admin') return <NotFound />
    return (
        <div className="category row">
            <form className="col-md-6" onSubmit={handleSubmit}>
                <label htmlFor="category"> Category </label>
                <div className="d-flex align-items-center">
                    {
                        edit && <i className="fas fa-times mx-2" onClick={() => setEdit(null)} 
                            style={{cursor: 'pointer'}}
                        />
                    }
                    <input type="text" name="category" id="category" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button type="submit"> {edit ? 'Update' : 'Create'} </button>
                </div>
            </form>
            <div className="col-md-6">
                {
                    categories.map((category: ICategory) => (
                        <div className="category_row" key={category._id}>
                            <p className="m-0 text-capitilaze">{category.name}</p>
                            <div>
                                <i className="fas fa-edit mx-2" onClick={() => setEdit(category)}></i>
                                <i className="fas fa-trash-alt" onClick={() => handleDelete(category._id)}></i>
                            </div>
                        </div>
                    ))
                }
               
            </div>
        </div>
    )
}

export default Category
