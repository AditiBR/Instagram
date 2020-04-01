const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    }, 
    userName: {
        type: String
    },
    avatar: {
        type: String
    },
    likes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        }
    ],
    dislikes:[
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        }
    ],
    comments: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'Users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            commentDate: {
                type: Date,
                default : Date.now
            }
        }
    ],
    postDate: {
        type:Date,
        defult : Date.now
    }
});

module.exports = PostModel = mongoose.model('post', postSchema);




