const { Router } = require('express');
const controller = require('../controller/query');
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))
router.post('/users', controller.findAllWithTasks);
router.get('/users/tasks', controller.findTasksWithUser);

module.exports = router;