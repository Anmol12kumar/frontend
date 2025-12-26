const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: { type: String, required: true },
    city: { type: String, default: "Unknown" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    },
    { timestamps: true }
);

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   console.log(next);

//   bcrypt.hash(this.password, 10, (err, hash) => {
//     if (err) return next(err);
//     this.password = hash;
//     next();
//   });
// });

// userSchema.methods.comparePassword = function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// userSchema.index({ email: 1 });

module.exports = mongoose.model("Users", userSchema);
