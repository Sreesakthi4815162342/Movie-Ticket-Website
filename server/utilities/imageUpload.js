const cloudinary = require ("../config/cloudinaryConfig")

const uploadToCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filePath,
            { folder: 'movie' },
            (error, result) => {
                if (error) return reject(error)
                resolve(result.secure_url)
            }
        )
    })
}

module.exports = uploadToCloudinary