import express from 'express';
import { createUser,getUserDetailsUid ,updateUserRoles,updateUserDetails } from '../controllers/userController';

const router = express.Router();

router.post('/users/register', createUser);                   
router.get('/users/:uid', getUserDetailsUid);            
router.patch('/users/:id/roles', updateUserRoles);
router.patch('/users/update/:id',updateUserDetails)  ;

export default router;
