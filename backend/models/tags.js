import mongoose from 'mongoose';

const tagsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    tagsPost : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'publication',
    }
},{
    timestamps: true
})

let Tags = mongoose.model('publication',tagsSchema) ;

export default Tags ;