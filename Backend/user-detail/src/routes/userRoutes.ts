import express from 'express';
import { createUser, getUserDetails, updateUserRoles } from '../controllers/userController';

const router = express.Router();

router.post('/users', createUser);                   // Create a new user
router.get('/users/:id', getUserDetails);            // Get user details
router.patch('/users/:id/roles', updateUserRoles);   // Update user roles

export default router;
