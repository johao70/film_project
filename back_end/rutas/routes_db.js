;
const express = require('express')
let api = express.Router(),
  control = require('../controles/crud')

api.get('/film', control.getDatos)
api.post('/film', control.postDatos)
api.put('/film', control.updateDatos)
api.delete('/film', control.deleteDatos)

api.post('/login', control.login)

module.exports = api
