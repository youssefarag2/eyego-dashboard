# Eyego Frontend Internship - Technical Task

A responsive sales analytics dashboard built to fulfill the technical assessment for the Eyego Frontend Internship position. This project showcases a modern frontend stack and best practices, including component-based architecture, state management, and a focus on user experience.

![Dashboard Screenshot](path_to_your_screenshot.png)
_(**Note**: Remember to take a screenshot of your finished dashboard and add it to your repository. Replace the path above with the actual path to your image.)_

---

## Features

- **User Authentication**: Secure login flow using a mocked API and Redux Toolkit for state management.
- **Dynamic Data Table**: A feature-rich table displaying sales data with:
  - **Client-side Filtering**: Instantly search the data by product name.
  - **Column Sorting**: Sort data by any column in ascending or descending order.
  - **Pagination**: Efficiently navigate through large datasets.
- **Interactive Chart**: A responsive bar chart from Recharts visualizing total sales revenue per month.
- **Responsive Design**: A mobile-first approach ensuring a seamless experience on all devices, from mobile phones to desktops.
- **Asynchronous Operations**: Loading and error states are handled gracefully for all data-fetching and authentication processes.

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Charting**: Recharts
- **Icons**: Lucide React

---

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd your-repo-name
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

5.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Login Credentials

Use the following mock credentials to log in:

- **Email**: `admin@eyego.com`
- **Password**: `password`

---

## Implementation Approach

This project was built with a focus on modern development practices, scalability, and code quality.

### Project Structure

The project uses the **Next.js App Router** with the `src/` directory for a clean and organized codebase. Key directories include:

- `src/app/`: Contains all routing and pages.
- `src/components/`: Houses reusable React components (`DataTable`, `SalesChart`, `Sidebar`, etc.).
- `src/store/`: Dedicated to Redux Toolkit setup, including the store configuration and all state slices.
- `src/lib/`: Holds library code, such as the mock API functions and data definitions.

### State Management with Redux Toolkit

**Redux Toolkit** was chosen for its simplicity and power in managing global application state.

- **Centralized Store**: A single source of truth makes the application's data flow predictable and easy to debug.
- **Slices**: The state is organized into logical `slices`.
  - `authSlice`: Manages user authentication state, including login status, user data, and async operation status (`loading`, `failed`).
  - `salesSlice`: Manages the sales data, including the raw data array and the status of the data fetching operation.
- **`createAsyncThunk`**: This is used extensively to handle asynchronous actions like logging in and fetching data. It simplifies managing loading and error states, which are reflected gracefully in the UI.

### Component Architecture

- **Modularity**: The UI is broken down into small, reusable components. For example, the `DataTable` is self-contained and manages its own UI state (sorting, filtering, pagination), while receiving its data from the parent page.
- **Data Processing Pipeline**: The `DataTable` component demonstrates an efficient client-side data processing pipeline. User input triggers a sequence of memoized calculations: **Filter -> Sort -> Paginate**. Using the `useMemo` hook ensures that these potentially expensive operations only re-run when necessary.
- **Data Visualization**: The `SalesChart` component takes raw transactional data and, using a `useMemo` hook, processes it into a monthly aggregated summary suitable for visualization. This separation of data processing from rendering keeps the component clean.

### Styling and Responsiveness

**Tailwind CSS** was used for its utility-first approach, allowing for rapid development of a custom, responsive design directly within the JSX.

- **Mobile-First**: The design was approached with mobile screens as the primary target.
- **Responsive Sidebar**: On desktop, the sidebar is fixed and always visible. On mobile, it collapses into a "hamburger" menu and slides in as an overlay, a common and effective pattern for mobile UX.
- **Responsive Components**: The `DataTable` uses horizontal scrolling on small screens to avoid breaking the layout, and the `SalesChart` uses `Recharts`' `ResponsiveContainer` to adapt its size automatically.
