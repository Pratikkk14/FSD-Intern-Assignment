import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About CSV Runner Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          A smart, user-friendly tool to analyze running data from CSV files
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🏃 What is this project?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-base leading-relaxed mb-4">
            The <strong>CSV Runner Dashboard</strong> is a web application that helps you visualize and analyze running data. 
            Simply upload a CSV file containing running records (who ran, when, and how many miles), and the dashboard 
            automatically validates, processes, and displays meaningful insights through interactive charts.
          </p>
          <p className="text-base leading-relaxed">
            Whether you're tracking your own runs or managing a running group, this tool makes it easy to see patterns, 
            compare performance, and understand trends—all without any complex setup or database configuration.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">✨ Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📤</span> Smart CSV Upload
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Drag and drop or click to upload CSV files</li>
              <li>• Instant file validation (checks if it's actually a CSV)</li>
              <li>• Empty file detection</li>
              <li>• Supports up to 10,000 rows with friendly warning dialog</li>
            </ul>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">🛡️</span> Robust Validation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Checks for required headers (date, person, miles run)</li>
              <li>• Headers work in any order or case (DATE, Date, date - all valid)</li>
              <li>• Validates each row's data format</li>
              <li>• Shows specific error messages with row numbers</li>
            </ul>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">📊</span> Interactive Charts
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Bar Chart:</strong> Average miles per person</li>
              <li>• <strong>Bar Chart:</strong> Total miles contribution</li>
              <li>• <strong>Line Chart:</strong> Individual running trends over time</li>
              <li>• Charts update dynamically when selecting different people</li>
            </ul>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="text-2xl">🎨</span> Dark/Light Mode
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• Toggle between dark and light themes</li>
              <li>• Your preference is automatically saved</li>
              <li>• All charts adapt to your chosen theme</li>
              <li>• Easy on the eyes, day or night</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">⚙️ How it Works</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Upload Your CSV File</h3>
              <p className="text-sm text-muted-foreground">
                Select a CSV file with columns: <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded">date</code>, 
                <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded mx-1">person</code>, and 
                <code className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded ml-1">miles run</code>
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Automatic Validation & Processing</h3>
              <p className="text-sm text-muted-foreground">
                The app checks every row for correct date format (DD-MM-YYYY), valid person names, 
                and positive mile numbers. Any errors? You'll see exactly which row and what's wrong.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Data Normalization</h3>
              <p className="text-sm text-muted-foreground">
                Behind the scenes, dates are converted to standard format, data is grouped by person, 
                and metrics are pre-calculated for lightning-fast chart rendering.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">View Insights</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to the Visualization page to see overall metrics, compare runners, 
                and analyze individual performance trends with interactive charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🔍 Edge Cases & Smart Handling</h2>
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <p className="text-sm mb-4 font-semibold">This app is built to handle real-world messy data:</p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">✅ What's Handled:</h4>
              <ul className="space-y-1">
                <li>• Empty rows are automatically skipped</li>
                <li>• Headers can be in ANY order (date first or last - doesn't matter)</li>
                <li>• Case-insensitive headers (DATE, Date, date all work)</li>
                <li>• Extra whitespace in person names is trimmed</li>
                <li>• Zero miles is allowed (rest day with logged entry)</li>
                <li>• Files with 10k+ rows show a soft warning (not blocked)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🚫 What's Rejected:</h4>
              <ul className="space-y-1">
                <li>• Non-CSV files (e.g., .xlsx, .txt)</li>
                <li>• Empty files with no data</li>
                <li>• Missing required headers</li>
                <li>• Invalid date formats (anything not DD-MM-YYYY)</li>
                <li>• Dates with impossible values (e.g., 32-13-2024)</li>
                <li>• Empty person names</li>
                <li>• Non-numeric or negative miles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🎯 Micro Features You'll Love</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Toast Notifications:</strong> Get instant feedback for every action (parsing, errors, success)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Error Messages with Row Numbers:</strong> "Invalid date at row 47" - know exactly where to fix
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Global State Management:</strong> Upload once, navigate freely - data persists across pages
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Responsive Charts:</strong> All visualizations adapt to your screen size (mobile, tablet, desktop)
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Data Preview Table:</strong> See the first 10 rows of your data to verify it's parsed correctly
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Person Dropdown:</strong> Switch between runners instantly - charts update in real-time
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>No Database Required:</strong> Everything runs in your browser - no data sent to servers
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-600 dark:text-green-400 font-bold">→</span>
            <p className="text-sm">
              <strong>Fail-Fast Validation:</strong> Stops at first error to save time (fix one, reupload, repeat)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">📄 Example CSV Format</h2>
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border border-slate-300 dark:border-slate-700 overflow-x-auto">
          <pre className="text-sm">
{`date,person,miles run
25-12-2024,Alice,5.5
26-12-2024,Bob,3.2
26-12-2024,Alice,4.8
27-12-2024,Charlie,6.0
27-12-2024,Bob,2.5`}
          </pre>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          💡 <strong>Tip:</strong> Headers can be in any order, and case doesn't matter (DATE, Person, Miles Run all work!)
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">🛠️ Built With</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-sm">Next.js 16</p>
            <p className="text-xs text-muted-foreground">App Router</p>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-sm">React 19</p>
            <p className="text-xs text-muted-foreground">Modern UI</p>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-sm">Recharts</p>
            <p className="text-xs text-muted-foreground">Visualizations</p>
          </div>
          <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-sm">Tailwind CSS</p>
            <p className="text-xs text-muted-foreground">Styling</p>
          </div>
        </div>
      </section>

      <div className="text-center p-8 bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-900">
        <h2 className="text-2xl font-bold mb-4">Ready to Analyze Your Running Data?</h2>
        <p className="text-muted-foreground mb-6">
          Upload your CSV file and get instant insights in seconds
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Upload CSV Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
