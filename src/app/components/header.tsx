import type { ReactNode } from "react";
import Link from "next/link";
import NavBar from "@/app/components/navbar";

type HeaderProps = {
  children?: ReactNode
};

// The site's signature: the name, and the job title beside it in muted grey. The title shows from
// lg up only; narrower, it would crowd the links, and the portfolio's lede says it just below.
// The name goes home, as a site's name does everywhere, so it's a link with no underline until hovered
export default function Header({children}: HeaderProps) {
    return (
        <NavBar>
            <Link href="/" className="font-sans font-semibold hover:text-quiet-link hover:underline underline-offset-4">
                Augustus Saalfeld
            </Link>
            <span className="hidden lg:inline ml-3 text-quiet-muted">Technical and science writer</span>
            {children && <div>{children}</div>}
        </NavBar>
    );
}
