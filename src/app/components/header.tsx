import type { ReactNode } from "react";
import NavBar from "@/app/components/navbar";

type HeaderProps = {
  children?: ReactNode
};

// The site's signature: the name, and the job title beside it in muted grey. The title shows from
// lg up only; narrower, it would crowd the links, and the portfolio's lede says it just below
export default function Header({children}: HeaderProps) {
    return (
        <NavBar>
            <span className="font-sans font-semibold">Augustus Saalfeld</span>
            <span className="hidden lg:inline ml-3 text-quiet-muted">Technical & Science Writer</span>
            {children && <div>{children}</div>}
        </NavBar>
    );
}
