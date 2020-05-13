const { Schema , model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema ({
    name: {type: String, require:true},
    email: { type: String, require:true, unique:true},
    password: { type: String, require:true},
    //role: { type: String, default: 'normal', enum: ['normal', 'admin']},
},
    {
    timestamp:true}
);

UserSchema.methods.encryptpassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

};

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);

};

module.exports = model( 'User' , UserSchema );