var user = require('../model/filemodel.js');
function registerUser (req,res,next){
    // console.log(req.file.filename);
    user.create({
    username:req.body.username,
    file:req.file.filename
    })
    .then(function(result){
    res.status(201);
    res.json({
        status:201,
        message:"You have uploaded sinlge image successfully"
    })
    })
    .catch(function(err){
    next(err);
    })
    
    }

    //function to upload multiple images
function multipleUpload(req,res,next){
    images=req.files["images"];
    //counting the number images in array
    var count=images.length;
    for (i = 0; i < count; i++) {
       // console.log(images[i].filename);
        // let date_ob = new Date().getTime();
        user.create({
            username:req.body.username,
            file:images[i].filename
        })
        .then(function(result){
            res.status(201);    
            res.json({
                status:201,
                messsage:"Image uploaded sucessfully"
            });    
            
        })
        .catch(function(err){
            next(err);
        });
      }


}
    


    

module.exports = {
    registerUser,
    multipleUpload
}