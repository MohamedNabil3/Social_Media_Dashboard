"use client";

import React from "react";
import { Card, Button, Image, Form } from "react-bootstrap";
import { FaHeart, FaComment, FaShare, FaEllipsisH } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "@/Styles/HomePage.module.css";

export default function MainFeed() {
  const user = useSelector((state) => state.auth.user);
  const currentTheme = useSelector((state) => state.theme.mode);
  const isLight = currentTheme === "light";

  // Mock posts data
  const mockPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        username: "@sarahj",
      },
      content:
        "Just finished an amazing React project! The new hooks make everything so much cleaner. 🚀 #ReactJS #WebDev",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      timestamp: "2 hours ago",
      likes: 42,
      comments: 8,
      shares: 3,
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        username: "@mikechen",
      },
      content:
        "Beautiful sunset from my office window today! Sometimes you need to pause and appreciate the little moments. 🌅",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      timestamp: "4 hours ago",
      likes: 28,
      comments: 12,
      shares: 5,
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        username: "@emmaw",
      },
      content:
        "Working on some new UI designs. The attention to detail in typography and spacing makes all the difference! ✨",
      image: null,
      timestamp: "6 hours ago",
      likes: 35,
      comments: 6,
      shares: 2,
    },
    {
      id: 4,
      user: {
        name: "Alex Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        username: "@alexr",
      },
      content:
        "Coffee and code - the perfect combination for a productive morning! Who's with me? ☕💻",
      image:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop",
      timestamp: "8 hours ago",
      likes: 67,
      comments: 15,
      shares: 8,
    },
  ];

  return (
    <>
      {/* Compose Post */}
      <Card
        className={
          isLight
            ? `${styles.feedStyles} mb-3 ${styles.light}`
            : `${styles.feedStyles} mb-3 ${styles.dark}`
        }
      >
        <Card.Body className="p-3">
          <div className="d-flex">
            <Image
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
              }
              roundedCircle
              width={40}
              height={40}
              className="me-3"
              alt="User avatar"
            />
            <Form.Control
              placeholder="What's happening?"
              className={
                isLight
                  ? `me-2 ${styles.formControlLight}`
                  : `me-2 ${styles.formControlDark}`
              }
            />
            <Button variant="primary" size="md">
              Post
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Posts Feed */}
      {mockPosts.map((post) => (
        <Card
          key={post.id}
          className={
            isLight
              ? `${styles.postStyles} ${styles.light}`
              : `${styles.postStyles} ${styles.dark}`
          }
        >
          <Card.Body className="p-0">
            {/* Post Header */}
            <div className="d-flex justify-content-between align-items-start p-3 pb-2">
              <div className="d-flex">
                <Image
                  src={post.user.avatar}
                  roundedCircle
                  width={50}
                  height={50}
                  className="me-3"
                  alt={`${post.user.name} avatar`}
                />
                <div>
                  <h6
                    className="mb-0"
                    style={{ color: isLight ? "#444" : "#e0e0e0" }}
                  >
                    {post.user.name}
                  </h6>
                  <small style={{ color: isLight ? "#444" : "#e0e0e0" }}>
                    {post.user.username} • {post.timestamp}
                  </small>
                </div>
              </div>
              <Button variant="link" className="p-0">
                <FaEllipsisH size={20} />
              </Button>
            </div>

            {/* Post Content */}
            <div className="px-3 pb-2">
              <p className="mb-3">{post.content}</p>
              {post.image && (
                <Image
                  src={post.image}
                  fluid
                  className="rounded mb-3"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                  alt="Post content"
                />
              )}
            </div>

            {/* Post Actions */}
            <div className="px-3 pb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <Button variant="link" className="p-0 me-4">
                    <FaHeart size={20} className="me-2" />
                    {post.likes}
                  </Button>
                  <Button variant="link" className="p-0 me-4">
                    <FaComment size={20} className="me-2" />
                    {post.comments}
                  </Button>
                  <Button variant="link" className="p-0">
                    <FaShare size={20} className="me-2" />
                    {post.shares}
                  </Button>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
