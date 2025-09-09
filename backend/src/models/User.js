import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password: {   //  You forgot this field
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["customer","admin"],
        default: "customer"
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
});

// Hash the password before saving the user
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
