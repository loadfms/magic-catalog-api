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
        this.s3.putObject({
            Bucket: this.s3bucket,
            Key: filename,
            Body: data,
            ACL: 'public-read', // your permisions  
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
        router.delete('/api/upload/:id', (req, res) => {
            this.delete(req.params.id, (err) => {
                if (err != undefined) return res.status(400).send(err);
                else res.send('File deleted from S3');
            })
        })
        router.post('/api/upload', this.multerupload.single('imagedata'), (req, res) => {
            this.upload(req.file.originalname, req.file.buffer, (err) => {
                if (err != undefined) return res.status(400).send(err);
                else res.send('File uploaded to S3');
            })
        })
    }
}