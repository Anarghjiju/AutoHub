import express from 'express';
import {createNotification,getNotifications,markAsRead} from '../controllers/notificationController';

const router = express.Router();

router.post('/notifications',createNotification);
router.get('/notifications/:userId',getNotifications);
router.patch('/notifications/:userId',markAsRead);

export default router;