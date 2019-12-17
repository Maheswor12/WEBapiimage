const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controller/fileController.js");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var multer  = require("multer");
var storage = multer.diskStorage(
    {
        destination: "./uploads/",
        filename: function ( req, file, cb ){
            cb( null, file.originalname );
        }
    }
);
//multer is used to upload the file
var upload = multer( { storage: storage } );

var swaggerJSDoc=require("swagger-jsdoc");//actual for documentation
var swaggerUI=require("swagger-ui-express");//for viewing documentation
var swaggerDefinition={
    info: {
        title:"Upload Image",
        version:"0.0.1",
        description:"This is assignment for single images and multiple image upload"
    },
    securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "authorization",
                scheme: "bearer",
                in: "header"
            }
        },
    host:process.env.DB_HOST+":"+process.env.APP_PORT,
    basePath:"/"
    
    };
    var swaggerOptions={
        swaggerDefinition,
        apis:["./index.js"]
    };  

    var swaggerSpecs=swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerSpecs));


// for single image upload
app.post("/registration",upload.single("photo"), userController.registerUser);
 
/**
 * @swagger
 * /registration:
 *  post:
 *   tags:
 *    - Image
 *   description: Upload single image
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/form-data
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: text
 *      required: true
 *      description: this is username field
 *    - name: photo
 *      in: formData
 *      type: file
 *      required: true
 *      description: This is image to be upload
 *   responses:
 *    201:
 *     description: Upload successful
 *    500:
 *     description: Internal Error
 */

var multipleFiles=upload.fields([{
    name:"images", maxCount:4
}
]);
// for multiple image upload
app.post("/multipleImages",multipleFiles,userController.multipleUpload);

/**
 * @swagger
 * /multipleImages:
 *  post:
 *   tags:
 *    - Image
 *   description: Upload multiple images
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/form-data
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: text
 *      required: true
 *      description: username should enter
 *    - name: images
 *      in: formData
 *      type: file
 *      required: true
 *      description: This is image to be upload
 *   responses:
 *    201:
 *     description: Upload successful
 *    500:
 *     description: Internal Error
 */

// emplty error handling
app.use('/*', function(req, res) {
    res.status(404);
    res.send("NOT FOUND");
});
//error handling middleware first parm err
app.use(function(err,req,res,next){
    res.status(500);
    res.json({
    status:500,
    message:err.message
    });
  
    });



//for unnecessary request
    app.use("/*",function(req,res){
        res.status(404);
        res.json({
            status:404,
            message:"Page not found"
            });
    });

// listining port
app.listen(3100);