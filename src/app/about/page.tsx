import Image from "next/image";
import Band, { PAGE_TOP, SECTION_GAP } from "@/app/components/band";
import Card from "@/app/components/card";
import Hobbies from "@/app/components/hobbies";

export default function About() {
  return (
    <>
      <Band className={`${PAGE_TOP} ${SECTION_GAP}`}>
        <Card mediaFirst title="About me" description={[
          "My name is Augustus Saalfeld, and I am a programmer turned technical writer who specializes in technical writing, UX writing, and science communications.",
          "I look forward to working with users on a better user experience, as well as with experts to get their message out there.",
        ]}>
          {/* The whole scene, uncropped, about as tall as the paragraphs beside it */}
          <Image
            src="/hero2.jpg"
            alt="Clam digging on a tidal flat beneath a wooden pier"
            width={1113}
            height={1107}
            sizes="(min-width: 768px) 352px, 100vw"
            priority
            className="block w-full h-auto"
          />
        </Card>
      </Band>
      <Band className={SECTION_GAP}>
        <Hobbies />
      </Band>
    </>
  );
}
