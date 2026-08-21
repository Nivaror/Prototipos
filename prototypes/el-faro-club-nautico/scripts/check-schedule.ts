/**
 * Run: node --experimental-strip-types scripts/check-schedule.ts
 * Guards the one piece of real logic on the page: which shift is running,
 * including a shift that started yesterday and crosses midnight.
 */
import assert from "node:assert/strict";
import { SCHEDULE } from "../src/app/hours.ts";
import { closesAt, isOpenAt, isOpenDay, nextOpening } from "../src/app/schedule.ts";

const days = [0, 1, 2, 3, 4, 5, 6];

// Every declared shift reads as open at its start and closed a minute before it.
for (const d of days) {
  for (const s of SCHEDULE[d] ?? []) {
    assert.equal(isOpenAt(SCHEDULE, d, s.from), true, `día ${d}: abierto al iniciar ${s.from}`);
    assert.equal(
      isOpenAt(SCHEDULE, d, s.from - 1),
      false,
      `día ${d}: cerrado un minuto antes de ${s.from}`,
    );
    if (s.to <= 1440) {
      assert.equal(isOpenAt(SCHEDULE, d, s.to), false, `día ${d}: cerrado al terminar ${s.to}`);
    }
  }
}

// A shift crossing midnight keeps the NEXT calendar day open until it ends.
for (const d of days) {
  for (const s of SCHEDULE[d] ?? []) {
    if (s.to > 1440) {
      const next = (d + 1) % 7;
      assert.equal(
        isOpenAt(SCHEDULE, next, s.to - 1440 - 1),
        true,
        `día ${next}: sigue el turno de ayer`,
      );
      assert.equal(
        isOpenAt(SCHEDULE, next, s.to - 1440 + 1),
        false,
        `día ${next}: ya cerró el turno de ayer`,
      );
      assert.notEqual(closesAt(SCHEDULE, next, s.to - 1440 - 1), "", "informa hora de cierre");
    }
  }
}

// Closed days stay closed, and there is always a next opening to point at.
for (const d of days) {
  if (!isOpenDay(SCHEDULE, d)) {
    assert.equal(isOpenAt(SCHEDULE, d, 13 * 60), false, `día ${d} cerrado al mediodía`);
  }
  assert.notEqual(nextOpening(SCHEDULE, d, 23 * 60 + 59).at, "", `día ${d}: hay próxima apertura`);
}

console.log("schedule: ok");
