"use client";

import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import LeftSidebar from "@/Components/LeftSidebar.jsx";
import MainFeed from "@/Components/MainFeed.jsx";
import RightSidebar from "@/Components/RightSidebar.jsx";

import styles from "@/Styles/HomePage.module.css";

export default function HomePage() {
  const currentTheme = useSelector((state) => state.theme.mode);
  const isLight = currentTheme === "light";

  return (
    <>
      <div
        className={
          isLight
            ? `${styles.pageStyles} ${styles.light}`
            : `${styles.pageStyles} ${styles.dark}`
        }
      >
        <Container fluid>
          <Row>
            {/* Left Sidebar - Hidden on mobile, visible on lg screens and above */}
            <Col lg={3} className="d-none d-lg-block">
              <LeftSidebar />
            </Col>

            {/* Main Feed */}
            <Col lg={6}>
              <MainFeed />
            </Col>

            {/* Right Sidebar */}
            <Col lg={3}>
              <RightSidebar />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
