const router = require("express").Router();
const retrieve = require("../controllers/retrieveRecording");


router.route("/")
    .post(retrieve.recording)

router.route("/file")
    .get(retrieve.recordingDownload)
router.route("/file/:id")
    .get(retrieve.recordingDownload)


module.exports = router