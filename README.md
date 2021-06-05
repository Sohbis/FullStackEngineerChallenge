**My Assumption**

•	One Admin created in database manually, with Role 1 and Designation Admin, Department IT, role 2 is for rest of the user.

•	When a new user is created by Admin a default password is set i.e., 123 for simplicity sake. In real world scenario a password will be send directly to the new user. But here I am using 123 as a default password. So when the new user will login he/she will be prompted to change the default password that is generated at the time of new user creation. A new employee can login after changing the default password.

•	For adding participant for performance review of any other employee, Admin need to select the department first and on the basis of that reviewers/participant names will be shown in the ‘Add Reviewer’ field. 

•	Note I am only allowing selected department manager to be added as reviewer in this section.

•	Note If Admin select a manager for his performance review, in such case admin cannot select any reviewer. 

•	I am only doing soft delete of employees in the DB changing their status to 0.

•	Note there are 3 Status 0 – inactive/removed, 1 – active, 2 – new employee.

•	Currently for an employee, performance review can added only be added once per month. However, an Admin can update it any time.

•	Currently using static values for department - [IT,Finance,HR] .

Technology Stack that I am using: Frontend-Angular, Backend- Node js and Database- MS Sql Server.


**Running Instruction**

For running Angular- 
1)npm install 
2)ng s 

For running Node- 
1)npm install
2)Change connection string inside NodeApi folder in Sqlconnect.js with restpect to your SQL server 
3)npm run serve


For database 
1) Use the Empdata.xlsx two import data into Sql server and create the table with name emptbl or create the table structure for emptbl from the script inside DB_MSSQL/Script DB
2) Create perfomanceTbl from the script inside DB_MSSQL/Script DB
3) Don't change the tables and stored procedure names.



# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
