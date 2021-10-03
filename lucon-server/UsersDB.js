const { MongoClient } = require('mongodb');
require('dotenv').config();
var encrypt = require("crypto-js/sha256");
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

function storeUserInfo (uname, pass, confPass){
    // TODO: secure strings
    return new Promise((resolve,reject)=>{
        if(pass!=confPass) reject({type: "error", "data": {"errmsg": "Passwords don't match"}});
        else{ 
            client.connect(conn => {
                const collection = client.db("UsersDATA").collection("LoginDATA");
                collection.findOne({
                    "Name":uname
                },(err,doc)=>{
                    if(err){ client.close(); reject(err); }
                    else if(doc!=null){ client.close(); reject({type: "error", "data": {"errmsg": "User already exist"}}); }
                    else{
                    	collection.insertOne({
		            "Name":uname,
		            "Password":encrypt(pass)
		        },(err,res)=>{
		            if(err){ client.close(); reject(err); }
		            else { client.close(); resolve({type: "success", "data": {"uname": uname}}); }
		        });
                    }
                });
            });
        }
    });
}

function authenticate(uname, pass){
    // TODO: secure strings
    return new Promise((resolve,reject)=>{
        client.connect(async conn => {
            const collection = client.db("UsersDATA").collection("LoginDATA");
            await collection.findOne({
                "Name":uname,
                "Password":encrypt(pass)
            },(err,doc)=>{
                if(err){ client.close(); reject(err); }
                else if(doc===null){ client.close(); reject({type: "error", "data": {"errmsg": "User not Found"}}); }
                else { client.close(); resolve({type: "success", "data": {"uname": uname}}); }
            });
        });
    });
}

module.exports.storeUserInfo = storeUserInfo;
module.exports.authenticate = authenticate;
