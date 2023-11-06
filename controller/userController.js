const db = require('./connection');
const helper = require('../config/helper');
const config = require('../config');
const auth = require('../middleware/auth')

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM products LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function login(req){

  const { username, password } = req.body
  const rows = await db.query(
    `SELECT session 
      FROM users 
        WHERE username = '${username}' and password = '${password}'`
  );
  
  const data = helper.emptyOrRows(rows);
  if(data.length) {

    await db.query(
      `UPDATE users SET session = 'Active'
          WHERE username = '${username}' and password = '${password}'`);

    return (await auth.signIn(req));
  }
  else
    return {status: 401, message: 'Entered user name or password is incorrect'}
  
}

async function refreshToken(req){

  return (await auth.refresh(req));
  
}

async function logout(req){

  const res = await auth.logout(req);

  if(res.status === 200) {
    await db.query(
      `UPDATE users SET session = 'InActive'
          WHERE username = '${res.payload.username}'`);
  }

  return res;
  
}

module.exports = {
  getMultiple,
  login,
  logout,
  refreshToken
}