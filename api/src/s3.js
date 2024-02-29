const AWS = require("aws-sdk");
const dotenv = require("dotenv").config();
const fs=require("fs");


const awsbucketname=process.env.AWS_BUCKET_NAME;
const awsbucketregion=process.env.AWS_BUCKET_REGION;
const awsaccesskey=process.env.AWS_ACCESS_KEY;
const awssecretkey=process.env.AWS_SECRET_KEY;

const  s3=new AWS.S3({
    accessKeyId: awsaccesskey,
    secretAccessKey:awssecretkey,
    region:awsbucketregion
})

function uploadFile(file,filename)
{
    // const fileStream=fs.createReadStream(file.path)
    // const currentDate = new Date().toISOString();
    // const customizedDate = currentDate.replace(/:/g, "-");
      const params = {
        // ACL: "public-read-write",
        Body: file.buffer,
        Bucket: awsbucketname,
        Key: filename,
      };
     return s3.upload(params).promise();
}

exports.uploadFile=uploadFile;

function getFileStream(fileKey)
{
    const downloadParams={
        Key:fileKey,
        Bucket: awsbucketname
    }
    return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream=getFileStream;