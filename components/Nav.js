import React from "react";
import Link from "next/link";
import styles from "../styles/Nav.module.css";
import Image from "next/image";
import Logo from "../public/city-sound-logo.svg";

export const Nav = () => {
  return (
    <nav className={styles.navBar}>
      <figure className={styles.logo}>
        <Link href="/" passHref>
          <Image
            src={Logo}
            alt="A music note stylized to look like a C and an S"
            height="70%"
            width="70%"
          />
        </Link>
      </figure>
      <ul className={styles.links}>
        <Link href="/about">
          <a>About</a>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
