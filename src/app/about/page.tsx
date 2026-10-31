import type { Metadata } from "next";
import Image from "next/image";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import Card from "@/app/components/card";
import Hobbies from "@/app/components/hobbies";

export const metadata: Metadata = { title: "About me" };

export default function About() {
  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        <Card mediaFirst pageTitle title="About me" description={[
          "I’m a technical and science writer based in Pittsburgh. I’ve written documentation, interface copy, technical explainers, and short stories.",
          "I started out as a programmer and found a way to work writing into nearly every job I’ve held. At the Software Engineering Institute, I rewrote the onboarding for engineers, which the team still uses. At Ichigoichie Games, I documented what it took to bring the game Hexagroove to the Xbox and Steam stores.",
          "I moved every few years growing up, but Pittsburgh has been home for eight years now. My favorite part? Frick Park is five minutes from my front door.",
          // "get in touch" goes to the Contact section, where the address and the copy button are
          <>
            I believe everyone is an expert in something. If you{" "}
            <a href="#contact" className="text-quiet-link underline decoration-1 underline-offset-4 hover:decoration-2">get in touch</a>,
            tell me something interesting you learned recently. I&rsquo;m always looking to learn.
          </>,
        ]}>
          {/* Beside the text from md up, and between the heading and the text below, so there's
              a face to the words while you read them. From md up a portrait crop, taller than the
              square original so it holds its own beside the text, centred on me; on phones a
              shorter landscape crop, so the opening line shows on the first screen */}
          {/* From md up it stays in view while the text beside it scrolls, below the navbar, so a
              longer text doesn't leave the photo stranded above a gap */}
          <div className="photo-grade relative aspect-[3/2] overflow-hidden md:sticky md:top-24 md:aspect-[4/5]">
            <Image
              src="/hero2.jpg"
              alt="Clam digging on a tidal flat beneath a wooden pier"
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 100vw"
              priority
              className="object-cover object-[50%_45%] md:object-[25%_50%]"
            />
          </div>
        </Card>
      </Band>
      <Band className={SECTION_GAP}>
        <Hobbies />
      </Band>
    </>
  );
}
