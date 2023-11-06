const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.post('/login', async function(req, res, next) {
  try {
    const {token, meta, status, message} = await controller.login(req);
    if(status === 200){

      res.cookie('token', token, meta)
      res.status(200).json({status, message}).end()
    } else {

      res.status(status).json({status, message}).end()
    }
  } catch (err) {

    console.error(`Error while login `, err.message);
    next(err);
  }
});


router.post('/refresh', async function(req, res, next) {
  try {
    const {status, message, newToken, meta} = await controller.refreshToken(req);

    if(status === 200)
      res.cookie('token', newToken, meta)

    res.status(status).json({status, message}).end()

  } catch (err) {
    console.error(`Error while refresh the token `, err.message);
    next(err);
  }
});


router.post('/logout', async function(req, res, next) {
  try {
    const { status, data, message } = await controller.logout(req);
    
    if(data)
      res.cookie('token', data.token, data.meta)
    res.status(status).json({status, message}).end()
  } catch (err) {
    console.error(`Error while logout `, err.message);
    next(err);
  }
});

module.exports = router;