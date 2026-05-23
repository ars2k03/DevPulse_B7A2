import type { Request, Response } from "express";
import { pool } from '../data/db';

export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query;

    let query = `SELECT * FROM issues`;

    const conditions: string[] = [];

    if (queryParams.type) {
      conditions.push(`type = '${queryParams.type}'`);
    }

    if (queryParams.status) {
      conditions.push(`status = '${queryParams.status}'`);
    }

  
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

  
    if (queryParams.sort === "oldest") {
      query += ` ORDER BY created_at ASC`;
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const issuesResult = await pool.query(query);

    const issues = issuesResult.rows;

    const reporterIds = [
      ...new Set(
        issues.map(
          (issue) => issue.reporter_id
        )
      ),
    ];


    const usersQuery = `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
    `;

    const usersResult = await pool.query(
      usersQuery,
      [reporterIds]
    );

    const users = usersResult.rows;

    const issuesWithReporter = issues.map(
      (issue) => {
        const reporter = users.find(
          (user) =>
            user.id === issue.reporter_id
        );

        return {
          id: issue.id,
          title: issue.title,
          description: issue.description,
          type: issue.type,
          status: issue.status,
          reporter,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
        };
      }
    );

    res.status(200).json({
      success: true,
      data: issuesWithReporter,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
    });

  }
};
