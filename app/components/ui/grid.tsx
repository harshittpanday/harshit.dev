export default function Grid() {
  return (
    <div
      className="
        absolute
        inset-0
        -z-10
        opacity-[0.06]
        [background-size:40px_40px]
        [background-image:
          linear-gradient(to_right,#ffffff_1px,transparent_1px),
          linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
      "
    />
  );
}