import { supabase } from '../db/connect.js';

export const getAllCarRentals = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("cars").select('*');

        if (error) {
            console.error("Supabase Error", error);
            return res.status(500).json({ error: "Failed to get Cars for renting" });
        }

        // Return the list of agents
        return res.status(200).json({
            message: "Cars retrieved successfully!",
            car: data,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve Cars." });
    }
};

export const getRentalByID = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("cars").select('*').eq("car_id", id);

        if (error) {
            console.error("Supabase Error", error);
            return res.status(500).json({ error: "Failed to get Cars for renting" });
        }

        // Return the list of agents
        return res.status(200).json({
            message: "Cars retrieved successfully!",
            car: data,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to retrieve Cars." });
    }
};

export const createCarRental = async (req, res) => {
    const { make, model, year, capacity, rental_price_per_day, availability_status, image } = req.body;

    if (!make || !model || !year || !capacity || !rental_price_per_day || !availability_status || !image) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const { data, error } = await supabase
            .from("cars")
            .insert([{ make, model, year, capacity, rental_price_per_day, availability_status, image }])
            .select('*').single();
        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to create car." });
        }

        return res.status(201).json({
            message: "Car created successfully!",
            car: data,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to create Car." });
    }
};

export const updateCarRental = async (req, res) => {
    const { id } = req.params;
    const { make, model, year, capacity, rental_price_per_day, availability_status, image } = req.body;

    try {
        const { data: existingData, error: existingError } = await supabase.from('cars').select('*').eq('car_id', id);
        if (existingError) {
            console.error("Supabase Error:", existingError);
            return res.status(500).json({ error: "Failed to retrieve existing car data." });
        }
        const existingCar = existingData[0];
        if (!existingCar) {
            return res.status(404).json({ error: "Car not found." });
        }

        const updatedObj = {
            make: make || existingCar.make,
            model: model || existingCar.model,
            year: year || existingCar.year,
            capacity: capacity || existingCar.capacity,
            rental_price_per_day: rental_price_per_day || existingCar.rental_price_per_day,
            availability_status: availability_status || existingCar.availability_status,
            image: image || existingCar.image
        }

        const { data, error } = await supabase
            .from("cars")
            .update(updatedObj)
            .eq("car_id", id)
            .select('*').single();
        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to update car." });
        }

        return res.status(201).json({
            message: "Car updated successfully!",
            car: data,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Failed to update Car." });
    }
};

export const deleteCarRental = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from("cars").delete().eq('car_id', id);
        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ error: "Failed to delete car." });
        }

        return res.status(200).json({
            message: "car deleted successfully",
        });
    } catch {
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Failed to delete car." });
    }
};