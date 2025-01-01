export const validateAgent = async (req, res, next) => {
    const { first_name, last_name, email, phone, region } = req.body;
  
    if (!first_name || !last_name || !email || !phone || !region) {
      return res.status(400).json({ error: "first_name, last_name, email, phone, region are required." });
    }

    next(); // Pass control to the next middleware/controller
  };

