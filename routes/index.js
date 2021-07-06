const router = require("express").Router();
const retrieveRecording = require("./retrieveRecording")
const getToken = require("./token")
const cornershop = require("./cornershop")




router.use("/api/retrieve", retrieveRecording);
router.use("/api/token", getToken);
router.use("/webhooks", cornershop)

module.exports = router