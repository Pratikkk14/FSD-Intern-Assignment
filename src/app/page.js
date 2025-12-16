import { CsvUploader } from "@/components/CsvUploader";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to Runner Dashboard</h1>
      <p className="text-lg text-muted-foreground">
        Add your CSV file below to get started.
      </p>
      <CsvUploader />
    </main>
  );
}
