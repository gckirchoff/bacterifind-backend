const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router();

router
  .route('/')
  .get(resultController.getAllResults)
  .post(resultController.createResult);

router.route('/:resultId').get(resultController.getResult);

module.exports = router;
