import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool } from "../data/db";

export const signup = async (req: Request, res: Response) => {
  try {
    const {name, email, password, role} = req.body;
    
    const hashPassword = await bcrypt.hash(password, 10);
    
    const query = `
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, created_at, updated_at
    `;
    
    const values = [name, email, hashPassword, role];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error : (error as Error).message,
    });
    
  }
};

