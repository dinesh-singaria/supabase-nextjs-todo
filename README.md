# Supabase Next.js Todo App

A collaborative Todo application that allows users to create, assign, and manage tasks with real-time updates.

---

## 🚀 Features

- **User Authentication**: Powered by Supabase.
- **Task Management**: Create, assign, and filter tasks.
- **Real-time Updates**: Instant task and notification updates.
- **Notifications**: Users receive notifications when assigned a task.
- **Filters**: Filter tasks by assignment, creation, due date, or completion status.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Realtime, Auth)
- **Deployment**: Vercel

---

## 📂 Project Setup Instructions

### Prerequisites

Ensure you have the following installed:

1. **Node.js**: v16+
2. **npm** or **yarn**
3. A **Supabase Project**:
   - Sign up at [Supabase](https://supabase.io) and create a new project.

---

### 📝 Steps to Set Up

#### 1. Clone the Repository

 ```bash
git clone https://github.com/dinesh-singaria/supabase-nextjs-todo.git
cd supabase-nextjs-todo
```


### 2. Install Dependencies

```bash
npm install
```


### 3. Configure Environment Variables

Create a .env.local file in the root directory and add the following:
```env
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```
Replace <your_supabase_url> and <your_supabase_anon_key> with the values from your Supabase project (found under Settings > API).


### 4. Run the Development Server

Start the server locally:
```bash
npm build
npm run dev
```
Visit http://localhost:3000 to view the app in your browser.

### 5. Sign up

if you are signing up for the first time just enter your email and then you will receive a mail from Auth Supabase for authentication
Now ToDoApp will be up and running for your use.

---


🖥️ Usage
	1.	Sign Up: Create an account to start using the app.
	2.	Create Tasks: Add tasks for yourself or assign them to others.
	3.	View Notifications: See real-time notifications for assigned tasks.
	4.	Filter Tasks: Use filters to organize your task list.


 🚀 Deployment
	1.	Deploy the app using Vercel.
	2.	Set up the same environment variables on Vercel:
	•	NEXT_PUBLIC_SUPABASE_URL
	•	NEXT_PUBLIC_SUPABASE_ANON_KEY
	3.	Ensure your Supabase project is accessible from the deployed domain.


 🛠️ Future Enhancements
	•	Add recurring tasks.
	•	Support comments on tasks.
	•	Implement testing with Jest and React Testing Library.
	•	Add a dark mode theme.

 📧 Contact
For any queries, reach out to [dineshsingaria.111@gmail.com/+44 7741545733].

Happy Coding! 🎉
