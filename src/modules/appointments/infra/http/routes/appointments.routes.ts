import 'reflect-metadata';
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';


const appointmentsRouter = Router();


// SoC: Separation of Concerns (Separação de Preocupações)
// DTO - Data Transfer Object
// Rota: receber a requisição - Chamar outro arquivo para tratar a requisição - e retornar a resposta.
// Rota pode transformar dados.
// Services é responsável por toda regra de negócio.

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date); // transformação de dado

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

  return response.json(appointment);



});

export default appointmentsRouter;


