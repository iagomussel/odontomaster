'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const controllers = {}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const controller = require(path.join(__dirname, file));
        //capitalize first letter
        const controllerName = file.charAt(0).toUpperCase() + file.slice(1, -3);

        controller.controllerName = controllerName + "Controller";

        controllers[controller.controllerName] = controller;
        console.log("load controller "+controller.controllerName);
    });


module.exports = controllers