"use client";

import React from "react";
import { Card, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "@/Styles/HomePage.module.css";

export default function LeftSidebar() {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.mode);
  const isLight = currentTheme === "light";

  return (
    <Card
      className={
        isLight
          ? `${styles.feedStyles} sticky-top ${styles.light}`
          : `${styles.feedStyles} sticky-top ${styles.dark}`
      }
    >
      <Card.Body className="p-0">
        {/* User Info */}
        <div className="d-flex align-items-center mb-3 ">
          <Image
            src={
              user?.avatar ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
            }
            roundedCircle
            width={50}
            height={50}
            className="me-3"
            alt="User avatar"
          />
          <div>
            <h6 className="mb-0">{user ? user.name : "Guest"}</h6>
          </div>
        </div>

        <hr />

        {/* Trending Topics */}
        <div className="px-2 pb-1">
          <div className="mb-2">
            <strong style={{ fontSize: "20px" }}>What's happening</strong>
          </div>
          <div className="trending-topics">
            <small
              className={isLight ? `${styles.dark}` : `${styles.light}`}
            >
              ReactJS
            </small>
            <br />
            <small
              className={isLight ? `${styles.dark}` : `${styles.light}`}
            >
              WebDevelopment
            </small>
            <br />
            <small
              className={isLight ? `${styles.dark}` : `${styles.light}`}
            >
              JavaScript
            </small>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
