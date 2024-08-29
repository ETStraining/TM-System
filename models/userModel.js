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
    },
    ConfirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return this.Password === v;
            },
            message: 'Passwords do not match.'
        }
    }
}, { timestamps: true });

// Middleware to hash the password before saving
UserSchema.pre('save', async function(next) {
    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 10);
    }
    // Remove ConfirmPassword before saving
    this.ConfirmPassword = undefined;
    next();
});

// Method to compare hashed passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
};

const UserModel = model('User', UserSchema);
export default UserModel;
