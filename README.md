# 🏃 CSV Runner Dashboard  
**FSD Intern Assignment**

---

## 1. Project Overview

This project is part of the **FSD Intern Assignment**.  
It implements a **CSV Runner Dashboard** built with Next.js (App Router) that allows users to upload a CSV file containing running data (`date`, `person`, `miles run`) and provides:

- **Dark/Light Mode Toggle** with theme persistence
- **CSV Upload & Validation** with row limit checks (10k rows soft limit)
- **Data Normalization** (DD-MM-YYYY → YYYY-MM-DD ISO format)
- **Visual Insights** via interactive Recharts:
  - **Average Miles Run per Person** (Bar Chart)
  - **Total Miles Contribution by Person** (Bar Chart)
  - **Running Trend Over Time** (Line Chart - per person)
- **Per-Person Analysis** with dropdown selector
- **Robust Error Handling** with detailed validation messages
- **Global State Management** via React Context API

The app uses **Next.js** (App Router), **React 19**, **Tailwind CSS v4**, **shadcn/ui**, **Recharts**, and **Papa Parse**, with all data processing performed client-side.

---

## 2. Key Features

### 🎨 Theme Support
- **Dark/Light Mode Toggle** in Navbar
- Theme persists using localStorage
- CSS variables for Tailwind Dark Mode

### 📤 CSV Upload & Validation
- Accept `.csv` files only
- **Header Validation**: Case-insensitive, order-independent
  - Required headers: `date`, `person`, `miles run`
- **Row-by-Row Validation**:
  - Date: DD-MM-YYYY format (day 1-31, month 1-12, year 1900-2100)
  - Person: Non-empty string
  - Miles: Non-negative numeric value
- **Soft Row Limit**: 10,000 rows with AlertDialog warning
- **Error Handling**: Fail-fast with detailed error messages

### 🔄 Data Normalization
- Converts DD-MM-YYYY → YYYY-MM-DD ISO format
- Groups data by person for easy access
- Computes aggregated metrics automatically

### 📊 Charts & Visualizations
- **Overall View**:
  - Average Miles Run per Person (Bar Chart - Blue)
  - Total Miles Contribution by Person (Bar Chart - Green)
  - Summary metrics (total runs, people, miles)
- **Per-Person View**:
  - Person dropdown selector
  - Running Trend Over Time (Line Chart - Orange)
  - Per-person metrics (total, count, average)

### 🌐 Global State Management
- React Context API for cross-page data access
- `DataContext` provides parsed data to all pages
- Seamless navigation between upload and visualization pages

## 3. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js (App Router) |
| **UI Library** | React |
| **Styling** | Tailwind CSS v4 |
| **Component Library** | shadcn/ui |
| **Charts** | Recharts |
| **CSV Parsing** | Papa Parse |
| **Toast Notifications** | Sonner |
| **Icons** | Lucide React |
| **State Management** | React Context API |

---

## 4. Project Structure

```
src/
├── app/
│   ├── layout.js                    # Root layout with providers (Theme, Data, Navbar)
│   ├── page.js                      # Home page with CSV upload
│   ├── about/
│   │   └── page.js                  # About project page
│   ├── contact me/
│   │   └── page.js                  # Contact page
│   └── visualization/
│       └── page.js                  # Charts & metrics visualization page
├── components/
│   ├── Navbar.js                    # Navigation with theme toggle
│   ├── Footer.js                    # Footer with contact info
│   ├── ThemeProvider.js             # Theme context provider
│   ├── ThemeToggle.js               # Dark/light mode toggle button
│   ├── CsvUploader.js               # CSV upload & validation component
│   └── ui/                          # shadcn/ui components
├── context/
│   └── DataContext.js               # Global data context
├── lib/
│   └── metrics.js                   # Metrics computation functions
└── Testing CSV Files/               # Sample test files
    ├── normal.csv                   # Invalid: Missing required headers
    ├── SampleDataForNextjs.csv      # Valid: Perfect test file
    └── SampleErrorFileForNextJs.csv # Invalid: Data validation errors
```

---

## 5. CSV Format Requirements

### Headers (Required)
- `date` - Date of the run (DD-MM-YYYY format)
- `person` - Name of the runner
- `miles run` - Distance in miles

**Note:** Headers are case-insensitive and order-independent.

### Data Validation
| Field | Format |
|-------|--------|
| `date` | DD-MM-YYYY |
| `person` | String |
| `miles run` | Number |

### Example CSV
```csv
date,person,miles run
25-12-2024,Alice,5.5
26-12-2024,Bob,3.2
26-12-2024,Alice,4.8
```

### Testing Files Provided

Three sample CSV files are included in the `Testing CSV Files/` folder for testing the validation and error handling:

| File | Purpose | Expected Result |
|------|---------|----------------|
| `normal.csv` | Missing required headers | ❌ Should show "Invalid CSV format: required headers are missing" error |
| `SampleDataForNextjs.csv` | Perfect valid data | ✅ Should parse successfully and display all charts |
| `SampleErrorFileForNextJs.csv` | Contains data validation errors | ❌ Should show specific row-level validation errors (date format, invalid values, etc.) |

**How to Test:**
1. Navigate to the home page (`/`)
2. Upload each test file one by one
3. Observe how the app handles valid data vs. different types of errors
4. Verify error messages are clear and specific

---

## 6. Prerequisites

Make sure you have:

- **Node.js** v18 or newer
- **pnpm** v10 (recommended) or **npm**

---

## 7. Setup & Installation

### 1. Install dependencies
```bash
pnpm install
```

Or with npm:
```bash
npm install
```

### 2. Run the development server
```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 8. Usage

### Step 1: Upload CSV
1. Go to the home page (`/`)
2. Click the file input to select a CSV file
3. The app will validate and parse the file
4. On success, you'll see a summary with a "View Visualizations & Metrics" button

### Step 2: View Visualizations
1. Click "View Visualizations & Metrics" or navigate to `/visualization`
2. See overall metrics and two bar charts
3. Use the person dropdown to view individual trends
4. The line chart updates dynamically based on selected person

### Step 3: Toggle Theme
- Click the moon/sun icon in the Navbar to switch between dark and light modes
- Your preference is saved automatically

---

## 9. Error Handling

The app provides detailed error messages for:

| Error | Message |
|-------|---------|
| Non-CSV file | "The input file is not a CSV file." |
| Empty file | "File is empty." |
| Missing headers | "Invalid CSV format: required headers are missing (date, person, miles run)" |
| Invalid date format | "Invalid date value at row X: must be in DD-MM-YYYY format" |
| Invalid date range | "Invalid date value at row X: day/month/year out of range" |
| Missing person | "Invalid person value at row X: person is missing" |
| Non-numeric miles | "Invalid miles run value at row X: is not a number" |
| Negative miles | "Invalid miles run value at row X: miles run must be positive" |
| Exceeds row limit | "The file contains X rows, which exceeds the 10,000 row limit." |

---

## 10. Notes

- **No Database**: All data is stored in browser state (React Context)
- **No Environment Variables**: The app works out of the box
- **Client-Side Processing**: All CSV parsing and validation happens on the client
- **Dark Mode Persistence**: Theme preference is saved in localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile devices

---

## 11. Future Enhancements

Potential additions:
- 📥 CSV export functionality
- 📅 Date range filters
- 🏆 Leaderboards and rankings
- 📈 Advanced trend analysis
- 🔍 Search and filter by person/date
- 📊 Additional chart types (pie, scatter, etc.)