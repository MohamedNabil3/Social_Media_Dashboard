"use client";

import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "@/Styles/HomePage.module.css";

export default function RightSidebar() {
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
        {/* Section Title */}
        <div className="mb-3">
          <strong>Who to follow</strong>
        </div>

        {/* Suggestions */}
        <div className="suggestions">
          <div className="d-flex align-items-center mb-3">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face"
              roundedCircle
              width={40}
              height={40}
              className="me-3"
              alt="John Smith avatar"
            />
            <div className="flex-grow-1">
              <h6 className="mb-0">John Smith</h6>
              <small
                className={isLight ? `${styles.dark}` : `${styles.light}`}
              >
                @johnsmith
              </small>
            </div>
            <Button variant="outline-primary" size="sm">
              Follow
            </Button>
          </div>

          <div className="d-flex align-items-center mb-3">
            <Image
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face"
              roundedCircle
              width={40}
              height={40}
              className="me-3"
              alt="Lisa Wang avatar"
            />
            <div className="flex-grow-1">
              <h6 className="mb-0">Lisa Wang</h6>
              <small
                className={isLight ? `${styles.dark}` : `${styles.light}`}
              >
                @lisawang
              </small>
            </div>
            <Button variant="outline-primary" size="sm">
              Follow
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
