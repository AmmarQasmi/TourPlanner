import jwt from 'jsonwebtoken';

export const generatetokenSetCookie = (res, clientId, isLogin, email) => {
    const payload = {
        id: clientId,
        status: isLogin,
        is_agent: false,
        email: email
    }

    const token = jwt.sign(payload, 'my_secret', {
        expiresIn: "2h"
    })

    res.cookie("client_token", token, {
        httpOnly: true, // prevents XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", //prevents CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return token;
};