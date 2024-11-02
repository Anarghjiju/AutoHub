import express from 'express';
import { createUser, getUserDetails, updateUserRoles,updateUserDetails } from '../controllers/userController';

const router = express.Router();

router.post('/users', createUser);                   
router.get('/users/:id', getUserDetails);            
router.patch('/users/:id/roles', updateUserRoles);
router.patch('/users/:id',updateUserDetails)  ;

export default router;
