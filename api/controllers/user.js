import User from "../models/User.js";

// UPDATE
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted" });
    } catch (err) {
        next(err);
    }
};

// GET
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};


// CREATE
export const createAdminUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate input data
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newAdmin = new User({
            username,
            email,
            password: hashedPassword,
            role: 'admin' 
        });

        // Save the new admin user to the database
        await newAdmin.save();

        res.status(201).json({ message: "Admin user created successfully" });
    } catch (err) {
        // Handle errors
        next(err);
    }
};


export const login = async (req, res, next) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: req.body.email });

        // If user doesn't exist, return an error
        if (!user) {
            return next(createError(404, "User not found"));
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        // If password is incorrect, return an error
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or email!"));
        }

        // Sign a JWT token with user's ID and role
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        // Return user's details along with token
        res.status(200).json({ user: user, token: token });
    } catch (err) {
        next(err);
    }
}