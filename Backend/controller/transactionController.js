import { supabase } from "../db/connect.js";

export const getAlltransactions = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .select('*')
            .order('payment_date', { ascending: false }); // Sort by latest

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        res.status(200).json({
            message: "Transactions retrieved successfully",
            transactions: data
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error", Error: true });
    }
};


export const getTransactionById = async (req, res) => {
    try {
        res.status(200).json({
            message: "Transaction retrieved successfully",
            transaction: req.transaction
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error", Error: true });
    }
};


export const createTransaction = async (req, res) => {
    const { booking_id, amount_paid, payment_method, status } = req.body;

    try {
        // Validate required fields
        if (!booking_id || !amount_paid || !payment_method) {
            return res.status(400).json({ message: "Missing required fields", Error: true });
        }

        // Insert transaction into database
        const { data, error } = await supabase
            .from('transactions')
            .insert([
                {
                    booking_id,
                    amount_paid,
                    payment_method,
                    status: status || 'Pending' // Default to 'Pending'
                }
            ])
            .select('*') // Return the inserted record
            .single();

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        res.status(201).json({
            message: "Transaction created successfully",
            transaction: data
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error", Error: true });
    }
};


export const updateTransaction = async (req, res) => {
    const { amount_paid, payment_method, status } = req.body;

    try {
        const { data, error } = await supabase
            .from('transactions')
            .update({
                amount_paid,
                payment_method,
                status
            })
            .eq('transaction_id', req.transaction.transaction_id)
            .select('*') // Return the updated record
            .single();

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        res.status(200).json({
            message: "Transaction updated successfully",
            transaction: data
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error", Error: true });
    }
};


export const deleteTransaction = async (req, res) => {
    try {
        const { error } = await supabase
            .from('transactions')
            .delete()
            .eq('transaction_id', req.transaction.transaction_id);

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        res.status(200).json({
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error", Error: true });
    }
};


