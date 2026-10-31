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
          "I started out as a programmer, but found a way to work writing into nearly every job I’ve held: I rewrote the onboarding for engineers at the Software Engineering Institute, which the team still uses, and documented what it took to bring the game Hexagroove to the Xbox and Steam stores for Ichigoichie Games.",
          "I moved every few years growing up, but Pittsburgh has been home for eight years now. My favorite part? Frick Park is five minutes from my front door.",
          "I believe everyone is an expert in something. If you get in touch, tell me something interesting you learned recently. I’m always looking to learn.",
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
