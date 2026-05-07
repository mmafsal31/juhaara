export default function Logo({ compact = false }) {
  return (
    <div className="leading-none">
      <div className="font-serif text-2xl tracking-[0.18em] text-emerald">{compact ? "J" : "JUHAARA"}</div>
      {!compact && <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">Elegance Within Reach</div>}
    </div>
  );
}

