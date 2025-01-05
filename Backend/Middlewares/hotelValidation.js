import { supabase } from "../db/connect.js";

export const validateHotel = async (req, res, next) => {
    const { id } = req.params; 
    
    // Validate the id
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid Hotel ID" });
    }

    try {
        // Check if hotel exists
        const { data, error } = await supabase.from("hotels").select("*").eq("hotel_id", id).single();

        if (error || !data) {
            return res.status(404).json({ error: 'Hotel not found' });
        }

        // Attach hotel data to the request object
        req.hotel = data;
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
