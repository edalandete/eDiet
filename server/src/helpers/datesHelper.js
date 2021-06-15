const dayjs = require('dayjs');
const weekDays = require('../assets/weekdays');

function isHourIncluded(availableHours, takenHours, hour) {
  return availableHours.includes(hour) && takenHours.includes(hour);
}
function calculateAvailableHours(schedule, date, appointments) {
  const workingHours = schedule[weekDays[dayjs(date).day()]];
  const takenHours = appointments && appointments.map(({ time }) => time);
  return workingHours.filter(
    (hour) => !isHourIncluded(workingHours, takenHours, hour),
  );
}

module.exports = {
  calculateAvailableHours,
};
