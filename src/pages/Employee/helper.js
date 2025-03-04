export const serialiseEmployeeData = (data) => {
    if (!Array.isArray(data) || data.length <= 0) {
        return []
    }

    return data.toReversed().map((item) => {
        return {
          date: item.date,
          sessions: item.sessions,
          perDayHours: calculateTotalHours([item]),
        };
    })

}

function calculateTotalHours(data) {
  let totalMilliseconds = 0;

  data.forEach((day) => {
    day.sessions.forEach((session) => {
      let checkIn = new Date(session.checkInTime);
      let checkOut = session.checkOutTime
        ? new Date(session.checkOutTime)
        : new Date(checkIn);

      // If checkout is null, assume 8 PM of the same day
      if (!session.checkOutTime) {
        checkOut.setHours(20, 0, 0, 0);
      }

      totalMilliseconds += checkOut - checkIn;
    });
  });

  let totalHours = totalMilliseconds / (1000 * 60 * 60);
  return totalHours;
}
