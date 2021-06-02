const { calculateAvailableHours } = require('./datesHelper');

describe('Given a calculateAvailableHours function ', () => {
  const scenarios = [
    {
      schedule: { tuesday: ['1000', '1100'] },
      date: '20210601',
      appointments: [{ time: '1000' }],
      result: ['1100'],
    },
  ];

  scenarios.forEach(({
    schedule, date, appointments, result,
  }) => {
    describe(`When invoked with values schedule: ${schedule}, date: ${date} and appointments: ${appointments}`, () => {
      test(`Then return ${result}`, () => {
        const availableHours = calculateAvailableHours(schedule, date, appointments);
        expect(availableHours).toEqual(result);
      });
    });
  });
});
