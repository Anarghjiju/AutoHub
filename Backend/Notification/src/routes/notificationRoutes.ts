import express from 'express';
import {createNotification,getNotifications,markAsRead} from '../controllers/notificationController';

const router = express.Router();

router.post('/notifications',createNotification);
router.get('/notifications/:userId',getNotifications);
router.patch('/read/:notificationId',markAsRead);

export default router;