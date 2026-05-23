import type { Request, Response } from "express";
import { createUserService } from "../service/auth.createUserService";

export const signup = async (req: Request, res: Response) => {
  try {
    const {name, email, password, role} = req.body;

    const result = await createUserService(name, email, password, role);
    
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error : (error as Error).message,
    });
    
  }
};

