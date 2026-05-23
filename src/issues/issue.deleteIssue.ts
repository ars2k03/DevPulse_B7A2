import type { Request, Response } from "express";
import { pool } from '../data/db';

export const deleteIssue = async (req:Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.user;

    if (user.role !== "maintainer") {
      throw new Error(
        "Only maintainer can delete issues"
      );
    }
    
    const findQuery = `
      SELECT * FROM issues
      WHERE id = $1
    `;

    const issueResult = await pool.query(
      findQuery,
      [id]
    );

    const issue = issueResult.rows[0];

    if (!issue) {
      throw new Error("Issue not found");
    }


    const deleteQuery = `
      DELETE FROM issues
      WHERE id = $1
    `;

    await pool.query(deleteQuery, [id]);

    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: (error as Error).message,
    });

  }
};