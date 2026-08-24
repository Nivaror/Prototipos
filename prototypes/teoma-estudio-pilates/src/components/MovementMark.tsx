export default function MovementMark() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    >
      <circle cx="200" cy="200" r="150" stroke="var(--sage-line)" strokeWidth="1.5" />
      <path
        d="M60 230C110 150 180 90 260 90"
        stroke="var(--sage-deep)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M90 300C160 300 230 250 300 150"
        stroke="var(--sage)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="260" cy="90" r="7" fill="var(--sage-deep)" />
      <circle cx="300" cy="150" r="7" fill="var(--sage)" />
    </svg>
  );
}
