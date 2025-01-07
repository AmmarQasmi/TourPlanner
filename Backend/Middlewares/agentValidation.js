import { supabase } from "../db/connect.js";

export const validateAgent = async (req, res, next, id) => {
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid Agent ID" });
  }

  //check if agent exists
  const { data, error } = await supabase.from('agents').select('*').eq('agent_id', id).single();

  if (error || !data) {
    return res.status(404).json({ error: 'Client not found' });
  }

  // Attach the agent data to the request object
  req.agent = data;
  next();
};

export const checkLoginStatus = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase.from('agents').select('*').eq('agent_id', id).single();

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
