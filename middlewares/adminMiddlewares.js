import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import UserModel from './models/userModel.js';

const setupAdmin = async () => {
  try {
    const adminEmail = 'admin@example.com';
    const adminPassword = 'adminPassword1';
    
    // Hash the password
    const hashedPassword = await bcryptjs.hash(adminPassword, 10);
    
    // Create admin user
    const existingAdmin = await UserModel.findOne({ Email: adminEmail });
    if (!existingAdmin) {
      const adminUser = new UserModel({
        FullName: 'Admin User',
        Email: adminEmail,
        TelphoneNumber: '1234567890',
        Password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};

setupAdmin();
