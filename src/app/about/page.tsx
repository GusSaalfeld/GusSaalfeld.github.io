import Image from "next/image";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import Card from "@/app/components/card";
import Hobbies from "@/app/components/hobbies";

export default function About() {
  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        <Card title="About me" description={[
          "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
          "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
        ]} />
        {/* The photo across the whole column, under the text. Cropped to 4:3 from the square
            original: some sky off the top and the boots' toes off the bottom */}
        <figure className="mt-12">
          <div className="photo-grade relative aspect-[4/3] overflow-hidden bg-quiet-rule">
            <Image
              src="/hero2.jpg"
              alt="Clam digging on a tidal flat beneath a wooden pier"
              fill
              sizes="(min-width: 1024px) 928px, 100vw"
              priority
              className="object-cover object-[50%_62%]"
            />
          </div>
          <figcaption className="mt-3 text-base leading-[1.55] text-quiet-muted">
            Clam digging on a tidal flat beneath a wooden pier.
          </figcaption>
        </figure>
      </Band>
      <Band className={SECTION_GAP}>
        <Hobbies />
      </Band>
    </>
  );
}
