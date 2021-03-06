import { Household } from "../../../models/Household";

import { Member } from "../../../models/Member";

import { Request, Response } from "express";

export const getCurrentUser = async (req: any, res: any) => {
  let user = { ...req.user.toObject() };

  try {
    let household = await Household.findOne({ user: user._id });

    user["household"] = household;

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHouseholdByUserId = async (req: any, res: any) => {
  let { id } = req.params;

  let household;

  try {
    household = await Household.findOne({ user: id });

    if (!household) {
      household = await Household.create({ user: id });
    }

    // Find all members that belong to their household
    let members = await Member.find({ household: household._id });

    res.status(200).json({ household, members });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getReservations = (req: Request, res: Response) => {
  res.status(200).json("Hello");
};

export const createReservation = (req: Request, res: Response) => {
  res.status(200).json("Hello");
};

export const deleteReservation = (req: Request, res: Response) => {
  res.status(200).json("Hello");
};

export const updateReservation = (req: Request, res: Response) => {
  res.status(200).json("Hello");
};
