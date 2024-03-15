import mongoose from 'mongoose';

const tagsSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique: true
    },
    numPost : {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

let Tags = mongoose.model('Tags', tagsSchema) ;

export default Tags ;