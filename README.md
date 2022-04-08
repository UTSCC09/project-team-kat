# PayMates

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

PayMates is a web app that roommates can use to split costs easily and efficiently. A roommate can sign up and create a group for their fellow roommates to join. Once joined, each roommate can make posts on their group's canvas page for reminders, deadlines or whatever they want. Additionally each roommate has the ability to log a cost, as well as who that cost should be split amongst. Each roommate can then also pay off their balance to their roommates through our platform by providing their credit card details. The paid balance will be deposited into the other roommates bank account 7 days later. 

## Development

For our backend, we used `apollo-express-server` to run our `GraphQL` server and `ws` to power the websocket server. For the data layer, we used `MongoDB` and `Redis`.

For our frontend we used `React.js` with `JavaScript`. In our frontend we used the `apollo-client` as our `GraphQL` client to create subscriptions, while `axios` was used for queries and mutations. We also used some UI components from the UI Library `Material UI` or `MUI` known today. 

For our payments integration we utilized the `Stripe` API to let users sign up with a stripe integration when they register with our platform. We utilized the `Stripe Connect` portion of the API to transfer payments between users as well as payout to their respective bank accounts after 7 days. 

To make our canvas real-time and collaborative we utilized `GraphQL` subscriptions powered by websockets, while using `Redis` as the pubsub mechanism. 

## Deployment

We dockerized the backend and frontend into 2 seperate docker container and deployed it on digital ocean.

## Maintenance

We've added logs to ensure that both frontend and backend errors can be caught, if they arise. We've also thoroughly tested our applications a few days before the final deadline to ensure no last minute bugs and issues. 

We're also using DigitalOcean's built-in monitoring tools to track our application's metrics and status (latency, response times, throughput, memory, disk usage, system status, etc.).

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Integrating the Stripe API into our platform wasn't simple, and required a deep dive into the documentation.
2. Ensuring that the canvas for each group had live updates, required migrating the backend from `a` to `b`.
3. Building out the overall architecure of the platform both backend and frontend was difficult at first, but allowed the developmental process to be easier but was certainly challenging at first.

## Contributions

Keshavaa Shaiskandan - Did most of the frontend design on Figma as well and implemented the landing, auth, and create cost pages. Did the initial Stripe exploration and laid the process out for integrating stripe.

Tanizm Ahmed - Provided the main structure and format of the backend and frontend, and provided all of the error handling for frontend forms, as well as did most of the stripe integration after initial exploration by Keshavaa. Implemented the groups page including create group and join group from the frontend and the backend.

Ammar Tariq - Implemented the entire canvas page for groups with real-time functionality. Implemented the group finance page. Was also entirely responsibly for dockerizing the application and deployment as well.


# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
