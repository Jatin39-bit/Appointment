const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        selection: true,
    }
})

adminSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

adminSchema.methods.generateJWT = async function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

adminSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Admin', adminSchema);