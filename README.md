# SmartSpender

SmartSpender is a web application designed to help users manage their personal finances efficiently. The application includes features like income and expense tracking, budget management, and financial reporting to provide users with actionable insights into their spending habits. SmartSpender is built with a focus on addressing the financial challenges faced by graduate students, but it is versatile enough for anyone seeking better control of their finances.

---

## Key Features

### Core Functionalities

#### Income and Expense Tracking
- Log, edit, and delete income sources and expenses.
- Categorize expenses for detailed tracking (e.g., rent, groceries, entertainment).

#### Budget Management
- Set monthly budgets for various categories.
- Monitor budget limits in real time and receive notifications for overruns.

#### Financial Insights and Analytics
- View a summary of total income and expenses.
- Analyze category-wise spending trends.

#### Monthly Reports
- Auto-generate monthly financial summaries.
- Download reports in CSV or Excel format.

#### Notifications and Alerts
- Receive email notifications for budget limits and bill payment reminders.

---

### Non-Functional Features

#### Data Security
- Secure user authentication via JSON Web Tokens (JWT).
- Password encryption and session management to protect user data.

#### Data Export
- Export financial data for personal analysis or records.

---

## Technology Stack

### Frontend
- **React.js**: For dynamic and interactive UI.
- **HTML/CSS**: For designing the layout and styling.
- **Chart.js**: For visualizing financial data with charts and graphs.

### Backend
- **Node.js (Express)**: API development and request handling.
- **MongoDB**: Flexible database for managing user data and transactions.
- **Nodemailer**: For sending email notifications and alerts.

### Tools
- **Postman**: For API testing and debugging.
- **Jira**: For project management and tracking progress.

---

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud-based)
- A working internet connection for sending email notifications.

### Installation
1. Clone the repository - git clone https://github.com/varshiniv1/SmartSpender.git
2. Go into the directory - cd SmartSpender
3. Install dependencies - npm install
4. Go into the server folder and start it - cd server, npm run start
5. Go into the client folder and start it - cd client, npm start

## How It Works

- **User Authentication**: Securely log in to manage financial data.
- **Transaction Management**: Log and categorize income and expenses.
- **Budget Tracking**: Set and monitor budgets with real-time alerts.
- **Visual Reports**: Generate insightful reports and download them.
- **Notifications**: Stay informed with email alerts for budgets and bills.

---

## Project Scope

### In Scope
- User authentication and session management.
- Transaction management (add/delete).
- Budget tracking and alerts.
- Financial report generation and visualization.

### Out of Scope
- Integration with external financial APIs (e.g., bank accounts).
- Multi-currency support.
- Real-time collaboration.

---

## Motivation

Graduate students face unique financial challenges while managing academic and personal responsibilities. SmartSpender aims to simplify financial management by providing tools tailored for budgeting, expense tracking, and decision-making.

---

## Team and Contribution

This project was developed as part of the CS520 course. Contributions include:
- Backend API development
- Frontend design and implementation
- Financial data analytics and reporting

---

## License

This project is open-source under the MIT License.
