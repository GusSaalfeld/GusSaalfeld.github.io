// A 90s Windows title bar.
export default function TitleBar({ title }: { title: string }) {
  return (
    <div className="win-titlebar">
      <span className="truncate">{title}</span>
    </div>
  );
}
