const items = [
  "4.9 ★ EN GOOGLE",
  "MÁS DE 1.500 RESEÑAS",
  "ABIERTO TODAS LAS NOCHES",
  "A LA PARRILLA",
  "ALBERDI, ROSARIO",
];

export function ReputationMarquee() {
  const track = [...items, ...items];
  return (
    <section id="reputacion" className="overflow-hidden border-y border-white/10 bg-zinc-900 py-6">
      <div className="marquee-track flex w-max items-center gap-10 motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display text-xl tracking-wide text-zinc-500 sm:text-2xl"
          >
            {item}
            <span className="ml-10 text-orange-600">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
