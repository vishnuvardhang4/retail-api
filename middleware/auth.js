const jwt = require('jsonwebtoken')
const jwtKey = 'my-32-character-ultra-secure-and-ultra-long-secret'
const jwtExpirySeconds = 300
const db = require('../controller/connection');
const helper = require('../config/helper');

const isSessionActive = async(username) => {
  const rows = await db.query(
    `SELECT session 
      FROM users 
        WHERE username = '${username}'`
  );
  
  const data = helper.emptyOrRows(rows);
  if(data.length)
    return true
  else
    return false
}

const isAuthorized  = async(req, res, next)=> {

  const token = req.cookies.token

  if (!token) {
    var err = new Error('invalid token');
    err.status = 401;
    return next(err);
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      var err = new Error('unauthorized user');
      err.status = 401;
      return next(err);
    }
    var err = new Error('token error');
    err.status = 400;
    return next(err);
  }

  if(payload.username === null || !(await isSessionActive(payload.username))) {
    var err = new Error('unauthorized user');
    err.status = 401;
    return next(err);
  }

  return next()

}

const signIn = (req) => {

  const { username } = req.body

  const token = jwt.sign({ username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  });

  const meta = { maxAge: jwtExpirySeconds * 1000 };
  
  return {token, meta, status: 200, message: 'success' };
}


const refresh = (req) => {

  const token = req.cookies.token

  if (!token) {
    return {status: 401, message: 'invalid token'}
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return {status: 401, message: 'unauthorized user'}
    }
    return {status: 400, message: 'token error'}
  }

  const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
  if (payload.exp - nowUnixSeconds > 50) {
    return {status: 200, message: 'you have time to refresh the token', newToken: token, meta: { maxAge: (payload.exp - nowUnixSeconds) * 1000 }}
  }

  const newToken = jwt.sign({ username: payload.username }, jwtKey, {
    algorithm: 'HS256',
    expiresIn: jwtExpirySeconds
  })

  return {status: 200, message: 'new token generated',newToken, meta: { maxAge: jwtExpirySeconds * 1000 }};
}

const logout = (req) => {
  const token = req.cookies.token

  if (!token) {
    return {status: 401, message: 'invalid token'}
  }

  var payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      return {status: 401, message: 'unauthorized user'}
    }
    return {status: 400, message: 'token error'}
  }

  const data = {token: '', meta: { maxAge: 0 }};
  return { payload, data, status: 200, message: `${payload.username} is logged out successfully!` }
}

module.exports = {
  signIn,
  refresh,
  logout,
  isAuthorized
}