// Mock reservation logic for the lunch window - the one slot the lead's
// reviews explicitly call out as "recommended to book." No real backend;
// this proves the flow for the pitch. Lunch hours aren't in the source data,
// so a generic midday window is used as plausible filler (allowed for
// prototype demo content, see core/prototype-workflow.md).
export const LUNCH_START_MIN = 12 * 60;
export const LUNCH_END_MIN = 15 * 60 + 30;
const SLOT_STEP_MIN = 30;

export function lunchSlots(): string[] {
  const slots: string[] = [];
  for (let m = LUNCH_START_MIN; m <= LUNCH_END_MIN; m += SLOT_STEP_MIN) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`);
  }
  return slots;
}

export const MIN_PARTY = 1;
export const MAX_PARTY = 10;

export function isValidParty(size: number): boolean {
  return Number.isInteger(size) && size >= MIN_PARTY && size <= MAX_PARTY;
}
