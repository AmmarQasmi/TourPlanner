import { supabase } from "../db/connect.js";

export const validateTransactionId = async (req,res,next, tid) => {
    try {
        const { data, error } = await supabase.from('transactions').select('*').eq('transaction_id', tid).single();

        if(error) {
            return res.status(500).json({message: error.message, Error: true});
        }

        if(!data) {
            return res.status(404).json({message: "Transaction not found", Error: true});
        }

        req.transaction = data;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message, Error: true});
        
    }
};