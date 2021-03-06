import {Request, Response} from 'express'
import Blogs from '../models/blogModel'
import { IReqAuth } from '../config/interface'
import mongoose from 'mongoose'

const Pagination = (req: IReqAuth) => {
    let page = Number(req.query.page) * 1 || 1
    let limit = Number(req.query.limit) * 1 || 4
    let skip = (page - 1) * limit
    return { page, limit, skip }
}

const blogCtrl = {
    createBlog: async (req: IReqAuth, res: Response) => {
        //console.log(req.user, req.body)
        if(!req.user) return res.status(400).json({msg: 'Invalid Authentication.'})
        try {
            const {title, content, description, thumbnail, category } = req.body
            const newBlog = new Blogs({
                user: req.user._id,
                title: title.toLowerCase(),
                content,
                description, 
                thumbnail, 
                category
            })
            await newBlog.save()
            res.json({newBlog})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },

    getHomeBlogs: async (req: Request, res: Response) => {
        try {
            const blogs = await Blogs.aggregate([
                //User
                {
                    $lookup: {
                        from: 'users',
                        let: {user_id: '$user'},
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },  //chọn document mong muốn truy vấn.
                            { $project: {password: 0} } //chỉ định các field mong muốn truy vấn.
                        ],
                        as: "user"
                    }
                },
                //array -> object
                { $unwind: "$user" }, // thực hiện thao tác mở rộng trên một mảng , tạo một ouput document cho mỗi giá trị trong mảng đó
                //Category
                {
                    $lookup: {
                        from: 'categories',
                        "localField": "category",
                        "foreignField": "_id",
                        "as": "category"
                    }
                },
                { $unwind: "$category" }, // thực hiện thao tác mở rộng trên một mảng , tạo một ouput document cho mỗi giá trị trong mảng đó
                //Sorting
                {
                    $sort: {"createdAt": -1}  //sắp xếp document
                },
                //Group by category
                {
                    $group: {
                        _id: "$category._id",
                        name: { $first: "$category.name" },
                        blogs: { $push: "$$ROOT" },
                        count: { $sum: 1 }
                    }
                },
                //Pagination for blogs
                {
                    $project: { //chỉ định các field mong muốn truy vấn.
                        blogs: {
                            $slice: ['$blogs', 0, 4]
                        },
                        count: 1,
                        name: 1,
                    }
                }

            ])
            res.json(blogs)
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },
    getBlogsByCategory: async (req: Request, res: Response) => {
        const {limit, skip} = Pagination(req)
        try {
            const Data = await Blogs.aggregate([
                {
                   $facet: {
                       totalData: [
                           {
                               $match: {category: mongoose.Types.ObjectId(req.params.id)}
                           },
                           //User
                            {
                                $lookup: {
                                    from: 'users',
                                    let: {user_id: '$user'},
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },  //chọn document mong muốn truy vấn.
                                        { $project: {password: 0} } //chỉ định các field mong muốn truy vấn.
                                    ],
                                    as: "user"
                                }
                            },
                            //array -> object
                            { $unwind: "$user" },
                            //Sorting
                            {
                                $sort: {"createdAt": -1}  //sắp xếp document
                            },
                            { $skip: skip },
                            { $limit: limit },
                       ],
                       totalCount: [
                        {
                            $match: {category: mongoose.Types.ObjectId(req.params.id)}
                        },
                        {
                            $count: 'count'
                        }
                       ]
                   } 
                },
                {
                    $project: {
                        count: { $arrayElemAt: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]) 
            const blogs = Data[0].totalData
            const count = Data[0].count

            //Pagination
            let total = 0
             if(count % limit === 0) {
                total = count / limit
             } else {
                 total = Math.floor(count / limit) + 1
             }
            res.json({blogs, total})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },
    getBlogsByUser: async (req: Request, res: Response) => {
        const {limit, skip} = Pagination(req)
        try {
            const Data = await Blogs.aggregate([
                {
                   $facet: {
                       totalData: [
                           {
                               $match: {user: mongoose.Types.ObjectId(req.params.id)}
                           },
                           //User
                            {
                                $lookup: {
                                    from: 'users',
                                    let: {user_id: '$user'},
                                    pipeline: [
                                        { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },  //chọn document mong muốn truy vấn.
                                        { $project: {password: 0} } //chỉ định các field mong muốn truy vấn.
                                    ],
                                    as: "user"
                                }
                            },
                            //array -> object
                            { $unwind: "$user" },
                            //Sorting
                            {
                                $sort: {"createdAt": -1}  //sắp xếp document
                            },
                            { $skip: skip },
                            { $limit: limit },
                       ],
                       totalCount: [
                        {
                            $match: {user: mongoose.Types.ObjectId(req.params.id)}
                        },
                        {
                            $count: 'count'
                        }
                       ]
                   } 
                },
                {
                    $project: {
                        count: { $arrayElemAt: ["$totalCount.count", 0] },
                        totalData: 1
                    }
                }
            ]) 
            const blogs = Data[0].totalData
            const count = Data[0].count

            //Pagination
            let total = 0
             if(count % limit === 0) {
                total = count / limit
             } else {
                 total = Math.floor(count / limit) + 1
             }
            res.json({blogs, total})
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    },
    getBlog: async (req: Request, res: Response) => {
        try {
            const blog = await Blogs.findOne({_id: req.params.id}).populate("user", "-password")
            if(!blog) return res.status(400).json({msg: 'Blog does not exist.'})
            return res.json(blog)
        } catch (error: any) {
            return res.status(500).json({msg: error.message})
        }
    }
}

export default blogCtrl