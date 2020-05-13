const express = require('express');
const router = express.Router();


const { renderProductForm,
    createNewProduct,
    renderProducts,
    renderEditProducts,
    updateProducts,
    deleteProducts,
    render1,
    renderctg1,
    renderctg2,
    renderctg3,
    renderctg4,
    renderctg5 } = require('../controllers/products.controller');

const { isAuthenticated } = require('../helpers/auth');


//nuevos productos

router.get('/products/add',isAuthenticated, renderProductForm);

router.post('/products/new-product',isAuthenticated, createNewProduct);

//traer productos

router.get('/allproducts', renderProducts);

router.get('/individual/:id', render1);

router.get('/products/ctg1', renderctg1);

router.get('/products/ctg2', renderctg2);

router.get('/products/ctg3', renderctg3);

router.get('/products/ctg4', renderctg4);

router.get('/products/ctg5', renderctg5);

//editar productos

router.get('/products/edit/:id',isAuthenticated, renderEditProducts);  //mostrar formulario

router.put('/products/edit/:id',isAuthenticated, updateProducts);  //actualizar finalmente

//borar prodcuts

router.delete('/delete/:id',isAuthenticated, deleteProducts);

module.exports = router;