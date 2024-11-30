const mongoose = require("mongoose");
const { regex } = require("../validation/");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return regex.emailRegex.test(v);
                },
                message: 'Enter Correct Email!',
            }
        },
        password: {
            type: String,
            required: true,
            minlength: [8, "Password must be 8 characters long!"],
            validate: {
                validator: function (v) {
                    return regex.passwordRegex.test(v);
                },
                message: 'Password must contain at least one letter, one number, and one special character.',
            },
        },
        avatar: {
            type: String,
            required: [true, "User avatar is required!"],
        }
    },
    { timestamps: true }
);

// a pre-save hook to trigger validation
UserSchema.pre('save', function(next) {
    if (!regex.passwordRegex.test(this.password)) {
        return next(new Error('Password must contain at least one letter, one number, and one special character.'));
    }
    next();
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
