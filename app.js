const express = require('express'); // express import from node_modules
const Datastore = require('nedb'); // Database import from node_modules
const db = new Datastore(); // Database setup
const chalk = require('chalk'); // chalk import from node_modules
const app = express(); // 
const log = console.log; // setting console.log to log
const bodyParser = require('body-parser'); // Body Parser for data in http requests

// add body parser to app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// serve static files through express
app.use(express.static(__dirname + '/public'));

//function to build product
let productBuilder = (productName, productDescription, productPrice) => {
    // use JSON to outline product
    let product =  { 
        name : productName,
        description : productDescription,
        price : productPrice
    };
    // return the product
    return product;
};

// CREATE - RESTful POST
app.post(`/product/create`, (req, res) => {

    // pretty logging with Chalk!
    log(chalk.green.bold(`\nCREATE\n`));

    // use the product building function to make a product object
    let product = productBuilder(req.body.name, req.body.description, req.body.price);

    // insert into Database with 'insert'
    db.insert(product, (err, product) => {

        // if error, send a response containing the error message
        if (err) res.send(err);

        // send a response with HTTP status 201 (CREATED)
        res.status(201).send(product);

        // log the product to the console
        log(`Created a new product:\n`);
        log(product);

    });

});

// READ (all) - RESTful GET
app.get('/product/read', (req,res) => {

    // pretty logging with Chalk!
    log(chalk.blue.bold(`\nREAD`) + chalk.blue.dim(` (all)\n`));

    // query the Database with 'nothing' to get all data
    db.find({}, (err, products) => {

        // if error, send a response containing the error message
        if (err) res.send(err);
        
        // otherwise we send HTTP status of 200 (OK)
        res.status(200).send(products);

        // log the data to console
        log(`Reading all products:\n`);
        log(products);

    });

});

// READ (one) - RESTful GET
app.get('/product/read/:id', (req,res) => {

    // pretty logging with Chalk!
    log(chalk.blue.bold(`\nREAD`) + chalk.blue.dim(` (one)\n`));

    // getting the product id from the URL as a parameter
    let prodId = req.params.id;

    // query the Database '_id:' to get the product
    db.find({_id: prodId}, (err, product) => {

        // if error, send a response containing the error message
        if (err) res.send(err);
        
        // otherwise we send HTTP status of 200 (OK) and send product back
        res.status(200).send(product);

        // log the data to console
        log(`Reading product by id: ${prodId}`);
        log(product);

    });

});

// UPDATE - RESTful PUT
app.put('/product/update/:id', (req,res) => {

    // pretty logging with Chalk!
    log(chalk.yellow.bold(`\nUPDATE\n`));

    // getting the product id from the URL as a parameter
    let prodId = req.params.id;

    let updatedProd = {
        // get ID from URL as parameter
        _id : prodId,
        // get the name (key) from the body (data) of the http request
        name : req.body.name, 
        description : req.body.description,
        price : req.body.price
    };

    // query the Database '_id:' to get the product
    db.update({_id: prodId}, updatedProd, (err, product) => {

        // if error, send a response containing the error message
        if (err) res.send(err);
        
        // otherwise we send HTTP status of 202 (ACCEPTED) and the updated product back
        res.status(202).send(updatedProd);

        // log the data to console
        log(`Updated product by id:  ${prodId}`);
        log(updatedProd);

    });

});

// DELETE - RESTful DELETE
app.delete('/product/delete/:id', (req,res) => {

    // pretty logging with Chalk!
    log(chalk.red.bold(`\nDELETE\n`));

    // getting the product id from the URL as a parameter
    let prodId = req.params.id;

    // remove from the Database by '_id:' to get the product
    db.remove({_id: prodId}, (err, product) => {

        // if error, send a response containing the error message
        if (err) res.send(err);
        
        // otherwise we send HTTP status of 204 (NO CONTENT)
        res.status(202).send(`Deleted product by id: ${prodId}`);

        // console log that we are deleting the products
        log(`Deleted product by id: ${prodId}`);

    });

});

module.exports = {app, productBuilder};
