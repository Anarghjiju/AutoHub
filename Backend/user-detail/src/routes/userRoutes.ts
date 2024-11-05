import express from 'express';
import { createUser,getUserDetailsUid ,updateUserRoles,updateUserDetails,getAllUsers,deleteUser,getUserDetailsById } from '../controllers/userController';

const router = express.Router();

router.get('/users', getAllUsers);            
router.post('/users/register', createUser);                   
router.get('/users/:uid', getUserDetailsUid);
router.get('/users/data/:id', getUserDetailsById);
router.patch('/users/:id/roles', updateUserRoles);
router.patch('/users/update/:id',updateUserDetails)  ;
router.delete('/users/:id', deleteUser);            


export default router;
