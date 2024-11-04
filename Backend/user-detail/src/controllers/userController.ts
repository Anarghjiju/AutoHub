import { Request, Response } from 'express';
import {User} from '../models/userModel'; // Adjust the import path as necessary

// Function to get user details by UID
export const getUserDetailsUid = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params; // Expecting uid to be passed as a URL parameter
        const user = await User.findOne({ uid }); // Fetch user by uid
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else{
        res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching user details" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { uid,name, email} = req.body;
        const newUser = new User({ uid, name, email });
        console.log(newUser);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
};


export const updateUserRoles = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, { isAdmin: true }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error updating user roles" });
    }
};

export const updateUserDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email,phno } = req.body;
        
        const updateData: Partial<{ name: string; email: string; phno: number }> = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phno) updateData.phno = phno;
        
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error updating user details" });
    }
};
