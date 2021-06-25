const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");

function getPath() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();
    return `public/uploads/${year}/${month}/${day}`;
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const directory = getPath()
        mkdirp(directory).then(dir => cb(null, directory))
    },
    filename: (req, file, cb) => {
        req.body.img = file.originalname;
        const newName = Date.now();
        const dir = getPath();
        if (!fs.existsSync(dir + "/" + file.originalname)) {
            cb(null, file.originalname)
        } else {
            cb(null, newName + "-" + file.originalname);
        }
    }
});

const imgStorage = multer({ storage })

module.exports = imgStorage;