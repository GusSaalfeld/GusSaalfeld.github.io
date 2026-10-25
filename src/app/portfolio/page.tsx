import FeaturedProjects from "@/app/components/featured-projects";
import { ProjectList } from "@/app/data/projects";

// Work first: the name and a short lede that says what you write and why you, then the projects.
// The longer story and the photo are on the About page
export default function Portfolio() {
  return (
    <>
      <header>
        {/* The top of a 1.333 type scale: 18 body, 24 lede and project titles, 32 headings, 42, 57, 76 */}
        <h1 className="font-sans text-[clamp(2.5rem,6vw,4.75rem)] font-bold leading-[1] tracking-[-0.025em] text-quiet-ink">
          Augustus Saalfeld
        </h1>
        {/* The lede: set in the reading face, as the first line of the writing. Room for two
            sentences, about 30 to 45 words, in three or four lines */}
        <p className="mt-6 max-w-[44ch] text-2xl leading-[1.4] text-quiet-ink text-pretty">
          As a programmer turned writer, I explain complex topics clearly. I write documentation that
          helps people use software, and articles that help your research reach more readers.
        </p>
      </header>
      <FeaturedProjects projects={ProjectList} />
    </>
  );
}
