import mongoose from 'mongoose';

const tagsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    }
},{
    timestamps: true
})

let Tags = mongoose.model('Tags', tagsSchema) ;

export default Tags ;