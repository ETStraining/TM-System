import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    FirstName: {
        type: String, 
        required: true,
    },
    LastName: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    Password: {
        type: String, 
        required: true,
    },
   
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 10);
    }
    next();
});

const UserModel = model('User', UserSchema);
export default UserModel;
