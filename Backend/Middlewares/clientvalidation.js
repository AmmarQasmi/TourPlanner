import { supabase } from "../db/connect.js";

export const validateClientId = async (req, res, next, clientId) => {

    // Check if ID is valid
    if (!clientId || isNaN(clientId)) {
        return res.status(400).json({ error: 'Invalid Client ID' });
    }

    // Check if client exists in Supabase
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('client_id', clientId)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: 'Client not found' });
    }

    // Attach the client data to the request object
    req.client = data;
    next();
};