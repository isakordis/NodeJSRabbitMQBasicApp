var mongoose=require('mongoose');
//DB name is 'users'
var users=mongoose.model('users',{
   
    modelMessage:String,    
});

module.exports=users;