const mongoose=require("mongoose");

const sellerRequestSchema=new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    shopName:{
        type:String,
        required:true,
        trim:true
    },
    businessDescription:{
        type:String,
        required:true,
        trim:true
    },
    businessAddress:{
        street:{
            type:String,
            required:true,
            trim:true
        },
        city:{
            type:String,
            required:true,
            trim:true
        },
        state:{
            type:String,
            required:true,
            trim:true
        },
        postalCode:{
            type:String,
            required:true,
            trim:true
        },
        country:{
            type:String,
            default:"India",
            trim:true
        }
    },
    documents:{
        gst:{
            type:String,
            required:true,
            trim:true
        },
        pan:{
            type:String,
            required:true,
            trim:true
        },
        identityProof:{
            type:String,
            required:true,
            trim:true
        }
    },
    status:{
        type:String,
        enum:["PENDING","APPROVED","REJECTED"],
        default:"PENDING"
    },
    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    reviewedAt:{
        type:Date,
        default:null
    },
    rejectionReason:{
        type:String,
        trim:true,
        default:null
    }
},
{
    timestamps:true
}
)

sellerRequestSchema.set("toJSON",{
    transform:function(doc,ret){
        delete ret.__v;
        return ret;
    }
})

const SellerRequestModel=mongoose.model("SellerRequest",sellerRequestSchema);

module.exports=SellerRequestModel;