    const User = require('../models/userModel');

    exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
        });
    } catch (err) {
        res.status(400).json({
        status: 'fail',
        message: err.message,
        });
    }
    };

    exports.login = async (req, res) => {
        const { email, password } = req.body;
    
        try {
        // Find user by email
        const user = await User.findOne({ email });
    
        // If user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Check if passwords match
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // If passwords match, send back user info
        const { roles, name } = user; // Adjusted destructuring here
        res.status(200).json({ roles, name, email: user.email }); // Adjusted email access here
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
        }
    };
    

    //   to access with jwt 
    // exports.login = async (req, res) => {
    //     const { email, password } = req.body;
    
    //     try {
    //       // Find user by email
    //       const user = await User.findOne({ email });
    
    //       // If user not found or password incorrect
    //       if (!user || password !== user.password) {
    //         return res.status(401).json({ message: 'Invalid email or password' });
    //       }
    
    //       // Generate JWT token
    //       const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key');
    
    //       // Send back JWT token and user info
    //       res.status(200).json({ token, user: { roles: user.roles, name: user.name, email: user.email } });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ message: 'Server Error' });
    //     }
    //   };