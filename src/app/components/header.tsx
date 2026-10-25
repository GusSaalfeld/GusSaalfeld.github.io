import type { ReactNode } from "react";
import NavBar from "@/app/components/navbar";

type HeaderProps = {
  children?: ReactNode
};

export default function Header({children}: HeaderProps) {
    return (
        <NavBar>
            <span className="font-display text-xl font-semibold">Augustus Saalfeld</span>
            {children && <div>{children}</div>}
        </NavBar>
    );
}
