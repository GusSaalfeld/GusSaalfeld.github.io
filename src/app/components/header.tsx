import type { ReactNode } from "react";
import NavBar from "@/app/components/navbar";

type HeaderProps = {
  children?: ReactNode
};

export default function Header({children}: HeaderProps) {
    return (
        <NavBar>
            <span className="font-gothic text-[27px] leading-none text-c64-yellow">Augustus Saalfeld</span>
            <span className="hidden sm:inline text-c64-grey">Tech & science writer</span>
            {children && <div>{children}</div>}
        </NavBar>
    );
}
