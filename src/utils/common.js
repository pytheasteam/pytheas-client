export default class Common {
  static getMonthName(month) {
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    return monthNames[month];
  }

  static date_diff_indays(date1, date2) {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24) +
        1
    );
  }

  static formatName(attractionName, maxlimit) {
    return attractionName && attractionName.length > maxlimit
      ? attractionName.substring(0, maxlimit - 3) + "..."
      : attractionName;
  }
}
