'use client';
import React, { useState } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa"; 
import {  useSelector } from "react-redux";
import "../Styles/Notifications.css";

const mockNotifications = [
  { id: 1, message: "Your payment was successful.", read: false },
  { id: 2, message: "You have a new friend request.", read: false },
  { id: 3, message: "Check out the new feature!", read: true },
  { id: 4, message: "Your post received 5 likes!", read: false },
  { id: 5, message: "System maintenance scheduled for tonight.System maintenance scheduled for tonight.System maintenance scheduled for tonight.System maintenance scheduled for tonight.", read: true },
];

function NotificationIconBootstrap() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const currentTheme = useSelector((state) => state.theme.mode); 

  // Function to mark a specific notification as read when clicked
  const handleNotificationClick = (notificationId) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };
    
  return (
    <>

      <Dropdown align="end" className="no-arrow">
        {/* Dropdown Toggle (Icon with Badge) */}
        <Dropdown.Toggle variant="link" id="notifications-dropdown-toggle" >
          <div style={{ position: "relative", display: "inline-block" }}>
            <FaBell size={24} color={currentTheme === "light" ? "#858688ff" : "#053bdbff"} />
            {unreadCount > 0 && (
              <Badge
                pill
                bg="danger" 
                style={{ position: "absolute", top: "-5px", right: "-10px" }}
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </Dropdown.Toggle>

        {/* 2. Dropdown Menu (List of Notifications) */}
        <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" ,zIndex: "2000", transform: 'translateX(58px)',
            background: currentTheme === "light" ? "#f0f0f0" : "#333" , color: currentTheme === "light" ? "#333" : "white" , padding:"1px 0px"}}>
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <Dropdown.Item
                key={n.id}
                className="notification-item"
                style={{
                  backgroundColor: n.read ? (currentTheme === "light" ? "#f4f4f4" : "#444") : (currentTheme === "light" ? "#f8f8f8" : "#555"),
                  color: currentTheme === "light" ? "#333" : "#f4f4f4",
                }}
                onClick={() => handleNotificationClick(n.id)}
                onFocus={(e) => {
                  e.target.style.backgroundColor = n.read
                    ? (currentTheme === "light" ? "#e8e8e8" : "#555")
                    : (currentTheme === "light" ? "#f0f0f0" : "#666");
                  e.target.style.color = currentTheme === "light" ? "#000" : "#fff";
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = n.read
                    ? (currentTheme === "light" ? "#f4f4f4" : "#444")
                    : (currentTheme === "light" ? "#f8f8f8" : "#555");
                  e.target.style.color = currentTheme === "light" ? "#333" : "white";
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
              >
                  <span className="notification-message">
                    {!n.read && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#007bff",
                          marginRight: "8px",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {n.message}
                  </span>

                  <span
                    className="notification-time"
                    style={{
                      color: currentTheme === "light" ? "#888" : "#aaa",
                    }}
                  >
                    2h ago
                  </span>
                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item disabled style={{
                color: currentTheme === "light" ? "#666" : "#999",
                backgroundColor: "transparent",
                padding: "5px 8px",
                margin: "1px 0px 0px",
                borderRadius: "4px"
              }}>No new notifications.</Dropdown.Item>
            )}
          </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default NotificationIconBootstrap;
