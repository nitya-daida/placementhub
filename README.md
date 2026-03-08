# 🎓 Placement Resource Hub – Stanley College

Placement Resource Hub is an internal web platform designed for students of **Stanley College of Engineering and Technology for Women** to share interview experiences, placement preparation resources, and company-specific interview questions.

The goal of this platform is to **preserve placement knowledge across batches** so that students can prepare more effectively for campus recruitment.

Instead of losing valuable insights every year through informal chats or WhatsApp groups, this platform stores them in a **centralized knowledge system**.

---

# 🚀 Problem Statement

Every year during campus placements:

* Students attend interviews
* Companies ask technical and HR questions
* Students gain valuable interview experience
* Preparation resources are discovered

However, this information is usually shared informally and **not stored permanently**.

As a result:

* Future students start preparation from scratch
* Interview questions asked in previous years are lost
* Effective preparation strategies are not documented

The **Placement Resource Hub** solves this problem by creating a **centralized platform where placement knowledge is documented and shared**.

---

# 💡 Solution

Placement Resource Hub acts as a **knowledge-sharing platform for placements**, where:

* Students upload interview questions they faced
* Selected students share preparation strategies
* Mentors provide verified resources
* Juniors learn from previous batches

It works like a **GitHub + Reddit + Resource Library for college placements**.

---

# 🧠 Core Features

## 👩‍🎓 Student System

Students can:

* Register using college email and roll number
* Login securely
* Add interview questions they faced
* Upload preparation resources
* Share placement success stories
* Upvote useful content
* Comment on posts

---

# 🏢 Company Interview Question Bank

This is the **main feature of the platform**.

Structure:

Company → Role → Year → Questions

Example:

Infosys
System Engineer
2025

Each entry contains:

* Round type (Aptitude / Technical / Coding / HR)
* Difficulty level (Easy / Medium / Hard)
* Question description
* Interview tips
* Upvotes
* Comments

Students can filter questions by:

* Company
* Role
* Year
* Round type

---

# 📚 Resource Library

A centralized preparation library containing resources for:

* Aptitude preparation
* Coding preparation
* Core subjects (CSE, ECE, IT, etc.)
* HR interview preparation
* Mock interview platforms

Resources can include:

* PDFs
* Google Drive links
* YouTube playlists
* Websites
* Notes

Students and mentors can upload resources.

---

# 🌟 Success Stories

Students who get placed can share their preparation journey including:

* Preparation timeline
* Daily routine
* Resources used
* Mistakes to avoid
* Tips for juniors

These posts serve as **real preparation blueprints for future batches**.

---

# 🗳 Upvote and Review System

To maintain content quality:

Users can:

* Upvote useful questions
* Comment on resources
* Review preparation posts

Mentors can mark posts as:

✔ Verified

This helps highlight **trusted and useful content**.

---

# 🧑‍🏫 Mentor Dashboard

Mentors can:

* Approve student submissions
* Upload verified preparation resources
* Moderate comments
* Mark questions as verified

---

# 🔒 Admin Dashboard

Admins manage the entire platform.

Admin features:

* Manage users
* Remove spam content
* Approve mentor accounts
* View analytics

Analytics include:

* Most viewed companies
* Most upvoted resources
* Most active contributors

---

# 🏗 Tech Stack

## Frontend

* React
* HTML
* CSS
* JavaScript

## Backend

* Node.js
* Express.js

## Database

* MongoDB

## Authentication

* JWT Authentication

---

# 🗂 Database Collections

### Users

* id
* name
* email
* rollNumber
* branch
* year
* role (student / mentor / admin)

### Questions

* companyName
* role
* year
* roundType
* difficulty
* question
* tips
* postedBy
* upvotes

### Resources

* title
* category
* description
* link
* uploadedBy
* upvotes

### SuccessStories

* studentName
* branch
* company
* preparationTimeline
* tips
* resourcesUsed

---

# 🔍 Search and Filtering

The platform supports search and filters for:

Search:

* Company names
* Interview questions
* Resources

Filters:

* Branch
* Company
* Role
* Year

---

# 📱 UX Features

The platform includes:

* Responsive design
* Sidebar dashboard layout
* Card-based UI
* Loading states
* Notifications
* Confirmation modals

---

# 🚀 Future Enhancements

Possible future features include:

* AI interview preparation suggestions
* Mock test platform
* Resume review system
* Anonymous interview experience posting
* Placement notifications

---

# 🎯 Project Goal

The goal of this project is to **create a sustainable placement knowledge system** where students help future batches succeed by sharing real interview experiences and preparation resources.

---

# 👨‍💻 Author

Developed by

**Lucky**

Student – Stanley College of Engineering and Technology for Women

---

# ⭐ Contribution

Future students and mentors can contribute by:

* Uploading interview questions
* Sharing preparation strategies
* Adding useful resources

Together we can build a **strong placement knowledge ecosystem for the college**.
