const router = require("express").Router();
const retrieveToken = require("../controllers/token");


router.route("/")
    .post(retrieveToken.getToken)

module.exports = router