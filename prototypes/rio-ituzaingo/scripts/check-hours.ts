/**
 * Run: node --experimental-strip-types scripts/check-hours.ts
 * The only non-obvious logic on this page is the after-midnight schedule.
 */
import assert from "node:assert/strict";
import { closesAt, hasNightService, isOpenAt, nextOpening } from "../src/app/hours.ts";

// Saturday (6) lunch, night, and the 3 AM tail that belongs to Saturday's shift.
assert.equal(isOpenAt(6, 12 * 60), true, "sábado mediodía abierto");
assert.equal(isOpenAt(6, 17 * 60), false, "sábado 17:00 entre turnos");
assert.equal(isOpenAt(6, 22 * 60), true, "sábado noche abierto");

// Sunday 03:00 — still Saturday's shift (ends 04:00), even though getDay() says Sunday.
assert.equal(isOpenAt(0, 3 * 60), true, "domingo 3 AM sigue el turno del sábado");
assert.equal(closesAt(0, 3 * 60), "04:00", "cierra 04:00");
assert.equal(isOpenAt(0, 5 * 60), false, "domingo 5 AM ya cerrado");

// Monday is closed outright, and Monday 01:00 is Sunday's midnight close, not open.
assert.equal(isOpenAt(1, 13 * 60), false, "lunes cerrado");
assert.equal(isOpenAt(1, 1 * 60), false, "domingo cierra a las 00:00, no sigue");

// Tuesday has lunch only; nothing at night.
assert.equal(isOpenAt(2, 21 * 60), false, "martes no abre de noche");
assert.equal(hasNightService(2), false, "martes sin turno noche");
assert.equal(hasNightService(5), true, "viernes con turno noche");

// Next opening rolls over closed days.
assert.deepEqual(nextOpening(1, 13 * 60), { when: "mañana", at: "11:00" }, "lunes → martes 11:00");
assert.deepEqual(nextOpening(2, 16 * 60), { when: "mañana", at: "11:00" }, "martes tarde → miércoles");

console.log("hours: ok");
