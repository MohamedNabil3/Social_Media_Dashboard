"use client";

import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  console.log(router);
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100dvh" }}
    >
      <Row className="text-center">
        <Col md={8} className="mx-auto w-100">
          <div className="mb-4">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="h3 mb-3">Page Not Found</h2>
            <p className="lead text-muted mb-4">
              Oops! The page you are looking for doesn not exist.
            </p>
          </div>

          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button
              onClick={() => router.push("/")}
              className="btn btn-primary px-4"
            >
              Go Home
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
