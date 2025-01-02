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
export const createDestination = async (req,res) => {};

export const updateDestination = async (req,res) => {};

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