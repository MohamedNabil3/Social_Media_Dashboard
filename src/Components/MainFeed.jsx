"use client";

import React,{ useState } from "react";
import { Card, Button, Image, Form } from "react-bootstrap";
import { FaHeart, FaComment, FaShare, FaEllipsisH } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "@/Styles/HomePage.module.css";

export default function MainFeed() {
  const user = useSelector((state) => state.auth.user);
    const currentTheme = useSelector((state) => state.theme.mode);
    const isLight = currentTheme === "light";
    const [postCreatFlasg,setPostCreatFlasg]=useState(false);
    const [imagechecked,setimagechecked]=useState(false);
    const [newPostImage,setNewPostImage]=useState('');


  // Mock posts data

  const myPosts=[
    {
    content: "I just had the best time at the beach. The sunsets here are so beautiful! 🌅 #BeachLife #SeaBreeze",
    user:{
        name: user?.name,
        avatar: user?.avatar||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
        username: user?.username||`@${user?.name}`
    },
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop",
    timestamp: 1,
    likes: 42,
    comments: 8,
    shares: 3
  },

  {
    content: "Taking a break from coding to enjoy the sunset at the beach. ☀️🌊 #BeachLife #SeaBreeze",
    user:{
        name: user?.name,
        avatar: user?.avatar||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
        username: user?.username||`@${user?.name}`
    },
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&h=400&fit=crop",
    timestamp: 2,
    likes: 23,
    comments: 6,
    shares: 2
  },

  {
    content: "Just landed a new job! Starting on Monday as a front-end developer. 🎉 #NewJob #WebDevelopment",
    user:{
        name: user?.name,
        avatar: user?.avatar||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
        username: user?.username||`@${user?.name}`
    },
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    timestamp: 3,
    likes: 18,
    comments: 4,
    shares: 1
  }
]

const [myposts, setMyposts] = useState([...myPosts]);
  const [newPostContent, setNewPostContent] = useState('');

  const mockPosts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        username: "@sarahj"
      },
      content: "Just finished an amazing React project! The new hooks make everything so much cleaner. 🚀 #ReactJS #WebDev",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      timestamp:8,
      likes: 42,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
        username: "@mikechen"
      },
      content: "Beautiful sunset from my office window today! Sometimes you need to pause and appreciate the little moments. 🌅",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      timestamp: 6,
      likes: 28,
      comments: 12,
      shares: 5
    },
    {
      id: 3,
      user: {
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        username: "@emmaw"
      },
      content: "Working on some new UI designs. The attention to detail in typography and spacing makes all the difference! ✨",
      image: null,
      timestamp: 2,
      likes: 35,
      comments: 6,
      shares: 2
    },
    {
      id: 4,
      user: {
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
        username: "@alexr"
      },
      content: "Coffee and code - the perfect combination for a productive morning! Who's with me? ☕💻",
      image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&h=400&fit=crop",
      timestamp: 15,
      likes: 67,
      comments: 15,
      shares: 8
    }
  ];


  // Merge myPosts and mockPosts arrays and sort based on timestamp (newest first)
  const sortedPosts = [...myposts, ...mockPosts].sort((a, b) => a.timestamp - b.timestamp);


  return (
    <>
      {/* Compose Post */}
      <Card  className={ `${isLight ? `${styles.feedStyles} mb-3 ${styles.light}` : `${styles.feedStyles} mb-3 ${styles.dark}`}`}>
        <Card.Body className="p-3">
          {!postCreatFlasg && (
            <div className="d-flex">
              <Image
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"}
                roundedCircle
                width={40}
                height={40}
                className="me-3"
              />
              <Form.Control
                placeholder="What's happening?"
                className={isLight ? `me-2 ${styles.HomePageFormControlLight}` : `me-2 ${styles.HomePageFormControlDark}`}
                onFocus={() => setPostCreatFlasg(true)}
              />
            </div>
          )}

          {postCreatFlasg && (
            <div >
              <div className="d-flex">
                <Image
                  src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-3"
                />
                {/* Expanded post creation UI */}
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Share your thoughts..."
                  className={isLight ? `me-2 ${styles.HomePageFormControlLight}` : `me-2 ${styles.HomePageFormControlDark}`}
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              
              <div className=" mt-2">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Add Image"
                  className="mb-1"
                  checked={imagechecked}
                  onChange={(e) => setimagechecked(e.target.checked)}
                />               
                {imagechecked && <Form.Control
                    type="text"
                    placeholder="enter image url..."
                    className={isLight ? `me-2 ${styles.HomePageFormControlLight}` : `me-2 ${styles.HomePageFormControlDark}`}
                    value={newPostImage}
                    onChange={(e) => setNewPostImage(e.target.value)}
                  />}
              </div>
              <div className="mt-3 d-flex justify-content-end">
                <Button variant="secondary" onClick={() => {setPostCreatFlasg(false);setNewPostContent('');setNewPostImage('');setimagechecked(false);}}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="ms-2"
                  onClick={(e) => {
                    e.preventDefault();
                    if (newPostContent.trim()) {
                      const newPost = {
                        id: Date.now(), // Generate unique ID
                        user:{
                            name: user?.name,
                            avatar: user?.avatar||"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
                            username: user?.username||`@${user?.name}`
                        },
                        content: newPostContent,
                        image: newPostImage,
                        timestamp: Math.floor(Math.random() * 24),
                        likes: Math.floor(Math.random() * 100),
                        comments: Math.floor(Math.random() * 100),
                        shares: Math.floor(Math.random() * 100)
                      };
                      setMyposts(prev => [newPost, ...prev]);
                      setNewPostContent('');
                      setNewPostImage('');
                      setimagechecked(false);
                      setPostCreatFlasg(false);
                    }
                    else{
                      alert('Please enter some text');
                    }
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
        </Card>
              {/* Posts Feed */}
                {sortedPosts.map((post,index) => (
                  <Card key={index} className={isLight ? `${styles.feedStyles} ${styles.light}` : `${styles.feedStyles} ${styles.dark} `}>
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
                          />
                          <div>
                            <h6 className={`mb-0 ${isLight ? styles.dark : styles.light}`} >{post.user.name}</h6>
                            <small className={`${isLight ? styles.dark : styles.light}`} >{post.user.username} • {post.timestamp} hours ago</small>
                          </div>
                        </div>
                        <Button variant="link" className="p-0 ">
                          <FaEllipsisH size={20} />
                        </Button>
                      </div>

                      {/* Post Content */}
                      <div className="px-3 pb-2 ">
                        <p className="mb-3">{post.content}</p>
                        {post.image && (
                          <Image
                            src={post.image}
                            alt="post image"
                            fluid
                            className="rounded mb-3 w-100"                     
                          />
                        )}
                      </div>

                      {/* Post Actions */}
                      <div className="px-3 pb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <Button variant="link" className="p-0 me-4 text-decoration-none">
                              <FaHeart size={20} className="me-2" />
                              {post.likes}
                            </Button>
                            <Button variant="link" className="p-0 me-4 text-decoration-none">
                              <FaComment size={20} className="me-2" />
                              {post.comments}
                            </Button>
                            <Button variant="link" className="p-0  text-decoration-none">
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
