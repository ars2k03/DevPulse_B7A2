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
