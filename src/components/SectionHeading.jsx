export default function SectionHeading({ kicker, title, body, align = "left" }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {kicker ? <p className="gold-kicker">{kicker}</p> : null}
      <h2 className="mt-4 font-display text-6xl uppercase leading-none text-kora-cream md:text-8xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-xl text-base leading-7 text-kora-cream/72 md:text-lg">{body}</p>
      ) : null}
    </div>
  );
}
