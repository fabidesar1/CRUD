const mongoose = require('mongoose');


const Post = mongoose.model('Post', 
    {   
        username: { type: String, required: true },
        url: { type: String, required: false },
        description: { type: String, required: true },
        createdAt: { type: String, default: () => new Date().toISOString().substring(0, 10) }
    });



module.exports = Post