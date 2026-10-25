import type { ReactNode } from "react";
import NavBar from "@/app/components/navbar";

type HeaderProps = {
  children?: ReactNode
};

export default function Header({children}: HeaderProps) {
    return (
        <NavBar>
            Augustus Saalfeld | Tech & Science Writer
            {children && <div>{children}</div>}
        </NavBar>
    );
}