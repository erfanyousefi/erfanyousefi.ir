const courseModel = require("app/models/course");
const userModel = require("app/models/user");
const controller = require("app/http/controller/controller");
const { validationResult } = require("express-validator");
let validator = {}
class courseController extends controller {

    async courses(req, res, next) {
        const courses = await courseModel.find({}).sort({ createdAt: -1 }).populate(["teacher", "tags", "category"])
        return res.json({
            status: true,
            courses
        })
    }
    async lastCourses(req, res, next) {
        const courses = await courseModel.find({}, {}, { sort: { 'createdAt': -1 } }).limit(3).populate(["teacher", "tags", "category"])
        return res.json({
            status: true,
            courses
        })
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
    async slugCourse(req, res, next) {
            let slug = new RegExp(this.xssAttak(req.params.slug), "gi");
            if (slug) {
                const course = await courseModel.findOne({ slug }).populate(["teacher", "tags", "category"])
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
        //---------------------------------------------
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

    //--------------------------------------------------

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
    async registerInCourse(req, res, next) {
        let token = this.xssAttak(req.body.token);
        let courseID = this.xssAttak(req.body.course);
        let user = await userModel.findOne({ token });
        if (user) {
            if (this.isObjectID(courseID)) {
                let course = await courseModel.findById(courseID)
                if (course) {
                    if (course.type === "free") {
                        if (user.courses.includes(courseID)) {
                            return res.json({
                                status: false,
                                message: "شما قبلا در این دوره ثبت نام کرده اید "
                            })
                        } else {
                            user.courses.push(courseID)
                            user.save().then(usr => {
                                if (usr) {
                                    course.students.push(user._id)
                                    course.save().then(() => {
                                        return res.json({
                                            status: true,
                                            message: "ثبت نام در دوره با موفقیت انجام شد"
                                        })
                                    });
                                } else {
                                    return res.json({
                                        status: false,
                                        message: "ثبت نام انجام نشد طفا بعدا یا مجددا تلاش  کنید"
                                    })
                                }
                            })
                        }
                    } else if (course.type === "cash") {
                        return res.json({
                            status: true,
                            message: "اتصال به درگاه پرداخت"
                        })
                    } else {
                        return res.json({
                            status: true,
                            message: "دوره در دسترس نمیباشد جهت کسب اطلاعات بیشتر در مورد دوره لطفا در بخش نظرات اقدام فرمائید"
                        })
                    }
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
                message: "کاربری یافت نشد لطفا وارد حساب کاربری خود شوید"
            })
        }
    }

}

module.exports = new courseController();