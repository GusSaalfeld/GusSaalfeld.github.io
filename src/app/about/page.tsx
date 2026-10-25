import Card from "@/app/components/card";

export default function About() {
  return (
    <div className="min-h-svh bg-quiet-paper">
      <Card title="About me" description="Hello!"></Card>
      <Card title="Hobbies" description="1. Rock climbing 2. mushrooms 3. home server"></Card>
    </div>
  );
}
