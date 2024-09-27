import express from 'express';
import { createGroup, updateGroup, deleteGroup, getGroups } from '.c:/project/toy project/controllers/groupController.js';

const router = express.Router();

// 라우트 정의
router.post('/groups', createGroup);
router.put('/groups/:groupId', updateGroup);
router.get('/groups/:groupId', getGroups);
router.delete('/groups/:groupId', deleteGroup);

// ES 모듈 방식의 export
export default router;