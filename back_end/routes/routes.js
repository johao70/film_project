const { Router } = require('express');

const controllers = require('../controllers/crud');
const router = Router();

router.get('/', (req, res) => res.send('Bienvenido'))

router.post('/persona', controllers.postData);
router.get('/persona', controllers.getData);

module.exports = router;
