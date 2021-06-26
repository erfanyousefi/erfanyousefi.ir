const blogModel = require("app/models/blog");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class blogController extends controller {

    async blogs(req, res, next) {
        const blogs = await blogModel.find({}).populate(["author", "tags", "category"])
        return res.json({
            status: true,
            blogs
        })
    }
    async lastBlogs(req, res, next) {
        const blogs = await blogModel.find({}, {}, { sort: { 'createdAt': -1 } }).limit(3).populate(["author", "tags", "category"])
        return res.json({
            status: true,
            blogs
        })
    }
    async findBlog(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findById(id).populate(["author", "tags", "category"]);
            return res.json({
                status: true,
                blog
            })
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async slugBlog(req, res, next) {
            let slug = new RegExp(this.xssAttak(req.params.slug), "gi");
            if (slug) {
                const blog = await blogModel.findOne({ slug }).populate(["author", "tags", "category"])
                return res.json({
                    status: true,
                    blog
                })
            } else {
                return res.json({
                    status: false,
                    message: "Not-Found"
                })

            }
        }
        //---------------------------------------------
    async findChapter(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findOne({ 'chapters._id': id });
            if (blog) {
                const chapter = blog.chapters.find(chapter => chapter._id == id)
                return res.json({
                    status: true,
                    chapter
                })
            } else {
                return res.json({
                    status: true,
                    message: "فصلی یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async chapters(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findById(id);
            if (blog) {
                const chapters = blog.chapters
                return res.json({
                    status: true,
                    chapters
                })
            } else {
                return res.json({
                    status: false,
                    message: "مقاله ای یافت نشد"
                })
            }

        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }

    //--------------------------------------------------

    async lessons(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findOne({ 'chapters._id': id });
            if (blog) {
                const chapter = blog.chapters.find(chapter => chapter._id == id)
                const lessons = chapter.lessons
                return res.json({
                    status: true,
                    lessons
                })
            } else {
                return res.json({
                    status: false,
                    message: "مقاله ای یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async findLesson(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findOne({ 'chapters.lessons._id': id });
            if (blog) {
                blog.chapters.find(chapter => {
                    chapter.lessons.forEach(lesson => {
                        if (lesson._id == id) {
                            return res.json({
                                status: true,
                                lesson
                            })
                        }

                    })
                })
            } else {
                return res.json({
                    status: false,
                    message: "مقاله ای یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async findLessonWithSlug(req, res, next) {
        const slug = req.params.slug;
        if (slug) {
            const blog = await blogModel.findOne({ 'chapters.lessons.slug': slug });
            if (blog) {
                blog.chapters.find(chapter => {
                    chapter.lessons.forEach(lesson => {
                        if (lesson.slug == slug) {
                            return res.json({
                                status: true,
                                lesson,
                                blog
                            })
                        }

                    })
                })
            } else {
                return res.json({
                    status: false,
                    message: "درسی یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
}

module.exports = new blogController();