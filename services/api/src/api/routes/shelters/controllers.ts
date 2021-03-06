import { Reservation } from "../../../models/Reservation";
import { Shelter } from "../../../models/Shelter";

export const createShelter = async (req: any, res: any) => {
  try {
    let newShelter = await Shelter.create(req.body);

    res.status(200).json({ shelter: newShelter });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const createReservation = async (req: any, res: any) => {
  try {
    let newReservation = await Reservation.create(req.body);

    res.status(200).json({
      reservation: newReservation,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const getReservations = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    let reservations = await Reservation.find({ shelterId: id }).populate('userId')

    res.status(200).json({
      reservations,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
