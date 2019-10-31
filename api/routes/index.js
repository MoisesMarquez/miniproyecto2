const express = require('express');
const { inspectionController } = require('../controllers')

const router = express.Router();

router.post('/inspections', inspectionController.post)
router.get('/inspections', inspectionController.getAll)
router.get('/inspections/:id', inspectionController.get)
router.put('/inspections/:id', inspectionController.put)

module.exports = router