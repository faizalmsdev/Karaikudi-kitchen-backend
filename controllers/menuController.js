const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const Menu = require('../models/menuModels');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerName = 'images'; // Name of your container in Azure Blob Storage


exports.getAllMenu = async(req,res) => {
    try{
        const menu = await Menu.find();

        const menuWithImageURLs = menu.map(item => ({
            _id: item._id,
            dish_name: item.dish_name,
            price: item.price,
            instock: item.instock,
            discount_price_available: item.discount_price_available,
            discount_price: item.discount_price,
            description: item.description,
            vg_category: item.vg_category,
            category: item.category,
            images: `${process.env.URL}/${item.images}`
        }));

        res.status(200).json({
            status : 'Success',
            results: menuWithImageURLs.length,
            data: {
                menu: menuWithImageURLs,
            }
        });
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.createMenu = async (req, res) => {
    try {
        let newMenu = req.body;

        // Check if there's a file uploaded
        if (req.file) {
            const filePath = req.file.path; // Get the path of the uploaded file
            // Check if the file exists
            if (fs.existsSync(filePath)) {
                // File exists, proceed with upload

                // Your Azure Blob Storage upload logic here...
            } else {
                // File does not exist, handle the error
                console.error('File not found:', filePath);
                // Return an error response to the client
                return res.status(404).json({ error: 'File not found' });
            }
            // Generate a unique name for the blob
            const blobName = uuidv4() + path.extname(req.file.originalname);

            // Get a reference to a container
            const containerClient = blobServiceClient.getContainerClient(containerName);
            
            // Get a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);

            // Upload file to Azure Blob Storage
            await blockBlobClient.uploadStream(fs.createReadStream(req.file.path), undefined, undefined, { blobHTTPHeaders: { blobContentType: req.file.mimetype } });

            // Get URL of the uploaded blob
            const imageURL = `https://${process.env.AZURE_STORAGE_ACCOUNT}.blob.core.windows.net/${containerName}/${blobName}`;

            // Set images field to the Azure Blob Storage URL
            newMenu.images = imageURL;
        }

        // Create menu with Azure Blob Storage URL
        newMenu = await Menu.create(newMenu);

        res.status(200).json({
            status: "success",
            data: {
                menu: newMenu
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getPopularChoice = async (req, res) => {
    try {
        const popularMenus = await Menu.find({ category: 'popular-choice' });

        res.status(200).json({
            status: 'Success',
            results: popularMenus.length,
            data: {
                menu: popularMenus,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getPeopleFavorites = async (req, res) => {
    try {
        const favoriteMenus = await Menu.find({ category: 'people-favorite' });

        res.status(200).json({
            status: 'Success',
            results: favoriteMenus.length,
            data: {
                menu: favoriteMenus,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getHighSelling = async (req, res) => {
    try {
        const highSellingMenus = await Menu.find({ category: 'high-selling' });

        res.status(200).json({
            status: 'Success',
            results: highSellingMenus.length,
            data: {
                menu: highSellingMenus,
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.getMenu = async (req, res) => {

    try{

        const menu = await Menu.findById(req.params.id);

        res.status(200).json({
            status : 'Success',
            data : {
                menu
            }
        })

    }catch(err){
        res.status(404).json({
            status:'Fail',
            message : err.message
        })
    }
}

exports.updateMenu = async (req, res) => {

    try{

        const menu = await Menu.findByIdAndUpdate(req.params.id , req.body , {
            new : true,
            runValidators: true,
        });

        res.status(200).json({
            status : 'Success',
            data : {
                menu
            }
        })

    }catch(err){
        res.status(400).json({
            status:'Fail',
            message : err.message
        })
    }
}

exports.deleteMenu = async (req,res) => {

    try{

        const menu = await Menu.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "success",
            data: null
        });

    }catch(err){
        res.status(404).json({
            status:'Fail',
            message : err.message
        })
    }
}