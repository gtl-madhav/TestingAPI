const express = require('express')
const router = express.Router()
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

router.post('/upload', async (req, res) => {
    try {
        //Test
        //   console.log(req.body.bucketName)
        //   console.log(req.body.filename)   
          
        //   const results = await storage.getBuckets();
          
        //     const [buckets] = results;
          
        //     console.log('Buckets:');
        //     buckets.forEach((bucket) => {
        //       console.log(bucket.name);
        //     });

        await storage.bucket(req.body.bucketName).upload(req.body.filename, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
              // Enable long-lived HTTP caching headers
              // Use only if the contents of the file will never change
              // (If the contents will change, use cacheControl: 'no-cache')
              cacheControl: 'public, max-age=31536000',
            },
          });
        
          console.log(`${req.body.filename} uploaded to ${req.body.bucketName}.`);
        res.status(200).json("OK");
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        res.status(200).json("Get API");
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router