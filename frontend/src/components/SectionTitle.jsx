export default function SectionTitle({ eyebrow, title, action }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-5">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.26em] text-gold">{eyebrow}</p>}
        <h2 className="font-serif text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

