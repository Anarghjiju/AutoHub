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
        const { userId } = req.params;
        console.log(userId);
        const notification = await Notification.findOneAndUpdate(
            {userId:userId},
            { status: true },
            { new: true }
        );
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ error: "error finding notification" });
    }
};
