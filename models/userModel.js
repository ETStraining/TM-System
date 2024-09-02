import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    TelphoneNumber: { type: String, required: true },
    Password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // default to 'user'
    createdAt: { type: Date, default: Date.now },
  });

// Middleware to hash the password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('Hashed Password:', hashedPassword); // Debugging line
        this.password = hashedPassword;
    }
    next();
});

// Method to compare hashed passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password Match:', isMatch); // Debugging line
    return isMatch;
};
const UserModel = model('User', UserSchema);
export default UserModel;
