const bcrypt = require('bcrypt');

const plainPassword = 'userPassword'; // Replace with the password you want to test

// Test hashing
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('Hashed Password:', hashedPassword); // Print the hashed password

    // Test comparison
    bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }
        console.log('Password Match:', isMatch); // Should print `true` if passwords match
    });
});
