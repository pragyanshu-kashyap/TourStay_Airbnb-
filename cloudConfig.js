const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ // this will configure the cloudinary with the credentials from the environment variables, hum apne backend ko cloudinary ke sath connect kar rahe hain.

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //here key bydefaule left side key names are cloud_name, api_key, api_secret are fixed for use
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

const storage = new CloudinaryStorage({ // this will create a new instance of CloudinaryStorage with the cloudinary configuration, and it will store the uploaded files in the cloudinary.
    cloudinary: cloudinary, // this will use the cloudinary instance we created above, and it will use this configuration when uploading files.
    params: {
        folder: 'Tourstay_Dev', // specify the folder name where you want to store the images
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // specify the allowed formats for the images
    },
});

module.exports = {
    cloudinary, // exporting the cloudinary instance so that we can use it in other files
    storage, // exporting the storage instance so that we can use it in other files
};