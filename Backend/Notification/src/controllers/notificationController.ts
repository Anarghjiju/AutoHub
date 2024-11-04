import { Request, Response } from 'express';
import { Notification } from '../models/notification';

export const createNotification = async (req: Request, res: Response) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error:"error creating notification"});
    }
};

export const getNotifications = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        const notifications = await Notification.find({ userId :userId});
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "error getting notification"});
    }
};



export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { notificationId } = req.params;  // Receive notificationId from params
        console.log(notificationId);

        const notification = await Notification.findByIdAndUpdate(
            notificationId,  // Find by notification ID
            { status: true },
            { new: true }
        );

        if (!notification) {
            res.status(404).json({ error: "Notification not found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ error: "Error updating notification" });
    }
};

