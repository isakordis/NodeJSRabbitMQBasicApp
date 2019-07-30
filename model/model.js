var mongoose=require('mongoose');

var users=mongoose.model('users',{
   
    modelMessage:String,    
});

module.exports=users;