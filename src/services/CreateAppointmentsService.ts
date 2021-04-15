import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';


interface Request {
  provider_id: string;
  date: Date;
}

/**
 * SOLID
 *
 * Single Responsability Principle (S)
 * Dependecy Inversion (D)
 *
 *
 *
 * O service fica somente com uma responsabilidade.
 * DRY: Don't repeat yourself (Não repita regra de negócio)
 */

class CreateAppointmentService {

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date); // regra de negócio

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }

}

export default CreateAppointmentService;
