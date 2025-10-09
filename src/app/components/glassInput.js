export default function GlassInput() {
  return (
    <div className="backdrop-blur-md bg-transparent rounded-full border border-white/30 w-full max-w-[400px]">
      <input
        placeholder="Search recipe..."
        className="text-white border-none outline-none px-5 py-3 font-semibold bg-transparent w-full placeholder-white/70"
      />
    </div>
  );
}
