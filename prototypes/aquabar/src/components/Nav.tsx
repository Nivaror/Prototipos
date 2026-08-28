import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.brand}>
          <svg
            className={styles.mark}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="15" cy="15" r="15" fill="var(--teal-deep)" />
            <path
              d="M6 16c2.2 2 4 2 6 0s3.8-2 6 0 3.8 2 6 0"
              stroke="var(--gold)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M6 20.5c2.2 2 4 2 6 0s3.8-2 6 0 3.8 2 6 0"
              stroke="var(--on-teal-soft)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          Aquabar
        </span>
        <a className={styles.cta} href="#reservas">
          Reservar
        </a>
      </div>
    </header>
  );
}
