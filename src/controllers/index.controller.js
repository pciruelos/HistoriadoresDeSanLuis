const indexCtrl = {};

indexCtrl.renderIndex = (req,res) => {
    res.render('index');
};

indexCtrl.renderContact = (req,res) => {
    res.render('contact');
};

indexCtrl.renderProducts = (req,res) => {
    res.render('products');
};

indexCtrl.renderGracias = (req,res) => {
    res.render('products/gracias');
};

module.exports = indexCtrl;