
const router = require("express").Router();
const cornershop = require("../controllers/cornershop")


router.route("/")
   .post(cornershop.call)
   .put(cornershop.call)

router.route("/call")
   .post(cornershop.call)

router.route("/answer")
   .post(cornershop.answer)

router.route("/events")
   .post(cornershop.events)


   module.exports = router;