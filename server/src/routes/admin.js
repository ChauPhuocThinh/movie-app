const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');
const authenMiddleware = require('../app/middlewares/authenMiddleware');
const authorMiddleware = require('../app/middlewares/authorMiddleware');

router.get('/', authenMiddleware,adminController.index)
router.post('/films/create', adminController.createFilm);
router.get('/films', adminController.films)
router.get('/films/:id', adminController.film)
router.put('/films/:id/update', adminController.updateFilm);
router.post('/login', adminController.login);
router.post('/signup', adminController.signup);
router.get('/users', authenMiddleware, authorMiddleware,adminController.users)
router.get('/users/:id', adminController.user)
router.put('/users/:id/update', adminController.updateUser);
router.delete('/films/:id/delete', adminController.deleteFilm);
router.delete('/actors/:id/delete', adminController.deleteActor);
router.delete('/users/:id/delete', adminController.deleteUser);
router.delete('/viewers/:id/delete', adminController.deleteViewer);
router.get('/actors', adminController.actors)
router.post('/actors/create', adminController.createActor);
router.get('/actors/:id', adminController.actor);
router.put('/actors/:id/update', adminController.updateActor);
router.get('/viewers', adminController.viewers)
router.get('/viewers/:id', adminController.viewer)
router.get('/views-chart', adminController.viewsChart)
// router.get('/', userController.user);
// router.get('/signout', userController.signOut);
// router.get('/user/:id', userController.edit);
// router.put('/user/:id', userController.update);

module.exports = router;
