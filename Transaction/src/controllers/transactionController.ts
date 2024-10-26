import {Request,Response} from 'express'
import {createTransaction,getTransactionById,getAllTransactions,deleteTransaction} from '../services/transactionService'

export const createTransactionHandler = async(req:Request,res:Response)=>{
    try{
        const transaction = await createTransaction(req.body);
        res.status(201).json(transaction);
    }catch(error){
        res.status(500).json({message:"Error creating Transaction"});
    }
};

export const getTransactionHandler = async(req:Request,res:Response)=>{
    try{
        const transaction = await getTransactionById(req.params.id);
        if(!transaction){
            return res.status(404).json({"message":"No Transaction found"});
        }
    }catch(error){
        res.status(500).json({message:"Error retrieving  Transaction"});
    }
};


export const getAllTransactionsHandler = async (req: Request, res: Response) => {
    try {
        const transactions = await getAllTransactions();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving transactions", error });
    }
};

export const deleteTransactionHandler = async(req:Request,res:Response)=>{
    try{
        const transaction = await deleteTransaction(req.params.id);
        res.status(200).json(transaction);
    }catch(error){
        res.status(500).json({message:"Error deleting transaction"})
    }
};