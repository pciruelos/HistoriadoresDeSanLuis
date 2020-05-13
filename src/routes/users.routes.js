const { Router } = require('express');
const router = Router();

const { renderRegistroForm,
    iniciosesion,
    iniciosesionForm,
    registro,
    cerrarsession } = require('../controllers/users.controllers');

router.get('/users/registro', renderRegistroForm);

router.post('/users/registro', registro);

router.get('/users/inicio', iniciosesionForm);

router.post('/users/inicio', iniciosesion);

router.get('/users/cerrar', cerrarsession);

module.exports = router;