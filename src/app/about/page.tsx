import Card from "@/app/components/card";

export default function About() {
  return (
    <div data-slime-cover="column" className="flex flex-col gap-6 w-full max-w-5xl mx-auto px-4 md:px-8 py-12">
      <Card title="About me" description="Hello!"></Card>
      <Card title="Hobbies" description="1. Rock climbing 2. mushrooms 3. home server"></Card>
    </div>
  );
}
