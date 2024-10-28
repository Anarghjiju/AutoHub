import { Transaction,ITransaction } from "../models/transaction";

export const createTransaction = async(transactionData:Partial<ITransaction>):Promise<ITransaction>=>{
    const transaction = new Transaction(transactionData);
    return await transaction.save();
};

export const getTransactionById=async(id:string):Promise<IDBTransaction|null>=>{
    return await Transaction.findById(id);
};

export const getAllTransactions=async():Promise<IDBTransaction[]>=>{
    return await Transaction.find();
};

export const deleteTransaction=async(id:string)=>{
    return await Transaction.findByIdAndDelete({transactionId:id});
}