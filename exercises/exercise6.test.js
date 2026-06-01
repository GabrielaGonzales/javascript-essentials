import { describe, expect, test } from "vitest";

import {
  classifyTrip,
  findBestTravelDates,
  getTripDates,
  sortTripOptions
} from "./exercise6.js";

const holidays2026 = [
  {
    fecha: "2026-06-15",
    tipo: "trasladable",
    nombre: "Paso a la Inmortalidad del General Martin Guemes"
  },
  {
    fecha: "2026-06-20",
    tipo: "inamovible",
    nombre: "Paso a la Inmortalidad del General Manuel Belgrano"
  },
  {
    fecha: "2026-07-10",
    tipo: "puente",
    nombre: "Puente turistico no laborable"
  }
];

describe("exercise6", () => {
  test("getTripDates returns every date included in the trip duration", () => {
    expect(getTripDates("2026/06/10", 5)).toEqual([
      "2026-06-10",
      "2026-06-11",
      "2026-06-12",
      "2026-06-13",
      "2026-06-14"
    ]);
  });

  test("classifyTrip prefers trips without holidays", () => {
    expect(classifyTrip("2026/06/10", 5, holidays2026)).toEqual({
      startDate: "2026/06/10",
      score: 0,
      label: "mejor opcion",
      reason: "No tiene feriados",
      holidays: []
    });
  });

  test("classifyTrip accepts trips with only trasladable holidays", () => {
    const option = classifyTrip("2026/06/15", 3, holidays2026);

    expect(option.score).toBe(1);
    expect(option.label).toBe("opcion aceptable");
    expect(option.holidays.map(holiday => holiday.tipo)).toEqual(["trasladable"]);
  });

  test("classifyTrip marks inamovible and puente holidays as bad options", () => {
    const inamovibleOption = classifyTrip("2026/06/20", 3, holidays2026);
    const puenteOption = classifyTrip("2026/07/09", 3, holidays2026);

    expect(inamovibleOption.score).toBe(2);
    expect(inamovibleOption.label).toBe("mala opcion");
    expect(puenteOption.score).toBe(2);
    expect(puenteOption.label).toBe("mala opcion");
  });

  test("sortTripOptions orders best options first and bad options last", () => {
    const sortedOptions = sortTripOptions(
      ["2026/06/20", "2026/06/15", "2026/06/10"],
      5,
      holidays2026
    );

    expect(sortedOptions.map(option => option.startDate)).toEqual([
      "2026/06/10",
      "2026/06/15",
      "2026/06/20"
    ]);
  });

  test("findBestTravelDates consumes the holiday API using fetch", async () => {
    const calls = [];
    const fakeFetch = async url => {
      calls.push(url);

      return {
        ok: true,
        async json() {
          return holidays2026;
        }
      };
    };

    const options = await findBestTravelDates(
      ["2026/06/10", "2026/06/15", "2026/06/20"],
      5,
      fakeFetch
    );

    expect(calls).toEqual(["https://api.argentinadatos.com/v1/feriados/2026"]);
    expect(options.map(option => option.startDate)).toEqual([
      "2026/06/10",
      "2026/06/15",
      "2026/06/20"
    ]);
  });
});
