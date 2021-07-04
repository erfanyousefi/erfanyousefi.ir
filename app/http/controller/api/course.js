const courseModel = require("app/models/course");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class courseController extends controller {
    async insertCourse(req, res, next) {
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
            console.log(validator);
            return res.json({
                status: false,
                msg: {...validator }
            })
        } else {
            let data = {};
            req.body.img = image
            this.fetchDataFromBody(req.body, data);
            data.teacher = req.user._id
            data.price = Number(data.price)
            data.discount = Number(data.discount)
            if (isNaN(data.price)) {
                data.price = 0;
            }
            if (isNaN(data.discount)) {
                data.discount = 0
            }
            data.introduction = data.text.substr(0, 300);
            data.text = req.body.text
            courseModel.create({...data }).then(course => {
                if (course) {
                    return res.json({
                        status: true,
                        message: "افزودن دوره با موفقیت انجام شد"
                    })
                } else {
                    if (req.file) {
                        this.removeFile(image)
                    }
                    return res.json({
                        status: true,
                        message: "افزودن دوره انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                }
            })
        }

    }
    async courses(req, res, next) {
        const data = {}
        const courses = await courseModel.find({}).sort({ createdAt: -1 }).populate([{ path: "teacher", select: { name: 1, email: 1 } }])
        data.courses = courses;
        data.courses.forEach(course => {
            course.totalTime = this.getTime(course.chapters)
        })
        return res.json({
            status: true,
            courses: data.courses
        })
    }
    async updateCourse(req, res, next) {
        let image = ""
        let data = {};
        const id = req.params.id;
        if (this.isObjectID(id)) {
            this.fetchDataFromBody(req.body, data)
            if (req.file) {
                image = this.checkReqFile(req.file)
                data.img = image;
            }
            if (data.price) {
                data.price = Number(data.price)
                if (isNaN(data.price)) {
                    data.price = 0;
                }
            }
            if (data.discount) {
                data.discount = Number(data.discount)
                if (isNaN(data.discount)) {
                    data.discount = 0
                }
            }
            if (data.text) {
                data.introduction = data.text.substr(0, 300);
                data.text = req.body.text
            }
            await courseModel.findByIdAndUpdate(id, { $set: {...data } }, (err, course) => {
                if (course) {
                    return res.json({
                        status: true,
                        message: "به روزرسانی با موفقیت انجام شد"
                    })
                }
                if (req.file) {
                    this.removeFile(image)
                }
                return res.json({
                    status: false,
                    message: "به روز رسانی انجام نشد لطفا مجددا یا بعدا تلاش بفرمائید"
                })

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
    async findCourse(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const course = await courseModel.findById(id);
            return res.json({
                status: true,
                course
            })
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async removeCourse(req, res, next) {
            const id = req.params.id;
            if (this.isObjectID(id)) {
                await courseModel.findByIdAndDelete(id, (err, course) => {
                    if (course) {
                        return res.json({
                            status: true,
                            message: "حدف دوره با موفقیت انجام شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "حذف دوره انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
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
    async listTitleCourses(req, res, next) {
        let courses = await courseModel.find({}).sort({ createdAt: -1 }).select({ title: 1 })
        return res.json({
            status: true,
            courses
        })
    }
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
                const course = await courseModel.findById(id);
                if (course) {
                    course.chapters.push({...data })
                    course.save().then(course => {
                        if (course) {
                            return res.json({
                                status: true,
                                message: "افزودن فصل دوره با موفقیت انجام شد"
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
                        message: "دوره ای یافت نشد"
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
            const course = await courseModel.findOne({ 'chapters._id': id });
            if (course) {
                const chapter = course.chapters.find(chapter => chapter._id == id)
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
            const course = await courseModel.findById(id);
            if (course) {
                const chapters = course.chapters
                return res.json({
                    status: true,
                    chapters
                })
            } else {
                return res.json({
                    status: false,
                    message: "دوره ای یافت نشد"
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
            const course = await courseModel.findOne({ 'chapters._id': id });
            if (course) {
                const chapter = course.chapters.find(chapter => chapter._id == id)
                chapter.title = data.title;
                course.save().then(chapter => {
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
                const course = await courseModel.findOne({ 'chapters._id': id });
                if (course) {
                    const chapter = course.chapters.find(chapter => chapter._id == id)
                    if (chapter.episodes.length > 0) {
                        return res.json({
                            status: false,
                            message: "این فصل دارای تعدادی اپیزود میباشد و نمیتوان آن را حذف کرد لطفا ابتدا اپیزود ها را حذف کنید"
                        })
                    } else {
                        course.chapters = course.chapters.filter(chapter => chapter._id != id)
                        course.save().then(chapter => {
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
    async insertEpisode(req, res, next) {
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
                const course = await courseModel.findOne({ 'chapters._id': id });
                if (course) {
                    course.chapters.forEach(chapter => chapter._id == id ? chapter.episodes.push({...data }) : chapter)
                    course.save().then(course => {
                        if (course) {
                            return res.json({
                                status: true,
                                message: "افزودن اپیزود دوره با موفقیت انجام شد"
                            })
                        } else {
                            return res.json({
                                status: false,
                                message: "افزودن اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                            })
                        }
                    }).catch(err => {
                        return res.json({
                            status: false,
                            err: err.message,
                            message: "افزودن اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "دوره ای یافت نشد"
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
    async episodes(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const course = await courseModel.findOne({ 'chapters._id': id });
            if (course) {
                const chapter = course.chapters.find(chapter => chapter._id == id)
                const episodes = chapter.episodes
                return res.json({
                    status: true,
                    episodes
                })
            } else {
                return res.json({
                    status: false,
                    message: "دوره ای یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async findEpisode(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const course = await courseModel.findOne({ 'chapters.episodes._id': id });
            if (course) {
                course.chapters.find(chapter => {
                    chapter.episodes.forEach(episode => {
                        if (episode._id == id) {
                            return res.json({
                                status: true,
                                chapter: chapter._id,
                                course: course._id,
                                episode
                            })
                        }

                    })
                })
            } else {
                return res.json({
                    status: false,
                    message: "دوره ای یافت نشد"
                })
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })
        }
    }
    async updateEpisode(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            let data = {}
            this.fetchDataFromBody(req.body, data);
            if (data.chapter !== id) {
                const course = await courseModel.findOne({ 'chapters._id': data.chapter });
                if (course) {
                    course.chapters.forEach(chapter => chapter._id == data.chapter ? chapter.episodes.push({...data }) : chapter)
                    course.save().then(course => {
                        course.chapters.forEach(chapter => chapter.episodes = chapter.episodes.filter(episode => episode._id != id))
                        course.save().then(course => {
                            if (course) {
                                return res.json({
                                    status: true,
                                    message: "به روز رسانی اپیزود دوره با موفقیت انجام شد"
                                })
                            } else {
                                return res.json({
                                    status: false,
                                    message: "به روز رسانی اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                                })
                            }
                        })

                    })
                } else {
                    return res.json({
                        status: false,
                        message: "به روز رسانی اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                }
            } else {
                const course = await courseModel.findOne({ 'chapters.episodes._id': id });
                if (course) {
                    course.chapters.forEach(chapter => {
                        chapter.episodes.forEach(episode => {
                            if (episode._id == id) {
                                Object.keys(data).forEach(key => {
                                    episode[key] = data[key]
                                })
                            }
                        })
                    })
                    course.save().then(course => {
                        if (course) {
                            return res.json({
                                status: true,
                                message: "به روزرسانی اپیزود با موفقیت انجام شد"
                            })
                        } else {
                            return res.json({
                                status: false,
                                message: "به روزرسانی اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                            })
                        }
                    }).catch(err => {
                        return res.json({
                            status: false,
                            err: err.message,
                            message: "به روزرسانی اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    })
                } else {
                    return res.json({
                        status: false,
                        message: "دوره ای یافت نشد"
                    })
                }
            }
        } else {
            return res.json({
                status: false,
                message: "Not-Found"
            })

        }
    }
    async removeEpisode(req, res, next) {
        const id = req.params.id;
        if (this.isObjectID(id)) {
            const course = await courseModel.findOne({ 'chapters.episodes._id': id });
            if (course) {
                course.chapters.forEach(chapter => chapter.episodes = chapter.episodes.filter(episode => episode._id != id))
                course.save().then(course => {
                    if (course) {
                        return res.json({
                            status: true,
                            message: "حذف اپیزود با موفقیت انجام شد"
                        })
                    } else {
                        return res.json({
                            status: false,
                            message: "حذف اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                        })
                    }
                }).catch(err => {
                    return res.json({
                        status: false,
                        err: err.message,
                        message: "حذف اپیزود انجام نشد لطفا بعدا یا مجددا تلاش بفرمائید"
                    })
                })
            } else {
                return res.json({
                    status: false,
                    message: "دوره ای یافت نشد"
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

module.exports = new courseController();