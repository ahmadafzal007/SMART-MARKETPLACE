const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const { setVerificationCode, getVerificationCode, removeVerificationCode } = require("../utils/verificationStore");
const { sendVerificationEmail } = require("../utils/emailService");

// REGISTER (with integrated email verification using Redis)
exports.register = async (req, res) => {
    try {
        const { name, email, password, verificationCode } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with that email" });
        }

        // If verification code is not provided, generate one, store it in Redis, and "send" it (e.g., via email)
        if (!verificationCode) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            await setVerificationCode(email, code);
            console.log(`Verification code for ${email}: ${code}`);
            try {
                await sendVerificationEmail(email, code);
                console.log(`Verification email sent to ${email}`);
            } catch (emailErr) {
                console.error("Error sending email:", emailErr);
                return res.status(500).json({ message: "Error sending verification email" });
            }
            return res.status(200).json({
                message:
                    "Verification code sent to your email. Please submit the code along with your registration details to complete registration.",
            });
        }

        // Verification code provided: check it against the one stored in Redis
        const storedCode = await getVerificationCode(email);
        if (!storedCode) {
            return res.status(400).json({ message: "No verification code found. Please request a new one." });
        }
        if (storedCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code." });
        }

        // Code is valid: hash the password and create the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isVerified: true,
        });

        await newUser.save();
        await removeVerificationCode(email);

        // Generate token and return the access token, name and email
        const token = generateToken(newUser);
        return res.status(201).json({ token, name: newUser.name, email: newUser.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN - authenticate the user and return a JWT token along with user details
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }

        const token = generateToken(user);
        res.status(200).json({ token, name: user.name, email: user.email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET PROFILE - return the user's profile information (protected)
exports.getProfile = async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE PROFILE - update user info except password (protected)
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, DOB, gender, phoneNumber, description } = req.body;
        
        // Only update allowed fields
        const updateFields = { name, email, DOB, gender, phoneNumber, description };

        // Remove undefined fields
        Object.keys(updateFields).forEach(
            (key) => updateFields[key] === undefined && delete updateFields[key]
        );

        // If email is changed, you might trigger a new verification process here.
        if (updateFields.email && updateFields.email !== req.user.email) {
            updateFields.isVerified = true;
        }

        const user = await User.findByIdAndUpdate(req.user._id, updateFields, { new: true }).select("-password");

        res.status(200).json({ user, message: "Profile updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
