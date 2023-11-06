const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { isAuthorized } = require('../middleware/auth');
const {fetch, insert, uploadFile} = require('../middleware/validation')

router.post('/', isAuthorized, fetch, async function(req, res, next) {
  try {
    const {data, meta, status, message} = await controller.fetch(req.body);
    
    res.status(status).json({data, meta, status, message}).end()
  } catch (err) {

    console.error(`Error while getting products `, err.message);
    next(err);
  }
});


router.post('/create', isAuthorized, insert, async function(req, res, next) {
  try {
    const {status, message, code} = await controller.insert(req.body);

    res.status(status).json({status, message, code}).end()

  } catch (err) {
    console.error(`Error while inserting products `, err.message);
    next(err);
  }
});


router.post('/upload', isAuthorized, upload.single('file'), uploadFile, async function(req, res, next) {
  try {
    res.json(await controller.upload(JSON.parse(req.body.payload), req.file));
  } catch (err) {
    console.error(`Error while uploading the images `, err.message);
    next(err);
  }
});

module.exports = router;