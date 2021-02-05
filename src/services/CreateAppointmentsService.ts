import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';


interface Request {
  provider: string;
  date: Date;
}

/**
 * Dependecy Inversion (SOLID)
 * O service fica somente com uma responsabilidade.
 * DRY: Don't repeat yourself (Não repita regra de negócio)
 */

class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }


  public execute({ provider, date }: Request): Appointment {

    const appointmentDate = startOfHour(date); // regra de negócio

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }

}

export default CreateAppointmentService;
