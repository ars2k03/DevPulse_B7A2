import type { Request, Response } from "express";
import { createIssueService } from "../service/issue.service";

export const createIssue = async ( req: Request, res: Response ) => {
  try {
    const { title, description, type } = req.body;
    
    const reporter_id = req.user.id;

    const result = await createIssueService(
        title,
        description,
        type,
        reporter_id
      );

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
