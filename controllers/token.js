const axios =require("axios")
const Nexmo = require("nexmo")

module.exports = {


    getToken: (req, res) => {
        const nexmo = new Nexmo({

            applicationId: req.body.appID,
            privateKey: req.body.privateKey,
        })
        const jwt = nexmo.generateJwt();
        res.send(jwt)

    }

}