"use client";

import React from "react";
import { Navbar, Container, Dropdown, Image, Button } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import navbarStyles from "@/Styles/Navbar.module.css";
import { logout } from "@/redux/slices/authSlice.js";
import { toggleTheme } from "@/redux/slices/themeSlice.js";

export default function NavbarComponent() {
  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Settings", path: "/settings" },
  ];

  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.mode);
  const pathname = usePathname(); // replaces NavLink active logic

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const bg = currentTheme === "light" ? "light" : "dark";
  const variant = currentTheme === "light" ? "light" : "dark";

  return (
    <Navbar bg={bg} variant={variant} expand={false} className="w-100 shadow-sm">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={Link} href="/home">
          SocialBoard
        </Navbar.Brand>

        {/* Profile Dropdown */}
        <Dropdown align="end">
          <Dropdown.Toggle
            variant="link"
            className="p-0 border-0"
            style={{ background: "transparent" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
              roundedCircle
              width="40"
              height="40"
              alt="Profile"
            />
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              background: currentTheme === "light" ? "#f0f0f0" : "#333",
              color: currentTheme === "light" ? "#333" : "white",
              zIndex: "2000",
            }}
          >
            {/* Navigation Links */}
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path;
              const linkClass =
                currentTheme === "light"
                  ? isActive
                    ? `${navbarStyles.navLink} ${navbarStyles.light} ${navbarStyles.activeLight}`
                    : `${navbarStyles.navLink} ${navbarStyles.light}`
                  : isActive
                  ? `${navbarStyles.navLink} ${navbarStyles.dark} ${navbarStyles.activeDark}`
                  : `${navbarStyles.navLink} ${navbarStyles.dark}`;

              return (
                <Link key={index} href={item.path} className={linkClass}>
                  {item.text}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <Dropdown.Item
              onClick={handleThemeToggle}
              bsPrefix={`${navbarStyles.navLink} ${
                currentTheme === "light" ? navbarStyles.light : navbarStyles.dark
              }`}
            >
              {currentTheme === "light" ? (
                <>
                  <MdDarkMode className="me-2" /> Dark Mode
                </>
              ) : (
                <>
                  <MdLightMode className="me-2" /> Light Mode
                </>
              )}
            </Dropdown.Item>

            {/* Logout */}
            <Button
              variant="danger"
              onClick={() => dispatch(logout())}
              style={{
                width: "97%",
                padding: "8px 12px",
                margin: "3px auto 0",
                display: "block",
              }}
            >
              Logout
            </Button>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}
