import type { Request, Response } from "express";
import { pool } from '../data/db';

export const createIssue = async ( req: Request, res: Response ) => {
  try {
    const { title, description, type } = req.body;
    
    const reporter_id = req.user.id;

    const query = `
        INSERT INTO issues
        (
          title,
          description,
          type,
          reporter_id
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `; 

    const values = [
        title,
        description,
        type,
        reporter_id,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create issue",
    });
  }
};