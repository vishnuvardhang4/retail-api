const db = require('./connection');
const helper = require('../config/helper');
const config = require('../config');
const path = require("path");
const fs = require("fs");
const fsPromises = require('fs').promises; 
const { v4: uuidv4 } = require('uuid');

async function fetch(payload){

  const {page = 1, order, name, capacity, brand, material, color, price, type} = payload;

  const offset = helper.getOffset(page, config.listPerPage);
  let where = 'WHERE 1 = 1', orderBy = '';

  if(name && name.length > 0) {
    where += ` AND p.name IN ('${name.join("','")}')`
  }

  if(capacity && capacity.length > 0) {
    where += ` AND v.capacity IN ('${capacity.join(",")}')`
  }

  if(brand && brand.length > 0) {
    where += ` AND v.brand IN ('${brand.join("','")}')`
  }

  if(material && material.length > 0) {
    where += ` AND v.material IN ('${material.join("','")}')`
  }

  if(color && color.length > 0) {
    where += ` AND v.color IN ('${color.join("','")}')`
  }

  if(price && price.length > 0) {
    where += ` AND v.price IN ('${price.join(",")}')`
  }

  if(type && type.length > 0) {
    where += ` AND v.type IN ('${type.join("','")}')`
  }
  
  if(order){
    const {column = 'id', action = 'ASC'} = order;
    orderBy = `ORDER BY ${column + ' ' + action}`;
  }


  const query = `SELECT p.name, v.*, GROUP_CONCAT(DISTINCT CONCAT(i.path, '$' , IFNULL(i.alt, ' ')) ORDER BY i.order ASC SEPARATOR ',') AS images
  FROM retail.products p
    INNER JOIN retail.variants v ON v.pid = p.id
    LEFT JOIN retail.images i ON i.vid = v.id
  ${where}
  GROUP BY p.name, v.id 
  ${orderBy}
  LIMIT ${offset},${config.listPerPage}`;

  const rows = await db.query(query);

  const data = helper.emptyOrRows(rows)

  
  data.map((row) => {

    if(row.images) {

      row.images = row.images.split(',').map((img) => {

        let data
        if(img) {
          const split = img.split('$');
          data = {
            path: split[0],
            alt: split[1]
          }
        }
        else
          data = {}
        
        return data
      });
    } else {
      row.images = []
    }
    return row
  });

  return {
    data,
    meta: {page},
    status: data.length ? 200 : 204,
    message:  data.length ? 'success' : 'no data found'
  }
}

let insert = async ({record}) => { 

    try {
      const {products, variants} = record;

      const rows = helper.emptyOrRows(await db.query(`SELECT id from products WHERE name = '${products.name}'`));
      const product = `INSERT INTO products (name) VALUES ('${products.name}')`;
      let p_id;
      if(rows.length === 0) {
        const p_res = await db.query(product);
        p_id = p_res.insertId
      } else {
        p_id = rows[0].id
      }
      
      const variant = `INSERT INTO variants (pid, capacity, unit, brand, material, color, price, description, type) 
                        VALUES ('${p_id}',
                        '${variants.capacity}',
                        '${variants.unit}',
                        '${variants.brand}',
                        '${variants.material}',
                        '${variants.color}',
                        '${variants.price}',
                        '${variants.description}',
                        '${variants.type}')`;
      
      await db.query(variant);

      return { status: 201, message: 'success' };
    } catch (err) {
      console.error({err});

      return { status: 400, message: err.message, code: err.code, record };
    }
};


let upload = async (payload, file) => { 

  try {
    const {vid, alt='alt', order} = payload;

    const rows = helper.emptyOrRows(await db.query(`SELECT id from variants WHERE id = '${vid}'`));

    if(rows.length === 0) {
      return {status: 404, message: 'invalid variant'}
    } else {
      const tempPath = file.path;
      const targetPath = path.join(__dirname, "../storage/"+ uuidv4() +"." + file.originalname.split('.')[1]);

      if (path.extname(file.originalname).toLowerCase() === ".png") {
        try{
          fsPromises.rename(tempPath, targetPath);
        } catch(err){
          return {status: 500, massage: "Oops! Something went wrong!"};
        }
        let query = `INSERT INTO images (vid, path, \`order\`, alt) VALUES (${vid}, '${targetPath}', ${order}, '${alt}')`;
        
        await db.query(query);        

        return {status: 200, massage: "File uploaded!"};
      } else {
        
        fs.unlink(tempPath, err => {
          if (err) return {status: 500, massage: "Oops! Something went wrong!"};

          return {status: 403, massage: "Only .png files are allowed!"}
        });
      }
    }
    return {status: 404, massage: "Oops! Something went wrong!"};

  } catch (err) {
    console.error({err});

    return { status: 400, message: err.message, code: err.code };
  }
};

module.exports = {
  fetch,
  insert,
  upload
}