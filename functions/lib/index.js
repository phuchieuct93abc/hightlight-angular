"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const vision = require("@google-cloud/vision");
exports.extractText = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Allow-Methods', 'GET, POST');
    quickstart(request.body).then(mes => {
        response.send({ text: mes });
    }).catch(error => {
        response.send(error);
    });
});
function quickstart(imagebase64) {
    return __awaiter(this, void 0, void 0, function* () {
        // Imports the Google Cloud client library
        // Creates a client
        const client = new vision.ImageAnnotatorClient();
        var buf = Buffer.from(imagebase64, 'base64');
        // Performs label detection on the image file
        const [result] = yield client.documentTextDetection(buf);
        return result.fullTextAnnotation.text;
    });
}
//# sourceMappingURL=index.js.map