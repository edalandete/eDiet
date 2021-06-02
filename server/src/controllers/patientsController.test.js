const {
  createOne, getById, updateById,
} = require('./patientsController')();

const Patient = require('../models/patient.model');

jest.mock('../models/patient.model');

describe('Given patientsController', () => {
  describe('When it is called with a createOne function', () => {
    const req = {
      body: null,
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };
    describe('And the promise is resolved', () => {
      test('Then a new patient should be created', async () => {
        class PatientMock {
          constructor(name) {
            this.name = name;
          }

          // eslint-disable-next-line class-methods-use-this
          save() {}
        }

        const newPatient = new PatientMock('New User');

        Patient.mockReturnValueOnce(newPatient);
        await createOne(req, res);
        expect(res.json).toHaveBeenCalledWith(newPatient);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then an error should be send', async () => {
        Patient.mockReturnValueOnce({
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
        patientId: 1,
      },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a patient with an specific id should be shown', async () => {
        Patient.findById.mockImplementationOnce(() => ({
          populate: jest.fn().mockImplementationOnce(() => ({})),
        }));
        await getById(req, res);
        expect(res.json).toHaveBeenCalledWith({});
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Patient.findById.mockRejectedValueOnce();
        await getById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('When it is called with a updateById function', () => {
    const req = {
      body: null,
      params: {
        userId: null,
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a status 204 should be sent', async () => {
        Patient.findByIdAndUpdate.mockResolvedValueOnce({ id: 1, name: 'Man in the sun' });
        await updateById(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Man in the sun' });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Patient.findByIdAndUpdate.mockRejectedValueOnce();
        await updateById(req, res);
        expect(res.send).toHaveBeenCalledWith(404);
      });
    });
  });
});
