const API_BASE_URL = "https://api.argentinadatos.com/v1/feriados";
const BAD_HOLIDAY_TYPES = ["inamovible", "puente"];
const ACCEPTABLE_HOLIDAY_TYPES = ["trasladable"];

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function parseDate(dateText) {
  const normalizedDateText = dateText.replaceAll("/", "-");
  const date = new Date(`${normalizedDateText}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Fecha invalida: ${dateText}`);
  }

  return date;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function getTripDates(startDate, durationInDays) {
  if (!Number.isInteger(durationInDays) || durationInDays <= 0) {
    throw new Error("La duracion debe ser un numero entero mayor a cero");
  }

  const firstDate = parseDate(startDate);
  const dates = [];

  for (let day = 0; day < durationInDays; day++) {
    dates.push(formatDate(addDays(firstDate, day)));
  }

  return dates;
}

function getTripYears(startDate, durationInDays) {
  return [...new Set(getTripDates(startDate, durationInDays).map(date => date.slice(0, 4)))];
}

async function fetchHolidaysByYear(year, fetchFunction = fetch) {
  const response = await fetchFunction(`${API_BASE_URL}/${year}`);

  if (!response.ok) {
    throw new Error(`No se pudieron obtener los feriados de ${year}`);
  }

  return response.json();
}

async function fetchHolidaysForTrips(startDates, durationInDays, fetchFunction = fetch) {
  const years = [
    ...new Set(startDates.flatMap(startDate => getTripYears(startDate, durationInDays)))
  ];

  const holidaysByYear = await Promise.all(
    years.map(year => fetchHolidaysByYear(year, fetchFunction))
  );

  return holidaysByYear.flat();
}

function findTripHolidays(startDate, durationInDays, holidays) {
  const tripDates = new Set(getTripDates(startDate, durationInDays));
  return holidays.filter(holiday => tripDates.has(holiday.fecha));
}

function classifyTrip(startDate, durationInDays, holidays) {
  const tripHolidays = findTripHolidays(startDate, durationInDays, holidays);
  const hasBadHoliday = tripHolidays.some(holiday =>
    BAD_HOLIDAY_TYPES.includes(holiday.tipo)
  );
  const hasOnlyAcceptableHolidays =
    tripHolidays.length > 0 &&
    tripHolidays.every(holiday => ACCEPTABLE_HOLIDAY_TYPES.includes(holiday.tipo));

  if (hasBadHoliday) {
    return {
      startDate,
      score: 2,
      label: "mala opcion",
      reason: "Tiene feriados inamovibles o puente",
      holidays: tripHolidays
    };
  }

  if (hasOnlyAcceptableHolidays) {
    return {
      startDate,
      score: 1,
      label: "opcion aceptable",
      reason: "Solo tiene feriados trasladables",
      holidays: tripHolidays
    };
  }

  return {
    startDate,
    score: 0,
    label: "mejor opcion",
    reason: "No tiene feriados",
    holidays: []
  };
}

function sortTripOptions(startDates, durationInDays, holidays) {
  return startDates
    .map((startDate, inputIndex) => ({
      ...classifyTrip(startDate, durationInDays, holidays),
      inputIndex
    }))
    .sort((firstOption, secondOption) => {
      if (firstOption.score !== secondOption.score) {
        return firstOption.score - secondOption.score;
      }

      return firstOption.inputIndex - secondOption.inputIndex;
    })
    .map(({ inputIndex, ...option }) => option);
}

async function findBestTravelDates(startDates, durationInDays, fetchFunction = fetch) {
  const holidays = await fetchHolidaysForTrips(startDates, durationInDays, fetchFunction);
  return sortTripOptions(startDates, durationInDays, holidays);
}

function printTripOptions(options) {
  for (const option of options) {
    console.log(`${option.startDate}: ${option.label} - ${option.reason}`);

    for (const holiday of option.holidays) {
      console.log(`  ${holiday.fecha} | ${holiday.tipo} | ${holiday.nombre}`);
    }
  }
}

async function main() {
  const startDates = ["2026/06/10", "2026/06/15", "2026/06/20"];
  const durationInDays = 5;
  const options = await findBestTravelDates(startDates, durationInDays);

  printTripOptions(options);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

export {
  ACCEPTABLE_HOLIDAY_TYPES,
  BAD_HOLIDAY_TYPES,
  classifyTrip,
  fetchHolidaysForTrips,
  findBestTravelDates,
  findTripHolidays,
  getTripDates,
  sortTripOptions
};
