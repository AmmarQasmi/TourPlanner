import { supabase } from '../db/connect.js';
import { generatetokenSetCookie } from '../utils/generateCookieSetTokenClient.js';
import { generateToken } from '../utils/generateToken.js';
import { transporter } from '../nodemailer/nodemailer.config.js';
import { VERIFICATION_EMAIL_TEMPLATE } from '../nodemailer/emailTemplates.js';
import { WELCOME_EMAIL_TEMPLATE } from '../nodemailer/emailTemplates.js';
// returns with order desc wrt to time
export const getAllClients = async (req, res) => {
    try {
        const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });

        if (error) {
            return res.status(400).json({ message: error.message, Error: true });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'Error 404 Client not found', Error: true, Clients: null })
        }

        return res.status(200).json({ message: 'Client found', Clients: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};

export const getClientById = async (req, res) => {
    const { id } = req.params;

    // Log the client_id to debug
    console.log('Received client_id:', id);
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .eq('client_id', id)
            .single();

        if (error) {
            console.error("Supabase Error:", error);
            return res.status(500).json({ message: 'Error fetching client data', error });
        }

        if (data) {
            return res.status(200).json({
                message: 'Client found',
                Clients: data,
            });
        } else {
            return res.status(404).json({ message: 'Client not found' });
        }
    } catch (err) {
        console.error('Error fetching client by ID:', err);
        return res.status(500).json({ message: 'Failed to fetch client data' });
    }
};

export const createClient = async (req, res) => {
    const { first_name: fname, last_name: lname, email, password, phone, address } = req.body;

    if (!fname || !lname || !email || !password || !phone || !address) {
        return res.status(400).json({ message: 'Bad request, all fields required', Error: true });
    }

    try {
        const verificationToken = generateToken();
        const is_login = 'Y';
        const id = Math.floor(Math.random() * 1000) + 1; // random id generation.
        const client = {
            client_id: id,
            first_name: fname,
            last_name: lname,
            email,
            phone,
            address,
            password,
            is_login,
            verificationToken
        };
        const { data, error } = await supabase.from('clients').insert(client).select();

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        const token = generatetokenSetCookie(res, id, is_login, email);

        const mailOptions = {
            from: "zainrasoolhashmi@gmail.com",
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                verificationToken
            ),
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        return res.status(201).json({ message: 'Client created successfully, verification email sent', Clients: data, Error: false, token, verificationToken });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const { data, error } = await supabase.from('clients').select('*').eq('verificationToken', code).single();

        if (!data) {
            return res.status(404).json({ message: 'Client not found', Error: true });
        }

        if (error) {
            return res.status(500).json({ message: error.message, Error: true });
        }

        if (Date.now() > data.TokenExpiry) {
            return res.status(401).json({ message: "token expired, please signin again", Error: true });
        }

        const { error: UpdateError } = await supabase.from('clients').update({
            is_verified: true,
            verificationToken: null,
            TokenExpiry: null
        }).eq('email', data.email);

        if (UpdateError) {
            return res.status(500).json({ message: UpdateError.message, Error: true });
        }

        const name = `${data.first_name} ${data.last_name}`;

        // send welcome email
        const mailOptions = {
            from: "zainrasoolhashmi@gmail.com",
            to: data.email,
            subject: "Welcome On-Board!",
            html: WELCOME_EMAIL_TEMPLATE.replace(/{username}/g, name),
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        return res.status(200).json({ message: 'Verification successful!', Error: false, verified: true });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', Error: true, verified: false });
    }
};

export const updateClient = async (req, res) => {
    const { clientId } = req.params;
    const { fname, lname, email, phone, address, password } = req.body;

    try {
        // Prepare data for update (excluding undefined fields)
        const updateData = {};
        if (fname) updateData.first_name = fname;
        if (lname) updateData.last_name = lname;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;
        if (password) {
            updateData.password = password;
        }

        const { data, error } = await supabase
            .from('clients')
            .update(updateData)
            .eq('client_id', clientId).select();

        if (error) {
            return res.status(400).json({ message: error.message });
        }
        // Respond with updated data
        res.status(200).json({ message: 'Client updated successfully', Clinets: data, Error: false });
    } catch (error) {
        console.error('Error updating client:', error.message);
        res.status(500).json({ message: 'Internal Server Error', Error: true });
    }
};

export const deleteClient = async (req, res) => {
    const { clientId } = req.params;
    try {
        const { data, error } = await supabase.from('clients').delete().eq('client_id', clientId).select();

        if (error) {
            return res.status(500).json({ message: 'Internal server error', Error: true });
        }

        return res.status(204).json({ message: 'Client deleted', Client: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Internal server error', Error: true });
    }
};


