const blogModel = require("app/models/blog");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class blogController extends controller {
    async insertBlog(req, res, next) {
        let image = ""
        if (req.file) {
            image = this.checkReqFile(req.file)
        }
        let result = await validationResult(req);
        if (!result.isEmpty()) {
            if (req.file) {
                this.removeFile(image)
            }
            validator = {}
            this.errorHandlerValidator(result.errors, validator);
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            let data = {};
            req.body.img = image
            this.fetchDataFromBody(req.body, data);
            data.author = req.user._id;
            blogModel.create({...data }).then(blog => {
                if (blog) {
                    return res.json({
                        status: true,
                        message: "افزودن مقاله  با موفقیت انجام شد"
                    })
                } else {
                    if (req.file) {
                        this.removeFile(image)
                    }
                    return res.json({
                        status: true,
                        message: "افزودن مقاله  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                }
            })
        }

    }
    async blogs(req, res, next) {
        const blogs = await blogModel.find({})
        return res.json({
            status: true,
            blogs
        })
    }
    async updateBlog(req, res, next) {
        let image = ""
        if (req.file) {
            image = this.checkReqFile(req.file)
        }
        const id = req.params.id;
        if (this.isObjectID(id)) {
            let data = {};
            this.fetchDataFromBody(req.body, data)
            data.img = image
            await blogModel.findByIdAndUpdate(id, { $set: {...data } }, (err, blog) => {
                if (blog) {
                    return res.json({
                        status: true,
                        message: "به روزرسانی با موفقیت انجام شد"
                    })
                } else {
                    if (req.file) {
                        this.removeFile(image)
                    }
                    return res.json({
                        status: false,
                        message: "به روز رسانی انجام نشد لطفا مجددا یا بعدا تلاش بفرمائید"
                    })
                }


            })
        } else {
            if (req.file) {
                this.removeFile(image)
            }
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async findBlog(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findById(id);
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
    async removeBlog(req, res, next) {
            const id = req.params.id;
            if (this.isObjectID(id)) {
                await blogModel.findByIdAndDelete(id, (err, blog) => {
                    if (blog) {
                        return res.json({
                            status: true,
                            message: "حدف مقاله  با موفقیت انجام شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "حذف مقاله  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    }
                });

            } else {
                return res.json({
                    status: false,
                    message: "Not-Found"
                })
            }
        }
        //**************************************** */
    async insertChapter(req, res, next) {
        const result = await validationResult(req);
        if (!result.isEmpty()) {
            validator = {}
            this.errorHandlerValidator(result.errors, validator)
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            const id = req.params.id;
            if (this.isObjectID(id)) {
                let data = {}
                this.fetchDataFromBody(req.body, data);
                const blog = await blogModel.findById(id);
                if (blog) {
                    blog.chapters.push({...data })
                    blog.save().then(blog => {
                        if (blog) {
                            return res.json({
                                status: true,
                                message: "افزودن فصل مقاله  با موفقیت انجام شد"
                            })
                        } else {
                            return res.json({
                                status: false,
                                message: "افزودن فصل انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                            })
                        }
                    }).catch(err => {
                        return res.json({
                            status: false,
                            err: err.message,
                            message: "افزودن فصل انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "مقاله  ای یافت نشد"
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
                    message: "مقاله  ای یافت نشد"
                })
            }

        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async updateChapter(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            let data = {};
            this.fetchDataFromBody(req.body, data)
            const blog = await blogModel.findOne({ 'chapters._id': id });
            if (blog) {
                const chapter = blog.chapters.find(chapter => chapter._id == id)
                chapter.title = data.title;
                blog.save().then(chapter => {
                    if (chapter) {
                        return res.json({
                            status: true,
                            message: "به روزرسانی با موفقیت انجام شد"
                        })
                    } else {
                        return res.json({
                            status: true,
                            message: "به روزرسانی انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"

                        })
                    }
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
    async removeChapter(req, res, next) {
            const id = req.params.id;
            if (this.isObjectID(id)) {
                const blog = await blogModel.findOne({ 'chapters._id': id });
                if (blog) {
                    const chapter = blog.chapters.find(chapter => chapter._id == id)
                    if (chapter.lessons.length > 0) {
                        return res.json({
                            status: false,
                            message: "این فصل دارای تعدادی بخش  میباشد و نمیتوان آن را حذف کرد لطفا ابتدا بخش  ها را حذف کنید"
                        })
                    } else {
                        blog.chapters = blog.chapters.filter(chapter => chapter._id != id)
                        blog.save().then(chapter => {
                            if (chapter) {
                                return res.json({
                                    status: true,
                                    message: "حذف با موفقیت انجام شد"
                                })
                            } else {
                                return res.json({
                                    status: true,
                                    message: "حذف انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"

                                })
                            }
                        })
                    }
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
        //--------------------------------------------------
    async insertLesson(req, res, next) {
        let image = ""
        if (req.file) {
            image = this.checkReqFile(req.file)
        }
        const result = await validationResult(req);
        if (!result.isEmpty()) {
            if (req.file) {
                this.removeFile(image)
            }
            validator = {}
            this.errorHandlerValidator(result.errors, validator)
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            const id = req.params.id;
            if (this.isObjectID(id)) {
                let data = {}
                req.body.img = image
                this.fetchDataFromBody(req.body, data);
                const blog = await blogModel.findOne({ 'chapters._id': id });
                if (blog) {
                    blog.chapters.forEach(chapter => chapter._id == id ? chapter.lessons.push({...data }) : chapter)
                    blog.save().then(blog => {
                        if (blog) {
                            return res.json({
                                status: true,
                                message: "افزودن بخش  مقاله  با موفقیت انجام شد"
                            })
                        } else {
                            return res.json({
                                status: false,
                                message: "افزودن بخش  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                            })
                        }
                    }).catch(err => {
                        return res.json({
                            status: false,
                            err: err.message,
                            message: "افزودن بخش  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "مقاله  ای یافت نشد"
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
    async Lessons(req, res, next) {
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
                    message: "مقاله  ای یافت نشد"
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
                    message: "مقاله  ای یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async updateLesson(req, res, next) {
        let image = "";
        if (req.file) {
            image = this.checkReqFile(req.file);
        }
        const id = req.params.id;
        if (this.isObjectID(id)) {
            req.body.img = image
            let data = {}
            this.fetchDataFromBody(req.body, data);
            const blog = await blogModel.findOne({ 'chapters.lessons._id': id });
            if (blog) {
                blog.chapters.forEach(chapter => {
                    chapter.lessons.forEach(lesson => {
                        if (lesson._id == id) {
                            Object.keys(data).forEach(key => {
                                lesson[key] = data[key]
                            })
                        }
                    })
                })
                blog.save().then(blog => {
                    if (blog) {
                        return res.json({
                            status: true,
                            message: "به روزرسانی بخش  با موفقیت انجام شد"
                        })
                    } else {
                        if (req.file) {
                            this.removeFile(image)
                        }
                        return res.json({
                            status: false,
                            message: "به روزرسانی بخش  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    }
                }).catch(err => {
                    if (req.file) {
                        this.removeFile(image)
                    }
                    return res.json({
                        status: false,
                        err: err.message,
                        message: "به روزرسانی بخش  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                })
            } else {
                if (req.file) {
                    this.removeFile(image)
                }
                return res.json({
                    status: false,
                    message: "مقاله  ای یافت نشد"
                })
            }
        } else {
            if (req.file) {
                this.removeFile(image)
            }
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async removeLesson(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const blog = await blogModel.findOne({ 'chapters.lessons._id': id });
            if (blog) {
                blog.chapters.forEach(chapter => chapter.lessons = chapter.lessons.filter(lesson => lesson._id != id))
                blog.save().then(blog => {
                    if (blog) {
                        return res.json({
                            status: true,
                            message: "حذف بخش  با موفقیت انجام شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "حذف بخش  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    }
                }).catch(err => {
                    return res.json({
                        status: false,
                        err: err.message,
                        message: "حذف بخش  انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                })
            } else {
                return res.json({
                    status: false,
                    message: "مقاله  ای یافت نشد"
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