const {
  getDayAppointments, createOne, getById, deleteById, updateById,
} = require('./appointmentsController')();

const Appointment = require('../models/appointment.model');

jest.mock('../models/appointment.model');

describe('Given appointmentsController', () => {
  describe('When it is called with getDayAppointments function', () => {
    const req = {
      params: {
        date: '',
      },
      body: {
        dieticianId: '',
      },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };
    describe('And the promise is resolved', () => {
      test('Then all appointments from the day should be returned', async () => {
        Appointment.find.mockResolvedValueOnce([{ patientName: 'Edgar' }]);
        await getDayAppointments(req, res);

        expect(res.json).toHaveBeenCalledWith([{
          patientName: 'Edgar',
        }]);
      });
    });
    describe('And the promise is rejected', () => {
      test('Then a 404 status should be sent', async () => {
        Appointment.find.mockRejectedValueOnce();
        await getDayAppointments(req, res);
        expect(res.send).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('When it is called with a createOne function', () => {
    const req = {
      body: null,
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };
    describe('And the promise is resolved', () => {
      test('Then a new appointment should be created', async () => {
        class AppointmentMock {
          constructor(name) {
            this.name = name;
          }

          // eslint-disable-next-line class-methods-use-this
          save() {}
        }

        const newAppointment = new AppointmentMock('New Appointment');

        Appointment.mockReturnValueOnce(newAppointment);
        await createOne(req, res);
        expect(res.json).toHaveBeenCalledWith(newAppointment);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then an error should be send', async () => {
        Appointment.mockReturnValueOnce({
          save: jest.fn().mockRejectedValueOnce('error'),
        });
        await createOne(req, res);
        expect(res.send).toHaveBeenCalledWith('error');
      });
    });
  });

  describe('When it is called with a getById function', () => {
    const req = {
      body: null,
      params: {
        appointmentId: 1,
      },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then an appointment with an specific id should be shown', async () => {
        Appointment.findById.mockResolvedValueOnce({ id: 1, patientName: 'Batman' });
        await getById(req, res);
        expect(res.json).toHaveBeenCalledWith({
          id: 1,
          patientName: 'Batman',
        });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Appointment.findById.mockRejectedValueOnce();
        await getById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('When it is called with a deleteById function', () => {
    const req = {
      body: null,
      params: {
        appointmentId: null,
      },
    };
    const res = {
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a status 204 should be sent', async () => {
        Appointment.findByIdAndDelete.mockResolvedValueOnce();
        await deleteById(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Appointment.findByIdAndDelete.mockRejectedValueOnce();
        await deleteById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });
  describe('When it is called with a updateById function', () => {
    const req = {
      body: null,
      params: {
        appointmentId: null,
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a status 204 should be sent', async () => {
        Appointment.findByIdAndUpdate.mockResolvedValueOnce({ id: 1, time: '1000' });
        await updateById(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, time: '1000' });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Appointment.findByIdAndUpdate.mockRejectedValueOnce();
        await updateById(req, res);
        expect(res.send).toHaveBeenCalledWith(404);
      });
    });
  });
});
