const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
   name:{
    type:String,
    required:[true,"Please Enter product Name"],
    trim:true
   },
   description:{
    type:String,
    required:[true,"Please Enter product Description"]
   },
   price:{
    type:Number,
    required:[true,"Please Enter product Price"],
    maxlength:[8,"Price cannot exceed 8 charecter"]
   },
   ratings:{
    type:Number,
    default:0
   },
   images:[
    {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
],
category:{
    type:String,
    required:[true,"Please Enter Product Category"],
},
stock:{
    type:Number,
    required:[true,"Please Enter Product Stock"],
    maxlength:[4,"Stock cannot exceed 4 charecters"],
    default:1
},
numOfReviews:{
    type:Number,
    default:0
},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            required:true
         },
        name:{
            type:String,
            required:true,
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true
        }
    }
],
user:{
   type:mongoose.Schema.ObjectId,
   ref:"user",
   required:true
},
createdAt:{
    type:Date,
    default:Date.now
}
})

module.exports = mongoose.model("Product",productSchema);