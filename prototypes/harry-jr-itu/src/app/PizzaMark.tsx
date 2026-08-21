export function PizzaMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M36 6 L66 60 A34 34 0 0 1 6 60 Z"
        fill="var(--ember)"
        stroke="var(--ember-deep)"
        strokeWidth="2"
      />
      <path
        d="M36 6 L66 60 A34 34 0 0 1 6 60 Z"
        fill="none"
        stroke="var(--crust)"
        strokeWidth="5"
        strokeDasharray="0 0"
        transform="translate(0 0)"
      />
      <circle cx="30" cy="34" r="3.4" fill="var(--ember-deep)" />
      <circle cx="42" cy="30" r="3.4" fill="var(--ember-deep)" />
      <circle cx="36" cy="46" r="3.4" fill="var(--ember-deep)" />
      <circle cx="24" cy="48" r="3" fill="var(--oregano)" />
      <circle cx="46" cy="44" r="2.6" fill="var(--oregano)" />
      <circle cx="36" cy="18" r="2.6" fill="var(--oregano)" />
    </svg>
  );
}
