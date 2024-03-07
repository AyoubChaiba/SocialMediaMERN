import mongoose from 'mongoose';

const tagsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    }
},{
    timestamps: true
})

let Tags = mongoose.model('publication',tagsSchema) ;

export default Tags ;