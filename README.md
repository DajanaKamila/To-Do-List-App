# To Do List App
To Do List is an application that makes it easier to manage everyday tasks. What distinguishes it from other applications of this type is the division of tasks into 4 categories:
- High Priority & Urgent Tasks
- Low Priority & Urgent Tasks
- High Priority & Not Urgent Tasks
- Low Priority & Not Urgent Tasks

This division can be displayed in the form of appropriate labels in the summary table, or as 4 separate tables in the "grid view". 

**Summary table**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/3b93c885-dc69-4fba-aa50-e2fbc8ed3af1)

**Grid view**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/47f4863e-c172-404e-80bc-66b6dd74cc3e)


## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Contributing](#contributing)

## Description
The main part of the app is the **summary table**. 
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/1bb2075d-7ce1-43f3-8b74-f7273e444712)
It consist of:
  - `checkbox` - to mark task as done. After checking it, task ends up in the finished tasks table
  - `task name`
  - `priority` - evry priority has its own label colour which makes it easier to notice which tasks are the most impornat ones. Low & Now Urgent are blue. High & Not Urgent are green. Low & Urgent are yellow. High & Urgent are red.
  - `deadline` - font color changes according to the deadline. If the task is less than 2 days away or the deadline has already passed, the date is displayed in red. If there are between 2 and 4 days left until the deadline, the date will be highlighted in yellow. If the task ends in more than 4 days, the date is displayed in blue.
  - `pen icon` and `trash icon` - to edit and remove the task

If **grid view** is selected, 4 tables appear that look similar to the summary table except for the lack of a priority column. Each of the 4 tables has a color corresponding to one of the 4 priorities. Tasks from the summary table are filtered and placed in the appropriate table to facilitate task management.
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/162f29f2-15d0-4401-acbe-5684301d566a)


After checking a task, it's automatically moved to the **finished tasks table**.
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/10c1df2c-39c6-498d-88da-4f9ade34c9a5)
Tasks are **automatically deleted 7 days after they are marked as done**.

**Adding a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/b2f02217-a20a-41e4-88d7-83ff453d4ae8)
Clicking the "add task" button opens a pop-up window containing a task adding form. Title and priority are mandatory fields and it is not possible to submit the form without completing them. The remaining fields can be left blank.

**Editing a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/219fbe2d-8cab-4732-93ce-fc09cb0d31ff)
Clicking the pen icon allows you to edit the task. An edit form appears with the current task data automatically filled in.

**Deleting a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/99d4eb8b-a3d4-48ac-91c6-ef5609059263)
Clicking the trash icon allows to delete the task. A pop-up window appears asking for confirmation of deletion.

**Viewing a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/10089e03-de4a-425e-8365-4a95ed01b32f)
Clicking on the task title redirects to a page containing its details. The page shows all information about the task, including its detailed description.

## Installation
To run the application locally, follow these steps:

Clone this repository to your local machine:
```
git clone https://github.com/DajanaKamila/To-Do-List-App.git
```
Navigate to the project directory:
```
cd To-Do-List-App
```
Start the application using Docker Compose:
```
docker-compose up
```

## Configuration
The application is configured via Docker using the docker-compose.yml file provided in the project root. It consists of three services:
* **mysql**: MySQL database container.
* **backend**: Backend server container.
* **frontend**: Frontend application container.

Each service is configured with necessary environment variables and network settings.

## Usage
Once the application is up and running, access it via a web browser using the following URL:
```
http://localhost:3000
```
From there, you can add, edit, delete, and view tasks as per your requirements.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow the standard GitHub flow: Fork the repository, make your changes, and submit a pull request.
