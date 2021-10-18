import { EntityRepository, Repository } from 'typeorm';
import Appoitment from '@modules/appointments/infra/typeorm/entities/Appointment';


@EntityRepository(Appoitment)
class AppointmentsRepository extends Repository<Appoitment> {
  public async findByDate(date: Date): Promise<Appoitment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

}

export default AppointmentsRepository;


/*
// Ler, alterar, deletar, criar, Listar.
// Detentor das operações que vamos fazer em cima dos dados da aplicação.
*/
