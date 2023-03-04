
# Building CRUD apps with MongoDB

## Overview - Can of Books App

Books are life-changing. They have the power to enlighten, educate, entertain, heal, and help us grow. Throughout this module, you'll create a small app to track what books have impacted you, and what's recommended to read next.

Web applications essentially all work by managing data related to "resources". The resources that an app cares about can be just about anything: a product for sale, an uploaded photo, a review, a bit of weather data... whatever it is that gets stored in a database. When the app provides the interface to create, read, update, and delete a resource, we refer to that as a CRUD app. Over the next few labs, you will build an app that has books as a resource.

For this assignment, you will READ book data by connecting your front-end React app to a back-end Express server. Your Express server will connect to a MongoDB database. You will need to make a "schema" in your back-end code to model how you want your data to look. You will then populate your database with "seed" data—some of your favorite books. When the front end makes a request to your server, your server will query the database and respond with all of the results from the database. Your front end will display these results.

## Process: Professional Pairing Practice

Much of the work you will be doing in the industry will be in pairs. In order to best prepare you for this, you will be working with the same partner all module on this book app project.

Before you begin to even think about your application, take at least 30 minutes to make a team agreement with your partner. This is an essential step to ensure a peaceful and productive module. You MUST answer the following questions in your agreement and include it in your README's "Collaboration" section:

### Logistical

- What hours will you be available to communicate?
  - We will both be available after class until a reasonable time
- What platform will you use to communicate (ie. Slack, phone ...)?
  - Slacks will be used to communicate
- How often will you take breaks?
  - We will play it by ear when it comes to breaks
- What is your plan if you start to fall behind?
  - If we start to fall behind will will talk with a TA or teacher for help

### Cooperative

- Make a list of each parson's strengths.
  - Reed: Front-end
  - Kawika: Back-end
- How can you best utilize these strengths in the development of your application?
  - We can prioritize time for each person relative to their strength
- In what areas do you each want to develop greater strength?
  - We both want to become better coders
- Knowing that every person in your team needs to understand the code, how do you plan to approach the day-to-day development?
  - We will communicate thoroughly throughout the day and work in group sessions

### Conflict Resolution

- What will your team do if one person is pulling all the weight while the other person is not contributing?
  - Each person would be confronted
- What will your team do if one person is taking over the project and not letting the other member contribute?
  - Each person would be confronted
- How will you approach each other and the challenge of building an application knowing that it is impossible for two people to be at the exact same place in understanding and skill level?
  - We will play to eachother's strengths and weaknesses

## Feature Tasks — READ of CRUD

 - Set up repository
 - Storage of books as data / API
 - Book component to display books in a carousel

Your instructor will supply you with a link to the Trello board for you to copy (see instructions below).

## Workflow

- We will be using the [Trello](https://trello.com/b/SCo4qC0c/can-of-books) project management tool for the duration of this project.
- After signing in to your account, go to the [Can of Books Trello board](https://trello.com/b/ns9ZCHQL/module-3-can-of-books){:target="_blank"}
- Open the "... Show Menu" link, click the "... More" link, and then click "Copy Board".
- Before you create it, be sure to "Change" from Private to "Public" (and click "Yes, Make Board Public") so your instructional team can see your work. Now, click "Create" to add a copy to your personal account.
- This Trello board contains all of the features required to complete each lab assignment.
- Review the user stories and analyze the feature requests and requirements in the lab.
- Within each story, note the acceptance criteria ("Given ... When ... Then...") and the checklist of feature tasks. Be careful to execute tasks in order as they are often dependencies of one another.
- Throughout the lab time, check off tasks as you complete them, and move the story cards through the workflow.

## Documentation

# Project Name

**Author**: Reed and Kawika
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
Books are life-changing. They have the power to enlighten, educate, entertain, heal, and help us grow. Throughout this module, you'll create a small app to track what books have impacted you, and what's recommended to read next.

## Getting Started
 1. Download the templates
 2. Follows the instructions

## Architecture
We used javascript, css, html, MangoDB, react

## Change Log

27-02-2023 5:34pm - We added the foundation of the site by filling in the blank code with instructions, creating the carousel and setting up the server.
28-02-2023 11:39pm - We added to the CSS and functionality of the site. We added an add and delete button. However, we were unable to finish the delete function.
01-03-2023 6:44pm - We added to the CSS and functionality of the site. We added an add and delete button. However, we were unable to finish the delete function.
03-03-23 7:33pm - Troubleshooted any bugs. Add login pagae and authenticator. Tested the code to ensure it is working properly
## Estimates
lab 1 - 3h 20m
lab 2 - 8h
lab 3 - 9h
lab 4 - 9h
## Credit and Collaborations
Kawika - doing most of the backend work

## Time Estimates

### Lab 1

Name of feature: Carousel and various initial front end code, as well as connecting front to back

Estimate of time needed to complete: 4h

Start time: 2:17pm

Finish time: 5:37pm

Actual time needed to complete: 3h 20m

### Lab 2

Name of feature: Add button and delete button as well as general CSS

Estimate of time needed to complete: 2h

Start time: 3:17pm

Finish time: 11:41pm

Actual time needed to complete: 9h 20m

### Lab 3

Name of feature: Modify Button

Estimate of time needed to complete: 3h

Start time: 10:17am

Finish time: 8:00pm

Actual time needed to complete: 10h 20m

### Lab 5

Name of feature: Final Touches and Testing + login

Estimate of time needed to complete: 4h

Start time: 11:00am

Finish time: 8:00pm

Actual time needed to complete: 9h

## Submission Instructions

1. Complete your Feature Tasks for the lab, according to the Trello cards.
1. Create a PR back to the `main` branch of your repository, showing ALL your work, and merge it cleanly.
1. On Canvas, submit a link to your PR. Add a comment in your Canvas assignment which includes the following:
    - A link to the deployed version of your latest code.
    - A link to your public Trello board.
    - A question within the context of this lab assignment.
    - An observation about the lab assignment, or related 'Ah-hah!' moment.
    - How long you spent working on this assignment.