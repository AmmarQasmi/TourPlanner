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

export const checkLoginStatus = async (req, res, next) => {
    const { clientId } = req.params;
  
    try {
      const { data, error } = await supabase.from('clients').select('*').eq('client_id', clientId).single();
  
      if (error || !data) {
        return res.status(404).json({ Error: true , message: error.message});
      }
      if (data.is_login !== 'Y') {
        return res.status(401).json({message: 'Please login again', Error: false});
      }
  
      next();
  
      return res.status(200).json({message:'Logged in', Error: false});
    } catch (err) {
      return res.status(500).json({message: err.message, Error: true});
    }
  };
  