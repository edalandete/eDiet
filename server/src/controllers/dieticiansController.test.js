const {
  getAll, createOne, getById, deleteById, updateById, getAvailableHours,
} = require('./dieticiansController')();

const Dietician = require('../models/dietician.model');
const Appointment = require('../models/appointment.model');

jest.mock('../models/dietician.model');
jest.mock('../models/appointment.model');

describe('Given dieticiansController', () => {
  describe('When it is called with getAll function', () => {
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };
    describe('And the promise is resolved', () => {
      test('Then all users should be returned', async () => {
        Dietician.find.mockResolvedValueOnce([{ name: 'Edgar' }]);
        await getAll(null, res);

        expect(res.json).toHaveBeenCalledWith([{
          name: 'Edgar',
        }]);
      });
    });
    describe('And the promise is rejected', () => {
      test('Then a 404 status should be sent', async () => {
        Dietician.find.mockRejectedValueOnce();
        await getAll(null, res);
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
      test('Then a new user should be created', async () => {
        class UserMock {
          constructor(name) {
            this.name = name;
          }

          // eslint-disable-next-line class-methods-use-this
          save() {}
        }

        const newUser = new UserMock('New User');

        Dietician.mockReturnValueOnce(newUser);
        await createOne(req, res);
        expect(res.json).toHaveBeenCalledWith(newUser);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then an error should be send', async () => {
        Dietician.mockReturnValueOnce({
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
        userId: 1,
      },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a user with an specific id should be shown', async () => {
        Dietician.findById.mockResolvedValueOnce({ id: 1, name: 'Batman' });
        await getById(req, res);
        expect(res.json).toHaveBeenCalledWith({
          id: 1,
          name: 'Batman',
        });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Dietician.findById.mockRejectedValueOnce();
        await getById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('When it is called with a deleteById function', () => {
    const req = {
      body: null,
      params: {
        userId: null,
      },
    };
    const res = {
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a status 204 should be sent', async () => {
        Dietician.findByIdAndDelete.mockResolvedValueOnce();
        await deleteById(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Dietician.findByIdAndDelete.mockRejectedValueOnce();
        await deleteById(req, res);
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
        Dietician.findByIdAndUpdate.mockResolvedValueOnce({ id: 1, name: 'Man in the sun' });
        await updateById(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Man in the sun' });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Dietician.findByIdAndUpdate.mockRejectedValueOnce();
        await updateById(req, res);
        expect(res.send).toHaveBeenCalledWith(404);
      });
    });
  });
  describe('When it is called with getAvailableHours function', () => {
    const req = {
      json: jest.fn(),
      send: jest.fn(),
      body: { dieticianId: '' },
      params: { date: '' },
    };

    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };
    describe('And the promise is resolved', () => {
      test('Then available hours should be returned', async () => {
        Dietician.findById.mockResolvedValueOnce([{ schedule: { monday: ['1000', '1100'] } }]);
        Appointment.find.mockResolvedValueOnce([{ time: '1000' }]);
        const calculateAvailableHours = jest.fn(() => ['1100']);
        await getAvailableHours(req, res);

        expect(res.json).toHaveBeenCalledWith(calculateAvailableHours);
      });
    });
  });
});
