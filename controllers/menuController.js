const Menu = require('../models/menuModels');

exports.getAllMenu = async(req,res) => {
    try{
        const menu = await Menu.find();

        res.status(200).json({
            status : 'Success',
            results: menu.length,
            data: {
                menu,
            }
        });
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.createMenu = async(req, res) => {
    try{

        const newMenu = await Menu.create(req.body);

        if(req.file){
            newMenu.images = req.file.path
        }

        res.status(200).json({
            status: "success",
            data: {
                menu: newMenu
            }
        })

    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

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