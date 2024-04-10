# To Do List App

**Some of the functionalities of the webapp are still under construction.**

To Do List is an application that makes it easier to manage everyday tasks. What distinguishes it from other applications of this type is the division of tasks into 4 categories:
- High Priority & Urgent Task
- Low Priority & Urgent Task
- High Priority & Not Urgent Task
- Low Priority & Not Urgent Task

This division can be displayed in the form of appropriate labels in the summary table, or as 4 separate tables in the "grid view". Currenty the grid view is under construction.
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/6be1ca94-49ae-4a42-8fd3-daa06b90b6dd)
## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Configuration](#configuration)

## Description
The main part of the app is the **summary table**. 
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/1bb2075d-7ce1-43f3-8b74-f7273e444712)
It consist of:
  - `checkbox` - to mark task as done. After checking it, task ends up in the finished tasks table
  - `task name`
  - `priority` - evry priority has its own label colour which makes it easier to notice which tasks are the most impornat ones. Low & Now Urgent are blue. High & Not Urgent are green. Low & Urgent are yellow. High & Urgent are red.
  - `deadline` - font color changes according to the deadline. If the task is less than 2 days away or the deadline has already passed, the date is displayed in red. If there are between 2 and 4 days left until the deadline, the date will be highlighted in yellow. If the task ends in more than 4 days, the date is displayed in blue.
  - `pen icon` and `trash icon` - to edit and remove the task

After checking a task, it's automatically moved to the **finished tasks table**.
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/10c1df2c-39c6-498d-88da-4f9ade34c9a5)
Tasks are automatically deleted 7 days after they are marked as done.

**Adding a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/b2f02217-a20a-41e4-88d7-83ff453d4ae8)
Clicking the "add task" button opens a pop-up window containing a task adding form. Title and priority are mandatory fields and it is not possible to submit the form without completing them. The remaining fields can be left blank.

**Editing a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/219fbe2d-8cab-4732-93ce-fc09cb0d31ff)
Clicking the pen icon allows you to edit the task. An edit form appears with the current task data automatically filled in.

**Deleting a task**
![image](https://github.com/DajanaKamila/To-Do-List-App/assets/123153434/99d4eb8b-a3d4-48ac-91c6-ef5609059263)
Clicking the trash icon allows to delete the task. A pop-up window appears asking for confirmation of deletion.
