export const isValidTime = (startTime, endTime) => {
  const timePattern = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)(?::(?:[0-5]\d))?$/;
  const isTime = timePattern.test(startTime) && timePattern.test(endTime);
  return isTime;
};
