import { Reservation } from "../../../models/Reservation";

import { Request, Response } from "express";

exports.updateReservation = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      reservation: updatedReservation,
    });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

export const createReservation = (req: Request, res: Response) => {
  res.status(200).json("success");
};

export const deleteReservation = (req: Request, res: Response) => {
  res.status(200).json("success");
};
