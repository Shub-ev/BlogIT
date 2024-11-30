const { UserModel, AvatarImageModel } = require("../models/");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                success: false,
                message: "All fields (email, password, username) are required."
            });
        }

        // console.log(username);

        let isPresent = await UserModel.findOne({ email });
        if (isPresent) {
            return res.status(400).json({ 
                success: false,
                message: "Email already exists!" 
            });
        }
        isPresent = await UserModel.findOne({ username });
        if (isPresent) {
            return res.status(400).json({ 
                success: false,
                message: "Username already taken!" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({ email, password: hashedPassword, username, avatar: "default" });
        await user.save();

        res.status(201).json({
            success: true,
            message: 'User Created Successfully!',
            email: user.email,
            username: user.username
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message || 'Internal server error'
        });
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const isPresent = await UserModel.findOne({ email });
        console.log(req.body);
        console.log(isPresent);

        if(isPresent){
            const match = await bcrypt.compare(password, isPresent.password);
            if(!match){
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid Password!" 
                });
            }
        }
        else{
            return res.status(400).json({ 
                success: false,
                message: "User does not exist!" 
            });
        }

        // console.log(isPresent.email);
        res.status(200).json({
            success: true,
            message: "Login Successful!",
            email: isPresent.email,
            username: isPresent.username
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error logging in user!',
            error: error.message || 'Internal server error'
        });
    }
}

module.exports = {
    createUser,
    loginUser
};
