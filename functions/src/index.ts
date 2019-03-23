import * as functions from 'firebase-functions';
import * as vision from '@google-cloud/vision';

export const extractText = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET, POST');
    quickstart(request.body).then(mes => {
        response.send({text:mes})
    }).catch(error => {
        response.send(error)
    })

});

async function quickstart(imagebase64: string) {
    // Imports the Google Cloud client library

    // Creates a client

    const client = new vision.ImageAnnotatorClient();
    var buf = Buffer.from(imagebase64, 'base64');
    // Performs label detection on the image file
    const [result] = await client.documentTextDetection(buf)

    return result.fullTextAnnotation.text;

}
