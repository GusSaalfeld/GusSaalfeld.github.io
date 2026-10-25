import Image from "next/image";
import Link from "next/link";

type ProjectIconProps = Project & {
    // Spans both grid columns, used for an odd project out on the last row
    wide?: boolean
};

export default function ProjectIcon({ wide, ...project }: ProjectIconProps) {
    return (
        <Link href={`/portfolio/${project.path}`} className={`group flex flex-col gap-3 items-start w-full ${wide ? "sm:col-span-2" : ""}`}>
            <div className={`relative aspect-video w-full shrink-0 overflow-hidden bg-[var(--win-light)] ${wide ? "sm:aspect-[32/9]" : ""}`}>
                {project.iconPath && (
                    <Image
                        src={project.iconPath}
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-[rgba(46,31,15,0.88)] pointer-events-none opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {project.hoverDescription && (
                        <p className="text-center text-lg font-medium leading-[1.45] text-white">
                            {project.hoverDescription}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-baseline justify-between w-full">
                <p className="font-semibold text-xl leading-[1.2] tracking-[-0.4px] text-[var(--win-accent)] group-hover:underline underline-offset-4">
                    {project.title}
                </p>
            </div>
        </Link>
    );
}
