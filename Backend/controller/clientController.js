import { supabase } from '../db/connect.js';

// returns with order desc wrt to time
export const getAllClients = async (req,res) => {
    try {
        const { data, error } = await supabase.from().select('*').order('created_at',{ascending: false});

        if( error ) {
            return res.status(400).json({message: error.message, Error: true});
        }
    
        return res.status(200).json({message: 'Client found', Clients: data});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Internal server error', Error: true});
    }
};

export const getClientById = async (req,res) => {
    return res.status(200).json({message: 'Client found', Clinets: req.clinet});
};

export const createClient = async (req,res) => {};

export const updateClient = async (req,res) => {};

export const deleteClient = async (req,res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase.from('clients').delete().eq('client_id',id);

        if(error) {
            return res.status(500).json({message: 'Internal server error', Error: true});
        }

        return res.status(204).json({message:'Client deleted', Client: data});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: 'Internal server error', Error: true});
    }
};