"use client";

import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Alert,
  Row,
  Col,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import {
  FaEye,
  FaEyeSlash,
  FaMale,
  FaFemale,
  FaQuestion,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/Styles/genderStyle.css"; // adjust path if your Styles folder is outside /app

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    { id: 1, title: "Basic Info", completed: step > 1 },
    { id: 2, title: "Personal Details", completed: step > 2 },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    customGender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (gender) => {
    setForm((prevForm) => ({
      ...prevForm,
      gender: gender,
      customGender: gender === "other" ? prevForm.customGender : "",
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.confirmPassword
      ) {
        setError("Please fill in all fields");
        return;
      }

      if (form.name.trim().length < 3) {
        setError("Name must be at least 3 characters");
        return;
      } else if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
        setError("Name can only contain letters and spaces");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        setError("Please enter a valid email address");
        return;
      }

      if (form.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      } else if (!/(?=.*[a-z])/.test(form.password)) {
        setError("Password must contain at least one lowercase letter");
        return;
      } else if (!/(?=.*\d)/.test(form.password)) {
        setError("Password must contain at least one number");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setError("");
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.dob ||
      !form.gender ||
      (form.gender === "other" && !form.customGender.trim())
    ) {
      setError("Please fill in all fields");
      return;
    }

    const finalForm = {
      ...form,
      gender: form.gender === "other" ? form.customGender.trim() : form.gender,
      customGender: undefined,
    };

    localStorage.setItem("user", JSON.stringify(finalForm));
    alert("Signup successful! redirect to login.");
    router.push("/login");
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Create Account</h3>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <small className="text-muted">
              Step {step} of {steps.length}
            </small>
            <small className="text-muted">
              {Math.round(((step - 1) / steps.length) * 100)}% Complete
            </small>
          </div>
          <ProgressBar
            now={((step - 1) / steps.length) * 100}
            variant="info"
            className="mb-3"
          />
          <div className="d-flex justify-content-between">
            {steps.map((stepItem) => (
              <div
                key={stepItem.id}
                className={`text-center ${
                  stepItem.completed
                    ? "text-success fw-bold"
                    : step === stepItem.id
                    ? "text-primary fw-bold"
                    : "text-muted"
                }`}
              >
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center mb-1 ${
                    stepItem.completed
                      ? "bg-success text-white"
                      : step === stepItem.id
                      ? "bg-primary text-white"
                      : "bg-light border"
                  }`}
                  style={{ width: "30px", height: "30px", fontSize: "12px" }}
                >
                  {stepItem.id}
                </div>
                <small>{stepItem.title}</small>
              </div>
            ))}
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={form.name}
                  maxLength={20}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group controlId="formDOB" className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formGender" className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Row className="gy-3">
                  <Col>
                    <div
                      className={`gender-card ${
                        form.gender === "male" ? "active" : ""
                      }`}
                      onClick={() => handleGenderChange("male")}
                    >
                      <FaMale size={24} className="mb-2" />
                      <span className="fw-bold">Male</span>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className={`gender-card ${
                        form.gender === "female" ? "active" : ""
                      }`}
                      onClick={() => handleGenderChange("female")}
                    >
                      <FaFemale size={24} className="mb-2" />
                      <span className="fw-bold">Female</span>
                    </div>
                  </Col>
                  <Col>
                    <div
                      className={`gender-card ${
                        form.gender === "other" ? "active" : ""
                      }`}
                      onClick={() => handleGenderChange("other")}
                    >
                      <FaQuestion size={24} className="mb-2" />
                      <span className="fw-bold">Other</span>
                    </div>
                  </Col>
                </Row>
              </Form.Group>

              {form.gender === "other" && (
                <Form.Group controlId="formCustomGender" className="mb-3">
                  <Form.Label>Please specify</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your gender identity"
                    name="customGender"
                    value={form.customGender}
                    onChange={handleChange}
                  />
                </Form.Group>
              )}
            </>
          )}

          <Row className="mt-3">
            <Col>
              {step < steps.length ? (
                <Button
                  variant="primary"
                  onClick={nextStep}
                  className="w-100"
                  type="button"
                >
                  Next
                </Button>
              ) : (
                <Button variant="success" type="submit" className="w-100">
                  Signup
                </Button>
              )}
            </Col>
            <Col>
              {step > 1 && (
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  className="w-100"
                  type="button"
                >
                  Previous
                </Button>
              )}
            </Col>
          </Row>
        </Form>

        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link href="/login" className="text-decoration-none">
            Login
          </Link>
        </div>
      </Card>
    </Container>
  );
}
