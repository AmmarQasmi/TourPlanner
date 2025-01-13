import { supabase } from "../db/connect.js";

export const getAllDestinations = async (req, res) => {
    try {
      // Fetch all destinations from the 'destinations' table
      const { data, error } = await supabase
        .from('destinations')
        .select('*');
  
      if (error) {
        return res.status(500).json({message: error.message, Error: true, destinations: []});
      }
  
      // Return the response in JSON format
      res.status(200).json({
        message: 'Destinations retrieved successfully',
        Error: false,
        destinations: data,
      });
    } catch (err) {
        console.log(err.message);
      res.status(500).json({
        message: 'Internal server error',
        Error: true,
        destinations: [],
      });
    }
  };
  
  // Get destination by ID (middleware provides data in req.destination)
  export const getDestinationById = async (req, res) => {
    try {
      // Retrieve the destination from middleware
      const destination = req.destination;
  
      if (!destination) {
        return res.status(404).json({
          message: 'Destination not found',
          error: 'No destination provided by middleware',
          destinations: [],
        });
      }
  
      res.status(200).json({
        message: 'Destination retrieved successfully',
        error: null,
        destinations: req.destination,
      });
    } catch (err) {
        console.log(err.message);
      res.status(500).json({
        message: 'Internal server error',
        Error: true,
        destinations: [],
      });
    }
  };
export const createDestination = async (req,res) => {
  const {name, country, description, cost,image, days} = req.body;
  try {

    if(!name || !country || !description || !cost || !image || !days) {
      return res.status(400).json({message: 'All fields are required', Error: true});
    }
    const id = Math.floor(Math.random() * 10000) + 1;
    const obj = {
      destination_id: id,
      name,
      country,
      description,
      average_cost: cost,
      image,
      days,
    }
    const {data, error} = await supabase.from('destinations').insert(obj);
    if(error) {
      return res.status(500).json({message: error.message, Error: true, destinations: []});
    }
    return res.status(201).json({message: 'Destination created successfully', Error: false, destinations: data});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({message: 'Internal server error', Error: true, destinations: []});
  }
};

export const updateDestination = async (req,res) => {
  const {name, country, description, cost,image, days} = req.body;
  const {destId} = req.params;
  try {
    let updateObj = {};
    if(name) updateObj.name = name;
    if(country) updateObj.country = country;
    if(description) updateObj.description = description;
    if(cost) updateObj.average_cost = cost;
    if(image) updateObj.image = image;
    if(days) updateObj.days = days;

    updateObj = {
      name: name,
      country: country,
      description: description,
      average_cost: cost,
      image: image,
      days: days,
    }

    const {data, error} = await supabase.from('destinations').update(updateObj).eq('destination_id', destId).select();
    if(error) {
      return res.status(500).json({message: error.message, Error: true, destinations: []});
    }
    return res.status(200).json({message: 'Destination updated successfully', Error: false, destinations: data});
  } catch (err) {
    console.log(err.message);
    res.status(500).json({message: 'Internal server error', Error: true, destinations: []});
  }
};

export const deleteDestination = async (req,res) => {
    const { destId } = req.params;

    try {
        const { data, error } = await supabase.from('destinations').delete().eq('destination_id', destId).single();

        if(error) {
            return res.status(500).json({message: error.message, Error: true, destinations: []});
        }

        return res.status(204).json({message: 'destination deleted successfully', Error: false, destinations: data});
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Internal server error',
            error: err.message,
            destinations: [],
          });
    }
};