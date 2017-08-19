import multer from 'multer';
import AWS from 'aws-sdk';

export class S3Uploader {
    constructor(router) {
        this.s3 = new AWS.S3();
        this.s3bucket = 'vali-brasil';
        this.multerupload = multer({
            storage: multer.memoryStorage(),
            limits: { fileSize: 52428800 },
        });

        this.register(router);
        this.upload = this.upload.bind(this);
    }
    upload(filename, data, callback) {
        var buf = new Buffer(data.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64');
        
        this.s3.putObject({
            Bucket: this.s3bucket,
            Key: data.filename,
            Body: buf,
            ACL: 'public-read', // your permisions  
            ContentEncoding: 'base64',
            ContentType: data.filetype
        }, (err) => {
            callback(err);
        })
    }
    delete(imagename, callback) {
        this.s3.deleteObject({
            Bucket: this.s3bucket,
            Key: imagename
        }, (err) => {
            callback(err)
        })
    }
    register(router) {
        router.delete('/api/:app/upload/:id', (req, res) => {
            this.delete(req.params.id, (err) => {
                if (err != undefined) return res.status(400).send(err);
                else res.send('File deleted from S3');
            })
        })
        router.post('/api/:app/upload', (req, res) => {
            this.upload("fall.png", req.body, (err) => {
                if (err != undefined) return res.status(400).send(err);
                else res.json({uri: 'https://s3.amazonaws.com/vali-brasil/' + req.body.filename});
            })
        })
    }
}