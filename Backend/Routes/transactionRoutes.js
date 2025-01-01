import { Router } from 'express';
import { createTransaction, deleteTransaction, getAlltransactions, getTransactionById, updateTransaction } from '../controller/transactionController.js';
import { validateTransactionId } from '../Middlewares/transactionValidation.js';

const transactionRouter = Router();

transactionRouter.get('/', getAlltransactions);
transactionRouter.post('/', createTransaction);

transactionRouter.param("tid", validateTransactionId);

transactionRouter.get('/:tid', getTransactionById);
transactionRouter.put('/:tid', updateTransaction);
transactionRouter.delete('/:tid', deleteTransaction);

export default transactionRouter;