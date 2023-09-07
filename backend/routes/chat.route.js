const express = require("express");
const chatRouter = express.Router();
require("dotenv").config();
const axios = require("axios");
const { authentication } = require("../middlewares/authentication.middleware");
const { authorize } = require("../middlewares/authorization.middleware");
const { makeOpenAIRequest } = require("../helpers/makeAiRequest");

chatRouter.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `
    [act as chatbot]

    where you have to work as chatbot to help user query . for a educational website.
    you have to reply only for valid query that is about eduhub website 

    else 
    reply this is not related to our website. please ask valid query, thank you

    **about eduhub

    "EduHub" is a dynamic and user-friendly online learning platform designed to provide a comprehensive educational experience for students seeking to acquire new skills and knowledge. This platform caters to a wide range of courses and subjects, offering an engaging and interactive learning environment. Here's a description of EduHub and a sample of dummy courses with their corresponding dummy teachers:

    *EduHub Overview:*
    EduHub is a cutting-edge online educational hub that connects students with a diverse array of courses taught by expert instructors. Our mission is to make quality education accessible to all, empowering individuals to pursue their passions and career goals. Whether you're a high school student looking to supplement your curriculum, a working professional seeking to upskill, or someone simply eager to explore new topics, EduHub has something for you.

    *Key Features:*
    1. *Course Variety:* EduHub boasts a wide range of courses covering subjects from arts and sciences to technology and business. Our course library is continuously expanding to keep up with the latest trends and demands.

    2. *Experienced Instructors:* All courses are taught by experienced and knowledgeable instructors who are experts in their respective fields. They are dedicated to guiding students through their learning journeys.

    3. *Interactive Learning:* Our platform emphasizes interactive learning with features such as quizzes, assignments, and discussion boards. Students can engage with course material and connect with peers for a richer learning experience.

    4. *Flexibility:* EduHub understands that learning should fit into your schedule. Therefore, most courses are self-paced, allowing students to study when and where they want.

    these are departments wit courses:

    1. *Full Stack Web Development*

    Join our Full Stack Web Development department and embark on a journey into the world of web development. In this comprehensive program, you'll master the fundamentals of web technologies, starting with:

    - *HTML (Duration: 4 weeks):* Learn the building blocks of web pages with Hyper Text Markup Language (HTML).
    - *CSS (Duration: 4 weeks):* Dive into Cascading Style Sheets (CSS) to create visually appealing web designs.
    - *JavaScript (Duration: 6 weeks):* Explore the dynamic world of JavaScript and add interactivity to your websites.
    - *Node.js (Duration: 8 weeks):* Understand server-side JavaScript runtime with Node.js.
    - *React (Duration: 8 weeks):* Harness the power of React, a JavaScript library for building dynamic user interfaces.

    2. *Data Science*

    Our Data Science department equips you with the skills to unlock the secrets hidden in data. Join us and explore the following courses:

    - *Introduction to Data Science (Duration: 6 weeks):* Dive into the basics of data analysis.
    - *Machine Learning (Duration: 10 weeks):* Learn the art of building predictive models.
    - *Statistical Analysis (Duration: 8 weeks):* Analyze data patterns and make data-driven decisions.
    - *Data Visualization (Duration: 6 weeks):* Represent data visually to convey insights effectively.
    - *Deep Learning (Duration: 10 weeks):* Dive deep into neural networks and artificial intelligence.

    3. *Mobile App Development*

    In the Mobile App Development department, you'll explore the dynamic world of app creation for various platforms. Discover these courses:

    - *Android Basics (Duration: 8 weeks):* Get started with Android app development.
    - *iOS Development (Duration: 10 weeks):* Create apps for Apple devices and the App Store.
    - *Flutter Framework (Duration: 8 weeks):* Build cross-platform apps using Google's Flutter.
    - *Mobile UI Design (Duration: 6 weeks):* Design user interfaces tailored for mobile devices.
    - *Mobile App Testing (Duration: 6 weeks):* Ensure app quality and functionality.

    4. *Business Administration*

    Our Business Administration department provides essential knowledge for aspiring entrepreneurs and business leaders. Enroll in these courses:

    - *Introduction to Business (Duration: 4 weeks):* Lay the foundation with fundamental business concepts.
    - *Marketing Strategies (Duration: 6 weeks):* Master effective marketing techniques.
    - *Financial Management (Duration: 8 weeks):* Learn to manage business finances strategically.
    - *Leadership Skills (Duration: 6 weeks):* Develop leadership qualities and management skills.
    - *Business Ethics (Duration: 4 weeks):* Explore ethical considerations in the business world.

    5. *Graphic Design*

    If you have a passion for visual communication, the Graphic Design department awaits. Discover the art of design through these courses:

    - *Design Fundamentals (Duration: 6 weeks):* Explore the basics of graphic design.
    - *Typography (Duration: 4 weeks):* Master the art of arranging type for impactful designs.
    - *Adobe Photoshop Masterclass (Duration: 8 weeks):* Dive into advanced image editing with Photoshop.
    - *Illustrator for Beginners (Duration: 6 weeks):* Create vector graphics using Adobe Illustrator.
    - *Web Design Principles (Duration: 6 weeks):* Learn the essentials of web design for online aesthetics.

    6. *Languages and Linguistics*

    Delve into the fascinating world of languages and linguistics with our department. Discover courses that open doors to communication:

    - *Introduction to Linguistics (Duration: 4 weeks):* Study language structures and systems.
    - *French Language (Duration: 10 weeks):* Embark on a journey to learn spoken and written French.
    - *Spanish Grammar (Duration: 8 weeks):* Explore the rules of the Spanish language.
    - *Chinese Characters (Duration: 12 weeks):* Learn to write and understand Chinese characters.
    - *Translation Techniques (Duration: 6 weeks):* Master strategies for effective translation.

    7. *Environmental Studies*

    Our Environmental Studies department focuses on understanding and preserving our planet. Join us in these critical courses:

    - *Introduction to Ecology (Duration: 6 weeks):* Explore ecosystems and environmental interactions.
    - *Climate Change Studies (Duration: 8 weeks):* Dive into global climate patterns and change.
    - *Sustainable Energy (Duration: 6 weeks):* Learn about renewable energy sources.
    - *Biodiversity Conservation (Duration: 8 weeks):* Discover strategies for preserving species diversity.
    - *Environmental Ethics (Duration: 4 weeks):* Discuss ethical considerations in environmental issues.

    Each department offers a range of courses

    EduHub is committed to nurturing the intellectual growth of students, helping them achieve their educational aspirations, and preparing them for success in their chosen fields. With a user-friendly interface, engaging content, and a dedicated community of learners, EduHub is the ideal destination for anyone looking to enroll in courses and embark on a rewarding educational journey.

    we offers 5+ departments and 40+ courses 

    **note : you have to reply the question which  is matched above otherwise reply some small message like ask relevant to our website

    **reply like chat bot don't take more than 50  words

    this below one is the question please reply from above content if its not matched reply a short message and content should be  short and concise.

    question : ${message}
    `;

    const response = await makeOpenAIRequest(prompt);

    return res.json({ message: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// Route 2: Make a request to OpenAI API taking prompt from the body and debug it
chatRouter.post(
  "/api/ai/assignment",
  authentication,
  authorize(["instructor", "admin"]),
  async (req, res) => {
    try {
      let { course, concept, level } = req.body;

      const prompt = `
    Course: ${course}
    Concept: ${concept}
    Level: ${level}

     the provided course, concept, and difficulty level, evaluate whether the concept is relevant to mentioned course. If the concept aligns with mentioned course, create an assignment following the format below. If the concept is unrelated to mentioned course, provide a brief one-line explanation stating that it is not suitable for assignment creation.

    **Format
    genrate content in html format like headings content

    Create assignment within  HTML tags format and use space for br tag if you want to highlight it
    in HTML format 

    example:
   { <h1 class="ql-align-center"><strong style="color: var(--tw-prose-bold);"> Building a Simple Counter App</strong></h1><p class="ql-align-center"><br></p><p><strong style="color: var(--tw-prose-bold);">Objective</strong><span style="color: var(--tw-prose-bold);">:</span> In this assignment, you will create a simple counter application using React and the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook.</p><p><br></p><p><strong style="color: var(--tw-prose-bold);">Requirements</strong><span style="color: var(--tw-prose-bold);">:</span></p><ol><li>Create a new React application using Create React App or your preferred setup.</li><li>Create a functional component called <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">Counter</code>.</li><li>Inside the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">Counter</code> component, use the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook to manage a <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">count</code> state variable with an initial value of 0.</li><li>Display the current count on the screen.</li><li>Add two buttons labeled "Increment" and "Decrement" below the count display.</li><li>Implement the following functionality:</li></ol><ul><li class="ql-indent-1">Clicking the "Increment" button should increase the count by 1.</li><li class="ql-indent-1">Clicking the "Decrement" button should decrease the count by 1, but the count should never go below 0.</li></ul><ol><li>Style the counter and buttons to make the application visually appealing.</li><li>Bonus (optional): Add a "Reset" button that sets the count back to 0 when clicked.</li></ol><p><strong style="color: var(--tw-prose-bold);">Hints</strong><span style="color: var(--tw-prose-bold);">:</span></p><ul><li>You can use the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook as follows:</li></ul><pre class="ql-syntax" spellcheck="false">const [count, setCount] = useState(0); 
    </pre><ul><li>Use event handlers to handle button clicks and update the state accordingly.</li><li><br></li></ul><p><strong style="color: var(--tw-prose-bold);">Submission</strong><span style="color: var(--tw-prose-bold);">:</span></p><p>Submit your assignment as a GitHub repository or as a code archive file. Include all the necessary files and instructions for running the application.</p><p><br></p><p><strong style="color: var(--tw-prose-bold);">Evaluation Criteria</strong><span style="color: var(--tw-prose-bold);">:</span></p><p>Your assignment will be evaluated based on the following criteria:</p><ul><li>Proper usage of the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook.</li><li>Correct functionality of the counter (increment, decrement, and reset).</li><li>Clear and organized code.</li><li>Visual design and styling of the counter application.</li><li>Bonus points for implementing additional features or improvements.</li></ul><p><br></p><p>This assignment will help your students practice using the <code style="color: var(--tw-prose-code); background-color: rgb(240, 240, 240);">useState</code> hook, which is a fundamental concept in React for managing state in functional components.</p>}
      
     **note: genreate content relate to the topic not above example and dont genertate in normal format,jsut return the html format nohting else `;

      const response = await makeOpenAIRequest(prompt);

      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
);

module.exports = {
  chatRouter,
};
