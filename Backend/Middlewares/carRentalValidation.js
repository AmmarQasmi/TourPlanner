import { supabase } from "../db/connect.js";

export const validateCars = async (req, res, next) => {
    const { id } = req.params; 
    
    // Validate the id
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid Car ID" });
    }

    try {
        // Check if Car exists
        const { data, error } = await supabase.from("cars").select("*").eq("car_id", id).single();

        if (error || !data) {
            return res.status(404).json({ error: 'Car not found' });
        }

        req.car = data;
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
