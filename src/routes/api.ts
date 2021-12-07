import { Router } from 'express';
import * as TodoController from '../controllers/todoController';

const router = Router();

router.get('/ping', TodoController.ping);

router.get('/todos', TodoController.listTasks);
router.post('/todo', TodoController.createTask);
router.put('/todo/:id', TodoController.editTask);
router.delete('/todo/:id', TodoController.deleteTask);

export default router;