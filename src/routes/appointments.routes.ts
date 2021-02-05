import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


// SoC: Separation of Concerns (Separação de Preocupações)
// DTO - Data Transfer Object
// Rota: receber a requisição - Chamar outro arquivo para tratar a requisição - e retornar a resposta.
// Rota pode transformar dados.
// Services é responsável por toda regra de negócio.

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});


appointmentsRouter.post('/', (request, response) => {

  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // transformação de dado

    const createAppointmentService = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointmentService.execute({ date: parsedDate, provider });

    return response.json(appointment);

  } catch (err) {
    return response.status(400).json({ error: err.message })
  }

});

export default appointmentsRouter;


