const mongoose = require('mongoose');
require('dotenv').config()
async function connect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL,
        );
        console.log('Successfully!!!');
    } catch (error) {
        console.log('Fail!!');
    }
}

module.exports = { connect };
