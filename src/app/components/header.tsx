import type { ReactNode } from "react";
import NavBar from "@/app/components/navbar";

type HeaderProps = {
  children?: ReactNode
};

export default function Header({children}: HeaderProps) {
    return (
        <NavBar>
            <span className="font-semibold text-2xl leading-none text-gold">Augustus Saalfeld</span>
            <span className="hidden sm:inline text-dust">Tech & science writer</span>
            {children && <div>{children}</div>}
        </NavBar>
    );
}
