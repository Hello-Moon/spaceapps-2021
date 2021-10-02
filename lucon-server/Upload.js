const {google} = require('googleapis');
const fs = require('fs');
const path = require('path');
var Readable = require('stream').Readable;
require('dotenv').config();

const CLIENT_ID = process.env.client_ID;
const CLIENT_SECRET = process.env.client_secret;
const CLEINT_REDIRECT = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH;

const oauth2client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,CLEINT_REDIRECT);
oauth2client.setCredentials({refresh_token:REFRESH_TOKEN});
const drive = google.drive({version:'v3',auth:oauth2client});

function bufferToStream(buffer) { 
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

async function PublicURL(fileID) {
    await drive.permissions.create({
        fileId: fileID,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
    });
    const result = await drive.files.get({
        fileId: fileID,
        fields: 'webViewLink, webContentLink',
    });
    return result.data;
 }

function Upload(file){
    return new Promise(async (resolve,reject)=>{
        try{
            const response = await drive.files.create({
                requestBody:{
                    name:file.name,
                    mimeType:file.mimetype
                },
                media:{
                    mimeType:file.mimetype,
                    body:bufferToStream(file.data)
                }
            });
            await PublicURL(response.data.id).then(arg=>resolve(arg)).catch(err=>reject(err.message));
        }catch(err){ reject(err.message); }
    });
}

module.exports.Upload=Upload;

