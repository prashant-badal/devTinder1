const mongoose = require('mongoose');

const connectDatabase = async () => {

    await mongoose.connect('mongodb+srv://badal26:badal26@namanstenode.uqxifjn.mongodb.net/namansteDev');
  
};

module.exports = connectDatabase;