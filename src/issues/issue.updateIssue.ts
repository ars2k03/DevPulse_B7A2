import type { Request, Response } from "express";
import { pool } from '../data/db';


export const updateIssue = async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.user;

    const data = req.body;

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

    if (user.role !== "maintainer") {
      
      if (issue.reporter_id !== user.id) {
        throw new Error(
          "You are not allowed to update this issue"
        );
      }

      if (issue.status !== "open") {
        throw new Error(
          "Only open issues can be updated"
        );
      }
    }

    const updateQuery = `
      UPDATE issues
      SET
        title = $1,
        description = $2,
        type = $3,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `;

    const values = [
      data.title,
      data.description,
      data.type,
      id,
    ];

    const result = await pool.query(
      updateQuery,
      values
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result.rows[0],
    });

  } catch (error) {

    res.status(403).json({
      success: false,
      message: (error as Error).message,
    });

  }
};