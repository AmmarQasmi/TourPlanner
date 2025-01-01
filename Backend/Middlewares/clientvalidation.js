import { supabase } from "../db/connect.js";

export const validateClientId = async (req, res, next, id) => {

    // Check if ID is valid
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid Client ID' });
    }

    // Check if client exists in Supabase
    const { data, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('client_id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: 'Client not found' });
    }

    // Attach the client data to the request object
    req.client = data;
    next();
};