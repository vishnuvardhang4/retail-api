const path = require("path");

const fetch = (req, res, next) => {

  let errorMessage = [];

    const { name, capacity, brand, material, color, price, type} = req.body;

    if(name && name !== null && !Array.isArray(name)) {
      errorMessage.push("name should be a array format");
    }

    if(capacity && capacity !== null && !Array.isArray(capacity)) {
      errorMessage.push("capacity should be a array format");
    }

    if(brand && brand !== null && !Array.isArray(brand)) {
      errorMessage.push("brand should be a array format");
    }

    if(material && material !== null && !Array.isArray(material)) {
      errorMessage.push("material should be a array format");
    }

    if(color && color !== null && !Array.isArray(color)) {
      errorMessage.push("color should be a array format");
    }

    if(price && price !== null && !Array.isArray(price)) {
      errorMessage.push("price should be a array format");
    }

    if(type && type !== null && !Array.isArray(type)) {
      errorMessage.push("type should be a array format");
    }
    
    // send error
    if (errorMessage.length) {
      res.status(400).json({ message: "validation failed", errorMessage });
    }

    next();
  };

  const insert = (req, res, next) => {
    let errorMessage = [];
    const format = {
      "record": {
              "products": {
                  "name": "mobile2"
              },
              "variants": {
                  "capacity": "128",
                  "unit": "gb",
                  "brand": "samsung",
                  "material": "glass",
                  "color": "red",
                  "price": "35200",
                  "description": "sd870 mobile",
                  "type": "android"
              }
          }
    }

    const { record } = req.body;

    if(!record){
      errorMessage.push("Please verify the payload data");
    }

    const { products, variants } = record;

    if(!products || !variants ){
      errorMessage.push("Please verify the payload data");
    }

    if(!products.name || products.name === null || products.name === '') {
      errorMessage.push("product.name is required");
    }

    const { capacity, unit, brand, material, color, price, type } = variants;
    
    if(!type || type === null || type === '') {
      errorMessage.push("type is required");
    }
    
    if(!price || price === null || price === '') {
      errorMessage.push("price is required");
    }
    
    if(!color || color === null || color === '') {
      errorMessage.push("color is required");
    }
    
    if(!capacity || capacity === null || capacity === '') {
      errorMessage.push("capacity is required");
    }
    
    if(!unit || unit === null || unit === '') {
      errorMessage.push("unit is required");
    }
    
    if(!brand || brand === null || brand === '') {
      errorMessage.push("brand is required");
    }
    
    if(!material || material === null || material === '') {
      errorMessage.push("material is required");
    }

    // send error
    if (errorMessage.length) {
      res.status(400).json({ message: "validation failed", errorMessage, format: format });
    }

    next();
  };

  const uploadFile = (req, res, next) => {

    let errorMessage = [];
    const {vid, alt='alt', order}  = JSON.parse(req.body.payload);

    if(!vid || vid === 0) {
      errorMessage.push("vid should be greater than 0");
    }

    if(!alt || alt === '') {
      errorMessage.push("alt is required");
    }

    if(!order || order === 0) {
      errorMessage.push("order should be greater than 0");
    }

    if(!req.file){
      errorMessage.push("Please povide the file");
    }

    if(path.extname(req.file.originalname).toLowerCase() !== ".png"){
      errorMessage.push("Only .png files are allowed!");
    }

    // send error
    if (errorMessage.length) {
      res.status(400).json({ message: "validation failed", errorMessage });
    }

    next();
  }
  
  module.exports = {
    fetch,
    insert,
    uploadFile
  };