const express = require('express');

const menuController = require('../controllers/menuController');

const upload = require('../middlewares/upload');    

const router = express.Router();

// router 
//     .route('/popular-choice')
//     .get()

router
    .route('/')
    .get(menuController.getAllMenu)
    .post(upload.single('images') , menuController.createMenu);

router
    .route('/popular-choice/')
    .get(menuController.getPopularChoice);

router
    .route('/people-favorite')
    .get(menuController.getPeopleFavorites);

router
    .route('/high-selling')
    .get(menuController.getHighSelling);

router 
    .route('/:id')
    .get(menuController.getMenu)
    .patch(menuController.updateMenu)
    .delete(menuController.deleteMenu);


module.exports = router;