'use strict'
const express = require('express');
const api = express.Router();
const { body } = require('express-validator');

var WelcomeController = require('../controllers/welcome');
var AlumnosController = require('../controllers/alumnos');
let AuthController = require('../controllers/auth');

var MaestrosController = require('../controllers/maestros');

let userProtectUrl = require('../middlewares/authUser').userProtectUrl;

api.get("/", WelcomeController.welcome);
api.get("/alumnos", AlumnosController.alumnos);
api.get("/alumno/:n_lista", AlumnosController.alumno);
api.post("/alumno", userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.crear_alumno);

api.put("/alumno/:n_lista",[
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], AlumnosController.update_alumno);

api.delete("/alumno/:n_lista", AlumnosController.delete_alumno);

api.post("/login",[
    body('mail').not().isEmpty(),
    body('pass').not().isEmpty()
], AuthController.login);
api.post("/logout", userProtectUrl, AuthController.logout);

api.get("/maestros", MaestrosController.maestros);
api.get("/maestro/:n_lista", MaestrosController.maestro);
//api.post("/maestro", MaestrosController.crear_maestro);

api.post("/maestro",userProtectUrl, [
    body('n_cuenta').not().isEmpty(),
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], MaestrosController.crear_maestro);

api.put("/maestro/:n_lista",[
    body('nombre').not().isEmpty(),
    body('edad').not().isEmpty(),
    body('genero').not().isEmpty()
], MaestrosController.update_maestro);

api.delete("/maestro/:n_lista", MaestrosController.delete_maestro);

module.exports = api;