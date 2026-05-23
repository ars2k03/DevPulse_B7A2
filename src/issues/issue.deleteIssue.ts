import type { Request, Response } from "express";
import { deleteIssueService } from "../service/issue.service";

export const deleteIssue = async (req:Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = req.user;

    await deleteIssueService(id as string, user);

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