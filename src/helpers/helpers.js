/**
 * Helpers Functions
 */
import moment from "moment";

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      alpha +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
}

export function strToDateObject(dateStr, format) {
  let newdate = moment(dateStr, format);
  return newdate.toDate();
}

/**
 * Get Day Date
 *
 * Takes in js dates
 */
export function getTheDate(date) {
  return moment(date).format("DD/MMM/YYYY");
}

export function formatDate(date, format) {
  return moment(date).format(format);
}
/**
 * Get Date only
 *
 * Takes in js dates
 */
export function getDate(date) {
  return moment(date).format("DD/MMM/YYYY");
}
/**
 * Get DateTime
 *
 * Takes in js dates
 */
export function getDateTime(date, format) {
  let formatDate = format ? format : "llll";
  return moment(date).format(formatDate);
}
/**
 * Get Time
 *
 * Takes in js dates
 */
export function getTheTime(date) {
  return moment(date).format("LT");
}

export function isSameDay(start, end) {
  return moment(start).isSame(end, "day");
}

export function getEventTime(time, allDay) {
  if (allDay) {
    return "All Day";
  } else {
    return moment(time).format("hh:mma");
  }
}

export function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
  let location = url.pathname;
  let path = location.split("/");
  return path[1];
}

/**
 * Convert Month
 */
export function convertMonth(mm) {
  var month;
  switch (mm) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
  }
  return month;
}
/**
 * Convert Day
 */
export function convertDay(d) {
  var day;
  switch (d) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  return day;
}

export const listOptions = {
  filterType: "multiselect",
  responsive: "scrollFullHeight",
  download: false,
  print: false,
  selectableRows: false,
  elevation: 0,
  rowsPerPage: 20,
  rowsPerPageOptions: [20, 30, 60, 100],
  searchOpen: true,
  textLabels: { body: { noMatch: "No data to display" } }
};

export function amountRounding(decimalPlaces, amount) {
  // let amountRounded = Math.round(amount*100)/100;

  if (typeof amount === "string") {
    amount = parseFloat(amount)
  }
  let amountRounded = Number(Math.round(amount + "e" + decimalPlaces) + "e-" + decimalPlaces)
  return amountRounded.toFixed(decimalPlaces);

  // https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8#:~:text=Or%2C%20if%20you%20want%20to,by%20100%20to%20get%200.23.
  // https://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
}