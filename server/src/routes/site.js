const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/', siteController.index);
router.get('/search', siteController.search);
router.get('/movie', siteController.movie);
router.get('/movie/:id', siteController.movieDetail);
router.get('/show', siteController.show);
router.get('/series/:id', siteController.seriesDetail);
router.get('/actor/:name', siteController.actor);
router.get('/browse', siteController.browse);
router.get('/watch/:id', siteController.watch)
router.post('/signup', siteController.signup);
router.put('/signup/active', siteController.active);
router.post('/forgot', siteController.forgot)
router.put('/forgot/change-password', siteController.changePassword)
router.post('/login', siteController.login);
router.get('/authenticator', siteController.authenticator)
router.put('/add-collections/:email', siteController.addCollections)
router.get('/films-hot-today', siteController.filmsHot2Day)
router.get('/films-hot-week', siteController.filmsHot2Week)
router.get('/films-hot-month', siteController.filmsHot2Month)
router.put('/add-favorite/:email', siteController.addFavorite)
router.put('/remove-favorite/:email', siteController.removeFavorite)
router.post('/check-favorite/:email', siteController.checkFavorite)
router.get('/favorite/:email', siteController.favorite)
module.exports = router;
