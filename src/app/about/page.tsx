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
          "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications. I love reading and writing about technology, culture, and the natural world.",
          "I have always looked to resolve problems through writing. I have written documentation to onboard new engineers and bring a video-game to the Xbox and Steam store. At my current coffee shop, I wrote a step-by-step guide to make the perfect latte. In addition, I have done UX writing, how-to articles, and short stories.",
          "While I moved every few years growing up, I’ve called Pittsburgh home for the last eight. My favorite part about living in Pittsburgh? Five minutes out my front door and I’m in Frick Park.",
          "I believe that everyone is an expert in something. If you are reaching out, feel free to share an interesting fact you learned recently. I’m always looking to learn something new!",
        ]}>
          {/* Beside the text from md up, and between the heading and the text below, so there's
              a face to the words while you read them. The whole scene, uncropped */}
          {/* From md up it stays in view while the text beside it scrolls, below the navbar, so a
              longer text doesn't leave the photo stranded above a gap */}
          <div className="photo-grade relative md:sticky md:top-24">
            <Image
              src="/hero2.jpg"
              alt="Clam digging on a tidal flat beneath a wooden pier"
              width={1113}
              height={1107}
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 50vw, 100vw"
              priority
              className="block w-full h-auto"
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
