import { supabase } from "../db/connect.js";

export const validateAgent = async (req, res, next, id) => {
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid Agent ID" });
  }

  //check if agent exists
  const { data, error } = await supabase.from('Agents').select('*').eq('agent_id', id).single();

  if (error || !data) {
    return res.status(404).json({ error: 'Client not found' });
  }

  // Attach the agent data to the request object
  req.agent = data;
  next();
};