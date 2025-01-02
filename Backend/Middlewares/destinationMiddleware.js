import { supabase } from "../db/connect.js";

export const validateDestinationId = async (req, res, next, destId) => {
    try {
        if (!destId || isNaN(destId)) {
            return res.status(400).json({ message: "Invalid Booking ID" });
        }
    
    
        const { data , error } = await supabase.from('destinations').select('*').eq('destination_id', destId).single();
    
        if (error || !data) {
            return res.status(404).json({ message: "destination not found" });
        }
    
        req.destination = data;
        next();
    } catch (err) {
        console.error("Error validating destination ID:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};