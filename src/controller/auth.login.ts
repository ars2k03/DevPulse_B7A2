import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../data/db";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
  
    const query = `
    SELECT * FROM users WHERE email = $1
    `;

    const result = await pool.query(query, [email]);

    const user = result.rows[0];

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );
  
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      }
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: (error as Error).message,
    });
    
  }
};