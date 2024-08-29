
import bcryptjs from ('bcrypts');
import jwt from ('jwt');
import sendEmail from '../middlewares/sendEmail';
import UserModel from '../models/userModel';
const errorHandler = require('../errors/errorHandler');
require('dotenv').config()

const SignUp = async (req, res, next) => {
     try {
       const { firstName,lastName, email, password } = req.body;

       var userExists = await UserModel.findOne({ email: email });
       
       if (userExists) {
         return next(errorHandler(401, "User with this email already exists"));
       } else {
         const hashedPassword = bcryptjs.hashSync(password, 10);

         var newUser = new UserModel({
           firstName: firstName,
           lastName: lastName,
           email: email,
           password: hashedPassword,
         });

         var savedUser = await newUser.save();
         var subject= "Welcome to TMS";
         var message = "You have signed Up successfully";
         
         await sendEmail(email,subject,message)
         return res.status(200).json({ message: "Account created!", savedUser });

       }
     } catch (error) {
       console.log(error)
       res.status(500).json(error.message);
     }
};

const LogIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await UserModel.findOne({ email: email});    
        if (!validUser) return res.status(401).json({message: "Invalid username or password"});

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return res.status(401).json({message: "Invalid username or password"});  

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);

        const { password: hashedPassword, ...rest } = validUser._doc;

        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res
            .cookie('access_token', token, { httpOnly: true, expires: expiryDate})
            .status(200)
            .json({message: "you signedIn Successfully", user:validUser});
        console.log(validUser);
    } catch (error) {
        
        res.status(500).send(error.message);
    }
};

const ForgotPassword = async (req, res, next) => {
    try {
        const validUser = await UserModel.findOne({ email: req.body.email});    
        if (!validUser) return next(errorHandler(401, "Invalid email"));
        
        var token = jwt.sign({ email: req.body }, process.env.JWT_SECRET_KEY, { expiresIn: 1200 });

        var recoveryLink = `http://localhost:4000/reset-password/${token}/${validUser._id}`;
        
        sendEmail(validUser.email, 'Reset Password', recoveryLink);

        res.status(200).json({ message: `Password reset link sent to your email!` });
    } catch (error) {
        // next(errorHandler(error));
        res.status(500).json(error);
    }
}

module.exports = {
    LogIn,
    SignUp,
    ForgotPassword
}