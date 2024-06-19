import Link from "next/link";
import cl from "./header-left.module.scss";
import { Navbar } from "../navbar/navbar";

export const HeaderLeft = () => {
  return (
    <div className={cl.root}>
      <div className={cl.logo}>
        <Link href={"/"}>LOGO</Link>
      </div>
      <Navbar />
    </div>
  );
};
