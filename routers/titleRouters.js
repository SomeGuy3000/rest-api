const express = require('express');
const controllers = require('../controllers/controllers.js');
const controller = controllers.default;

function router(req, res) {
    var api = express.Router()

    // GET /titles/:id
    api.get('/:id', controller.getTitle);

    // GET /titles
    api.get('/', controller.getTitles);

    // POST /titles 
    api.post('/', controller.createTitle);

    // PUT /titles/:id
    api.put('/:id',  controller.updateTitle);

    // DELETE /titles/:id
    api.delete('/:id', controller.deleteTitle);

    return api;
};

module.exports.router = router;