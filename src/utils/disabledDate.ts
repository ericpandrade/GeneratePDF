import moment from "moment";

export function disabledDate(current: moment.Moment) {
  const weekEnd = moment().endOf("day");
  return !weekEnd.isAfter(current);
}
