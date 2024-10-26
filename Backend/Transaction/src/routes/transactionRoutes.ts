import express from 'express';
import {createTransactionHandler,getTransactionHandler,getAllTransactionsHandler,deleteTransactionHandler} from '../controllers/transactionController'

const router = express.Router();

router.post('/transaction',createTransactionHandler);
router.get('/transactions',getAllTransactionsHandler);
router.get('/transactions/:id',getAllTransactionsHandler);
router.delete('/transactions/:id',deleteTransactionHandler);


export default router;