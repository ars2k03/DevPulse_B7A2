import type { Request, Response } from "express";
import { pool } from '../data/db';

export const getSingleIssue = async (req: Request,res: Response) => {
  try {
    const { id } = req.params;

    const issueQuery = `
    SELECT * FROM issues
    WHERE id = $1
    `;

    const issueResult = await pool.query(
      issueQuery,
      [id]
    );

    const issue = issueResult.rows[0];


    if (!issue) {
      throw new Error("Issue not found");
    }


    const userQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = $1
    `;

    const userResult = await pool.query(
      userQuery,
      [issue.reporter_id]
    );

    const reporter = userResult.rows[0];

    const result = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    }

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: (error as Error).message,
    });
  }
};