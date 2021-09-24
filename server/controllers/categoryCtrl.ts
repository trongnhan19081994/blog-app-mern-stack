import { Request, Response } from 'express'
import Categories from '../models/categoryModel'
import {IReqAuth} from '../config/interface'

const categoryCtrl = {
    createCategory: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({msg: 'Invalid Authencation.'})
        if(req.user.role !== 'admin') return res.status(400).json({msg: 'Invalid Authencation.'})
        try {
            const name = req.body.name.toLowerCase()
            const newCategory = new Categories({name})
            await newCategory.save()
            res.json({newCategory, msg: 'Create Success.'})
        } catch (error: any) {
            let errMsg
            if(error.code === 11000){
                errMsg = Object.values(error.keyValue)[0] + ' already exists.'
            } else {
                let name = Object.keys(error.errors)[0]
                errMsg = error.errors[`${name}`].message
            }
            
            return res.status(500).json({msg: errMsg})
        }
    },
    getCategories: async (req: IReqAuth, res: Response) => {
        try {
            const categories = await Categories.find().sort("-createdAt")
            res.json({categories})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateCategory: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({msg: 'Invalid Authencation.'})
        if(req.user.role !== 'admin') return res.status(400).json({msg: 'Invalid Authencation.'})
        try {
            await Categories.findOneAndUpdate({
                _id: req.params.id
            }, {
                name: req.body.name
            })
           res.json({msg: 'Update Success.'})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteCategory: async (req: IReqAuth, res: Response) => {
        if(!req.user) return res.status(400).json({msg: 'Invalid Authencation.'})
        if(req.user.role !== 'admin') return res.status(400).json({msg: 'Invalid Authencation.'})
        try {
           await Categories.findByIdAndDelete(req.params.id)
           res.json({msg: 'Delete Success.'})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },
}
export default categoryCtrl