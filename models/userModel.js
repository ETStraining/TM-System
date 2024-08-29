import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    FullName: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    TelphoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Middleware to hash the password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('Password')) {
        const hashedPassword = await bcrypt.hash(this.Password, 10);
        console.log('Hashed Password:', hashedPassword); // Debugging line
        this.Password = hashedPassword;
    }
    next();
});

// Method to compare hashed passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.Password);
    console.log('Password Match:', isMatch); // Debugging line
    return isMatch;
};
const UserModel = model('User', UserSchema);
export default UserModel;
