"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Tab,
  Nav,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/redux/slices/themeSlice.js";
import { logout, updateUser, deleteAccount } from "@/redux/slices/authSlice.js";
import styles from "@/Styles/SettingsPage.module.css";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const eventkeys = ["profile", "account", "preferences"];
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state
  const currentTheme = useSelector((state) => state.theme.mode);
  const savedUser = useSelector((state) => state.auth.user);
  const isLight = currentTheme === "light";

  // Local state
  const [user, setUser] = useState(savedUser);
  const [passwords, setPasswords] = useState({
    old: "",
    newPass: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeKey, setActiveKey] = useState("profile");

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      } else {
        if (!eventkeys.includes(activeKey)) {
          setShowSidebar(true);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [activeKey]);

  // === Event handlers ===
  const handleProfileChange = (e) => {
    e.preventDefault();
    dispatch(updateUser({ ...savedUser, name: user.name, email: user.email }));
    setMessage("Profile updated successfully!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwords.old !== savedUser.password) {
      setMessage("Old password is incorrect!");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setMessage("Passwords do not match!");
      return;
    }

    dispatch(updateUser({ ...savedUser, password: passwords.newPass }));
    setMessage("Password updated successfully!");
    setPasswords({ old: "", newPass: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    dispatch(deleteAccount());
    alert("Account deleted.");
    router.replace("/login");
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const handleSelect = (key) => {
    if (activeKey !== key) {
      setIsEditing(false);
      setMessage("");
      setActiveKey(key);
    }
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      dispatch(
        updateUser({ ...savedUser, name: user.name, email: user.email })
      );
      setMessage("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  const handleBack = () => {
    setShowSidebar(true);
    setIsEditing(false);
    setMessage("");
    setActiveKey("");
  };

  return (
    <>
      <div
        className={isLight ? styles.settingsPageLight : styles.settingsPageDark}
      >
        <Container fluid>
          <Tab.Container activeKey={activeKey} onSelect={handleSelect}>
            <Row className={styles.rowSettings}>
              {(showSidebar || window.innerWidth >= 768) && (
                <Col md={3} className="border-end mb-3">
                  <Nav variant="pills" className="flex-column">
                    {eventkeys.map((key) => (
                      <Nav.Item key={key}>
                        <Nav.Link
                          eventKey={key}
                          style={{ marginBottom: "5px" }}
                          className={
                            isLight
                              ? activeKey === key
                                ? styles.navLinkActiveLight
                                : styles.navLinkLight
                              : activeKey === key
                              ? styles.navLinkActiveDark
                              : styles.navLinkDark
                          }
                        >
                          {key}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                    <Button
                      variant="danger"
                      onClick={handleLogout}
                      className="w-100 d-block mt-1"
                      style={{ textAlign: "left", paddingLeft: "16px" }}
                    >
                      Logout
                    </Button>
                  </Nav>
                </Col>
              )}

              {(!showSidebar || window.innerWidth >= 768) && (
                <Col md={9} className="mb-3">
                  {window.innerWidth < 768 && (
                    <Button
                      variant="secondary"
                      className="mb-3"
                      onClick={handleBack}
                    >
                      ← Back
                    </Button>
                  )}

                  <Tab.Content>
                    <Tab.Pane eventKey="profile">
                      <Card
                        style={{ borderRadius: "8px" }}
                        bsPrefix={
                          isLight
                            ? `${styles.settingsContainerLight} p-3 shadow-sm`
                            : `${styles.settingsContainerDark} p-3 shadow-sm`
                        }
                      >
                        <h4>Profile Settings</h4>
                        {message && <Alert variant="info">{message}</Alert>}

                        <Form onSubmit={handleProfileChange}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={user.name}
                              maxLength={20}
                              onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                              }
                              className={
                                isLight
                                  ? `me-2 ${styles.formControlLight}`
                                  : `me-2 ${styles.formControlDark}`
                              }
                              readOnly={!isEditing}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={user.email}
                              onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                              }
                              className={
                                isLight
                                  ? `me-2 ${styles.formControlLight}`
                                  : `me-2 ${styles.formControlDark}`
                              }
                              readOnly={!isEditing}
                            />
                          </Form.Group>

                          <Button
                            type="button"
                            variant={isEditing ? "success" : "primary"}
                            onClick={handleEditToggle}
                          >
                            {isEditing ? "Save Changes" : "Edit"}
                          </Button>
                        </Form>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="account">
                      <Card
                        bsPrefix={
                          isLight
                            ? `${styles.settingsContainerLight} p-3 shadow-sm`
                            : `${styles.settingsContainerDark} p-3 shadow-sm`
                        }
                      >
                        <h4>Account Settings</h4>
                        {message && <Alert variant="info">{message}</Alert>}

                        <Form onSubmit={handlePasswordChange}>
                          <Form.Group className="mb-3">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={passwords.old}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  old: e.target.value,
                                })
                              }
                              className={
                                isLight
                                  ? `me-2 ${styles.formControlLight}`
                                  : `me-2 ${styles.formControlDark}`
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={passwords.newPass}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  newPass: e.target.value,
                                })
                              }
                              className={
                                isLight
                                  ? `me-2 ${styles.formControlLight}`
                                  : `me-2 ${styles.formControlDark}`
                              }
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              value={passwords.confirm}
                              onChange={(e) =>
                                setPasswords({
                                  ...passwords,
                                  confirm: e.target.value,
                                })
                              }
                              className={
                                isLight
                                  ? `me-2 ${styles.formControlLight}`
                                  : `me-2 ${styles.formControlDark}`
                              }
                            />
                          </Form.Group>

                          <Button type="submit" variant="primary">
                            Change Password
                          </Button>
                        </Form>

                        <hr />
                        <Button variant="danger" onClick={handleDeleteAccount}>
                          Delete Account
                        </Button>
                      </Card>
                    </Tab.Pane>

                    <Tab.Pane eventKey="preferences">
                      <Card
                        bsPrefix={
                          isLight
                            ? `${styles.settingsContainerLight} p-3 shadow-sm`
                            : `${styles.settingsContainerDark} p-3 shadow-sm`
                        }
                      >
                        <h4>Preferences</h4>
                        <Button
                          onClick={() => dispatch(toggleTheme())}
                          variant={currentTheme === "light" ? "light" : "dark"}
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
                        </Button>
                      </Card>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              )}
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
}
