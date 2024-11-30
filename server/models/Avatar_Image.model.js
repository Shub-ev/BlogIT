const mongoose = require("mongoose");

const AvatarImageSchema = mongoose.Schema({
    avatarData: {
        type: Buffer,
        required: [true, "Avatar image is required!"],
    },
    contentType: {
        type: String, // MIME type (e.g., 'image/jpeg', 'image/png')
        required: [true, "Image content type is required!"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const AvatarImageModel = mongoose.model("AvatarImages", AvatarImageSchema);

module.exports = AvatarImageModel;