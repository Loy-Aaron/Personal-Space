import {Router} from 'express';
import {createEntry, deleteDiary, deleteEntry, getDiary, updateEntry} from '../controllers/diary.controller.js';
const diaryRoutes = Router();

diaryRoutes.get('/', getDiary);
diaryRoutes.post('/', createEntry);
diaryRoutes.put('/:eid', updateEntry);
diaryRoutes.delete('/:eid', deleteEntry);
diaryRoutes.delete('/', deleteDiary);

export default diaryRoutes;

