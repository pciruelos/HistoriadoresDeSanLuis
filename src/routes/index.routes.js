const express = require('express');
const router = express.Router();

const { renderIndex, renderContact, renderProducts, renderGracias } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/contact',renderContact);

router.get('/products',renderProducts);

router.get('/products/gracias', renderGracias);

module.exports = router;