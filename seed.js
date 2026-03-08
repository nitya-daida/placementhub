import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';
import Resource from './models/Resource.js';
import SuccessStory from './models/SuccessStory.js';
import User from './models/User.js';
import Doubt from './models/Doubt.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placement-hub');
    console.log('Connected to MongoDB');

    // Make sure we have a user
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      admin = await User.create({
        name: 'System Admin',
        email: 'admin@system.com',
        password: 'password123',
        role: 'admin',
        rollNumber: 'ADMIN1',
        branch: 'CSE',
        year: 2024
      });
    }

    let student = await User.findOne({ role: 'student', email: 'rahul@college.com' });
    if (!student) {
      student = await User.create({
        name: 'Rahul Student',
        email: 'rahul@college.com',
        password: 'password123',
        role: 'student',
        rollNumber: '160420733088',
        branch: 'CSE',
        year: 2024
      });
    }

    let mentor = await User.findOne({ role: 'mentor', email: 'priya@college.com' });
    if (!mentor) {
      mentor = await User.create({
        name: 'Priya Mentor',
        email: 'priya@college.com',
        password: 'password123',
        role: 'mentor',
        rollNumber: '160419733011',
        branch: 'IT',
        year: 2023
      });
    }

    const sampleQuestions = [
      {
        companyName: 'Google',
        role: 'Software Engineer',
        year: 2024,
        roundType: 'Coding',
        difficulty: 'Hard',
        description: '1. Given a graph of dependencies, find the valid task execution order (Topological Sort). \n2. Implement a dynamic programming solution to find the longest palindromic substring.',
        tips: 'Focus on explaining your thought process clearly before jumping into code. Discuss time and space complexity.',
        status: 'approved',
        postedBy: admin._id,
        upvotes: [admin._id]
      },
      {
        companyName: 'Microsoft',
        role: 'SDE Intern',
        year: 2024,
        roundType: 'Technical',
        difficulty: 'Medium',
        description: '1. Reverse a linked list in groups of k. \n2. Discuss Object-Oriented Programming concepts (Polymorphism, Inheritance) with real-world examples.',
        tips: 'Make sure your code handles edge cases like k=1 or k > length of list.',
        status: 'approved',
        postedBy: admin._id,
        upvotes: []
      },
      {
        companyName: 'Amazon',
        role: 'SDE 1',
        year: 2023,
        roundType: 'Coding',
        difficulty: 'Medium',
        description: '1. Two Sum problem with a twist: return all unique pairs. \n2. Design a data structure that supports insert, delete, and getRandom in O(1) time.',
        tips: 'For the system design part, use a Hash Map and an Array combined.',
        status: 'approved',
        postedBy: admin._id,
        upvotes: [admin._id]
      },
      {
        companyName: 'TCS',
        role: 'Digital',
        year: 2024,
        roundType: 'Aptitude',
        difficulty: 'Easy',
        description: 'Standard aptitude questions covering Time & Work, Speed Distance Time, and basic probability. Coding questions were array manipulations.',
        tips: 'Speed is key in the aptitude section. Practice regular mock tests.',
        status: 'approved',
        postedBy: admin._id,
        upvotes: []
      },
      {
        companyName: 'Infosys',
        role: 'System Engineer',
        year: 2024,
        roundType: 'HR',
        difficulty: 'Easy',
        description: 'Standard HR questions about background, willingness to relocate, and why Infosys.',
        tips: 'Be confident and clear about your willingness to learn and adapt.',
        status: 'pending',
        postedBy: admin._id,
        upvotes: []
      }
    ];

    const sampleResources = [
      {
        title: 'Complete Guide to System Design',
        category: 'Core Subjects',
        description: 'An excellent GitHub repository covering all the major system design concepts and case studies for SWE roles.',
        link: 'https://github.com/donnemartin/system-design-primer',
        uploadedBy: admin._id,
        upvotes: [admin._id],
        status: 'approved'
      },
      {
        title: 'Blind 75 LeetCode Questions',
        category: 'Coding Preparation',
        description: 'A curated list of the most essential 75 LeetCode questions you should practice for top tech company interviews.',
        link: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions',
        uploadedBy: admin._id,
        upvotes: [],
        status: 'approved'
      },
      {
        title: 'IndiaBix Aptitude Tests',
        category: 'Aptitude Preparation',
        description: 'Hundreds of quantitative aptitude questions and answers for competitive exams and campus placements.',
        link: 'https://www.indiabix.com/aptitude/questions-and-answers/',
        uploadedBy: admin._id,
        upvotes: [admin._id],
        status: 'approved'
      },
      {
        title: 'Interviewbit OS Notes',
        category: 'Core Subjects',
        description: 'Quick interview-oriented notes covering Process matching, Virtual Memory, and Deadlocks in Operating Systems.',
        link: 'https://www.interviewbit.com/operating-system-interview-questions/',
        uploadedBy: admin._id,
        upvotes: [],
        status: 'approved'
      },
      {
        title: 'NeetCode 150 Video Solutions',
        category: 'Coding Preparation',
        description: 'Video explanations for the top 150 Leetcode problems.',
        link: 'https://neetcode.io/',
        uploadedBy: admin._id,
        upvotes: [],
        status: 'pending'
      }
    ];

    const sampleStories = [
      {
        studentName: 'Rahul Kumar',
        branch: 'CSE',
        company: 'Amazon',
        preparationTimeline: '6 months of consistent coding and 1 month of system design.',
        dailyRoutine: 'Solved 2-3 LeetCode problems daily. Studied core subjects on weekends.',
        resourcesUsed: 'Strivers A2Z DSA Sheet, System Design Primer, typical CS core notes.',
        mistakes: 'Ignored mock interviews initially, which led to poor communication in the first few actual interviews.',
        tips: 'Always communicate your thought process. A suboptimal working solution is better than an optimal incomplete one.',
        postedBy: admin._id
      },
      {
        studentName: 'Priya Sharma',
        branch: 'IT',
        company: 'Microsoft',
        preparationTimeline: 'Built strong fundamentals in 2nd and 3rd year. Focused purely on interview prep for 3 months.',
        dailyRoutine: 'Focus blocks of 2 hours. One block for DSA revision, one for project building/explanation practice.',
        resourcesUsed: 'LeetCode, GeeksforGeeks, OS/DBMS university notes.',
        mistakes: 'Spent too much time on very hard DP problems when most interviews asked medium arrays/graphs/trees.',
        tips: 'Know everything you write on your resume inside out. They will drill down into your projects.',
        postedBy: admin._id
      }
    ];

    const sampleDoubts = [
      {
        question: "Does anyone have insights into the aptitude round for Deloitte?",
        askedBy: student._id,
        isResolved: true,
        answers: [
          {
            answerText: "Yes! They focus heavily on Data Interpretation and logical reasoning. Practice pie charts and seating arrangements.",
            answeredBy: mentor._id,
            createdAt: new Date()
          }
        ]
      },
      {
        question: "How important is CP (Competitive Programming) for getting into MAANG?",
        askedBy: student._id,
        isResolved: false,
        answers: []
      },
      {
        question: "Are React & Node projects enough for an SDE 1 at Amazon, or should I learn Java/Spring?",
        askedBy: admin._id,
        isResolved: true,
        answers: [
          {
            answerText: "MERN stack is perfectly fine. Amazon's OA and interviews are strictly language agnostic. They care about your logic and object-oriented design patterns.",
            answeredBy: mentor._id,
            createdAt: new Date()
          }
        ]
      }
    ];

    // Clear existing collections
    await Question.deleteMany({});
    await Resource.deleteMany({});
    await SuccessStory.deleteMany({});
    await Doubt.deleteMany({});
    
    // Insert new sample data
    await Question.insertMany(sampleQuestions);
    await Resource.insertMany(sampleResources);
    await SuccessStory.insertMany(sampleStories);
    await Doubt.insertMany(sampleDoubts);
    
    console.log('Sample data and doubts seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
