import type { Request, Response } from "express";
import { updateIssueService } from "../service/issue.service";


export const updateIssue = async ( req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.user;

    const data = req.body;

    const result = await updateIssueService( id as string, req.body, user);
    
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