"use client";

import { useLogout, useMenu } from "@refinedev/core";
import Link from "next/link";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.route ?? "/"}
              className={selectedKey === item.key ? "active" : ""}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li key="about">
          <Link
            href="/about"
            className={selectedKey === "about" ? "active" : ""}
          >
            About
          </Link>
        </li>
      </ul>
      <button onClick={() => logout()}>Logout</button>
    </nav>
  );
};
