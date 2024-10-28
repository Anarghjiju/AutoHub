import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { usedCar } from '../models/usedCarModel';

export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
};

export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const  {id } = req.params;
        console.log(id);
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user details" });
    }
};

export const updateUserRoles = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, { role :  req.body.role }, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error updating user roles" });
    }
};
