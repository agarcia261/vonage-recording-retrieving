const Vonage = require('@vonage/server-sdk');
require('dotenv').config();

const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APPLICATION_ID,
    privateKey: process.env.PRIVATE_KEY
  })
  

let uuid =  ""

module.exports = {

    call: (req, res) => {
        res.sendStatus(200)
        console.log("initiating call")
        const ncco = [
  
            {
                "action": "stream",
                "streamUrl": ["https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"]
            },            
            {
                "action": "connect",
                "eventUrl": ["https://360.ngrok.io/webhooks/answer"],
                "timeout": "45",
                "from": "13052787274",
                "endpoint": [
                    {
                    "type": "phone",
                    "number": "16464064328",
                    }
                ]
            },
            {
                "action": "conversation",
                "name": "cornershop",
                "record": "true",
                "endOnExit":"true"
            },
        
        ]
        
        vonage.calls.create({
            to: [{
              type: 'phone',
              number: 17862066429
            }],
            from: {
              type: 'phone',
              number: 13052787274
            },
            ncco: ncco
          }, (error, response) => {
            if (error) console.error(error)
            if (response) console.log(response)
          })

    },
    answer: (req, res) => {
        res.sendStatus(200)

        console.log("**************** Reaching answer URL ***************")
        console.log(req.body)


        const status= req.body.status

        if (status === "ringing"){
            uuid = req.body.uuid
            console.log("****** SAVING UUID:")
            console.log(uuid)
        }


        else if (status ==="answered"){
            console.log("THE CALL is answered *********")


        }

        else if (req.body.type ==="transfer"){
            console.log("REACHING TRANSFER *******************************")

            vonage.calls.stream.start(uuid, { stream_url: ["https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"], loop: 1 }, (err, res) => {
                if(err) { console.error(err); }
                else {
                    console.log(res);
                }
              });



        }

    },
    events: (req, res) => {
        res.sendStatus(200)

        console.log("######################  Reaching events   #######################")
        console.log(req.body)
        
    }

}