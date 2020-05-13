const productsCtrl = {};
const path = require('path');
const { unlink } = require('fs-extra');

const producto = require('../models/Products')



productsCtrl.renderProductForm = (req, res) => {
    res.render('products/new-product');
};

productsCtrl.createNewProduct = async (req, res) => {
    const {Titulo, DescripcionCorta, DescripcionLarga, LinkDePago, Detalles, Categoria , Precio }  = req.body ;
    const newProducto = new producto({Titulo , DescripcionCorta, DescripcionLarga, LinkDePago, Detalles , Categoria , Precio, image: '/uploads/' + req.file.filename  });
    console.log(req.file);
    console.log(newProducto);
    await newProducto.save();
    req.flash('success_msg', 'Producto agregado correctamente');
    res.redirect('/allproducts');
};

productsCtrl.renderProducts = async (req, res) => {
    const productos = await producto.find().lean();
    console.log(productos);
    res.render('products/all-products', { productos });
};

productsCtrl.renderEditProducts = async (req, res) => {
    const produ = await producto.findById(req.params.id);
    console.log(produ);
    res.render('products/edit-products', { produ });
};

productsCtrl.render1 = async (req, res) => {
    const produ = await producto.findById(req.params.id);
    console.log(produ);
    res.render('products/individual', { produ });
};

productsCtrl.renderctg1 = async (req, res) => {
    const ctg1 = await producto.find({"Categoria": "Cat1"});
    res.render('products/ctg1', { ctg1 });
};
productsCtrl.renderctg2 = async (req, res) => {
    const ctg2 = await producto.find({"Categoria": "Cat2"});
    res.render('products/ctg2', { ctg2 });
};
productsCtrl.renderctg3 = async (req, res) => {
    const ctg3 = await producto.find({"Categoria": "Cat3"});
    res.render('products/ctg3', { ctg3 });
};
productsCtrl.renderctg4 = async (req, res) => {
    const ctg4 = await producto.find({"Categoria": "Cat4"});
    res.render('products/ctg4', { ctg4 });
};
productsCtrl.renderctg5 = async (req, res) => {
    const ctg5 = await producto.find({"Categoria": "Cat5"});
    res.render('products/ctg5', { ctg5 });
};

productsCtrl.updateProducts = async (req, res) => {
    const { Titulo, DescripcionCorta, DescripcionLarga, Detalles, Categoria, LinkDePago, Precio} = req.body;
    await producto.findByIdAndUpdate(req.params.id, {Titulo, DescripcionCorta, DescripcionLarga, LinkDePago, Detalles, Categoria, Precio});
    console.log(req.body);
    req.flash('success_msg', 'Producto Editado correctamente');
    res.redirect('/allproducts');
};

productsCtrl.deleteProducts = async (req, res) => {
   
    const img = await producto.findByIdAndDelete(req.params.id);
    await unlink(path.resolve('./src/public'+ img.image));
    req.flash('success_msg', 'Producto Eliminiado correctamente');
    res.redirect('/allproducts')
};

module.exports = productsCtrl;