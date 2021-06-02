const {
  getAll, createOne, getById, deleteById, updateById, getByType,
} = require('./dietsController')();

const Diet = require('../models/diet.model');

jest.mock('../models/diet.model');

describe('Given dieticiansController', () => {
  describe('When it is called with getAll function', () => {
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };
    describe('And the promise is resolved', () => {
      test('Then all diets should be returned', async () => {
        Diet.find.mockResolvedValueOnce([{ name: 'diet1' }]);
        await getAll(null, res);

        expect(res.json).toHaveBeenCalledWith([{
          name: 'diet1',
        }]);
      });
    });
    describe('And the promise is rejected', () => {
      test('Then a 404 status should be sent', async () => {
        Diet.find.mockRejectedValueOnce();
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
      test('Then a new diet should be created', async () => {
        class DietMock {
          constructor(name) {
            this.name = name;
          }

          // eslint-disable-next-line class-methods-use-this
          save() {}
        }

        const newDiet = new DietMock('new diet');

        Diet.mockReturnValueOnce(newDiet);
        await createOne(req, res);
        expect(res.json).toHaveBeenCalledWith(newDiet);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then an error should be send', async () => {
        Diet.mockReturnValueOnce({
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
        dietId: 1,
      },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a diet with an specific id should be shown', async () => {
        Diet.findById.mockResolvedValueOnce({ id: 1, name: 'diet1' });
        await getById(req, res);
        expect(res.json).toHaveBeenCalledWith({
          id: 1,
          name: 'diet1',
        });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Diet.findById.mockRejectedValueOnce();
        await getById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('When it is called with a getById function', () => {
    const req = {
      body: null,
      params: {
        dietId: 1,
      },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a diet with an specific id should be shown', async () => {
        Diet.find.mockResolvedValueOnce([{ id: 1, type: 'Hypertrophy' }]);
        await getByType(req, res);
        expect(res.json).toHaveBeenCalledWith([{ id: 1, type: 'Hypertrophy' }]);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Diet.find.mockRejectedValueOnce();
        await getByType(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('When it is called with a deleteById function', () => {
    const req = {
      body: null,
      params: {
        dietId: null,
      },
    };
    const res = {
      status: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a status 204 should be sent', async () => {
        Diet.findByIdAndDelete.mockResolvedValueOnce();
        await deleteById(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Diet.findByIdAndDelete.mockRejectedValueOnce();
        await deleteById(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
      });
    });
  });
  describe('When it is called with a updateById function', () => {
    const req = {
      body: null,
      params: {
        dietId: null,
      },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    describe('And the promise is resolved', () => {
      test('Then a status 204 should be sent', async () => {
        Diet.findByIdAndUpdate.mockResolvedValueOnce({ id: 1, breakfast: 'bacon with eggs' });
        await updateById(req, res);
        expect(res.json).toHaveBeenCalledWith({ id: 1, breakfast: 'bacon with eggs' });
      });
    });

    describe('And the promise is rejected', () => {
      test('Then the status code 404 should be sent', async () => {
        Diet.findByIdAndUpdate.mockRejectedValueOnce();
        await updateById(req, res);
        expect(res.send).toHaveBeenCalledWith(404);
      });
    });
  });
});
