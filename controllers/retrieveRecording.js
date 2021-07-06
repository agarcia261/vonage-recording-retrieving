const axios =require("axios")
const fs = require('fs');
const ProgressBar = require('progress')

module.exports = {


    recording: (req, res) => {

        const config = {
            headers: {
                Authorization: `Bearer ${req.body.token}`,
        
             },
            method: 'get',
            url: req.body.url,
            responseType: 'stream'
        };
        axios(config)
            .then(function (response){

                const totalLength = response.headers['content-length']

                console.log('Starting download')
                const progressBar = new ProgressBar('-> downloading [:bar] :percent :etas', {
                    width: 40,
                    complete: '=',
                    incomplete: ' ',
                    renderThrottle: 1,
                    total: parseInt(totalLength)
                    })

                    response.data.pipe(fs.createWriteStream(`./public/${req.body.name}.mp3`))

                    response.data.on('data', (chunk) => {
                        progressBar.tick(chunk.length)
                    //    console.log("% complted",(progressBar.curr/totalLength)*100)
                       if ((progressBar.curr/totalLength)*100 == 100){
                           console.log("Download Completed")
                        const file = {
                            path:`${__dirname}/${req.body.name}.mp3`,
                            name:req.body.name
                        };
                           res.send(file)
                       }
                      })

            })

            
    },

    recordingDownload: (req, res) => {
        let result = []

        fs.readdir('./public', (err, files) => {
            files.forEach(file => {

                let pattern = /^[a-zA-Z]+\.MP3$/i
                let find = file.match(pattern)
                if (find){
                    result.push(find[0])
                }

            });
            res.send(result)


        });


    }

}