const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: './service-account.json',
    projectId: 'diabetes-215513'
})

exports.readTextfromImg = function (req, res) {
    const request = {
        image: {
            content: req.body.img
        }
    }
    client
        .textDetection(request)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}