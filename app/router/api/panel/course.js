const { Router } = require("express");
const router = Router();
const courseValidator = require("app/validator/course");
const courseController = require(`${process.env.API}/course`);
const upload = require("app/http/middleware/uploadImage");
router.post("/insertCourse", upload.single("img"), courseValidator.insert(), courseController.insertCourse)
router.get("/all", courseController.courses)
router.put("/:id", upload.single("img"), courseController.updateCourse);
router.get("/:id", courseController.findCourse);
router.delete("/:id", courseController.removeCourse);
//-------------------------------------------------------
router.post("/chapter/:id", courseValidator.insertChapter(), courseController.insertChapter);
router.get("/chapter/:id", courseController.findChapter);
router.get("/chapters/:id", courseController.chapters);
router.delete("/chapter/:id", courseController.removeChapter);
router.put("/chapter/:id", courseController.updateChapter);
//------------------------------------------------------
router.post("/episode/:id", courseValidator.insertEpisode(), courseController.insertEpisode);
router.get("/episode/:id", courseController.findEpisode);
router.get("/episodes/:id", courseController.episodes);
router.put("/episode/:id", courseController.updateEpisode);
router.delete("/episode/:id", courseController.removeEpisode);

module.exports = router;