'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";
import Papa from "papaparse";
import { toast } from "sonner";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useData } from "@/context/DataContext";

export function CsvUploader() {
  const [error, setError] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [showRowLimitDialog, setShowRowLimitDialog] = useState(false);
  const [rowLimitError, setRowLimitError] = useState("");
  const { setParsedData: setGlobalParsedData } = useData();

  const REQUIRED_HEADERS = ["date", "person", "miles run"];
  const ROW_LIMIT = 10000;

  const validateHeaders = (headers) => {
    const normalizedHeaders = headers.map(h => h.toLowerCase().trim());

    const missingHeaders = REQUIRED_HEADERS.filter(
      required => !normalizedHeaders.includes(required)
    );

    if (missingHeaders.length > 0) {
      return {
        isValid: false,
        error: `Invalid CSV format: required headers are missing (${missingHeaders.join(", ")})`,
      };
    }

    return {
      isValid: true,
      normalizedHeaders,
      headerIndices: REQUIRED_HEADERS.map(required =>
        normalizedHeaders.indexOf(required)
      ),
    };
  };

  // Row validation
  const validateRow = (row, headerIndices, rowNumber) => {
    const dateIdx = headerIndices[0];
    const personIdx = headerIndices[1];
    const milesIdx = headerIndices[2];

    const dateValue = row[dateIdx]?.toString().trim();
    const personValue = row[personIdx]?.toString().trim();
    const milesValue = row[milesIdx]?.toString().trim();

    // Date check
    if (!dateValue) {
      return { isValid: false, error: `Invalid date value at row ${rowNumber + 2}: date is missing` };
    }
    
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(dateValue)) {
      return { isValid: false, error: `Invalid date value at row ${rowNumber + 2}: "${dateValue}" must be in DD-MM-YYYY format` };
    }
    
    const dateParts = dateValue.split('-');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    if (day < 1 || day > 31) {
      return { isValid: false, error: `Invalid date value at row ${rowNumber + 2}: day must be between 1 and 31` };
    }
    if (month < 1 || month > 12) {
      return { isValid: false, error: `Invalid date value at row ${rowNumber + 2}: month must be between 1 and 12` };
    }
    if (year < 1900 || year > 2100) {
      return { isValid: false, error: `Invalid date value at row ${rowNumber + 2}: year must be between 1900 and 2100` };
    }

    // Person check
    if (!personValue) {
      return { isValid: false, error: `Invalid person value at row ${rowNumber + 2}: person is missing` };
    }
    if (typeof personValue !== "string" || personValue.length === 0) {
      return { isValid: false, error: `Invalid person value at row ${rowNumber + 2}: person must be non-empty string` };
    }

    // Miles check
    if (!milesValue) {
      return { isValid: false, error: `Invalid miles run value at row ${rowNumber + 2}: miles run is missing` };
    }
    const miles = parseFloat(milesValue);
    if (isNaN(miles)) {
      return { isValid: false, error: `Invalid miles run value at row ${rowNumber + 2}: "${milesValue}" is not a number` };
    }
    if (miles < 0) {
      return { isValid: false, error: `Invalid miles run value at row ${rowNumber + 2}: miles run must be positive` };
    }

    return { isValid: true };
  };

  // Convert row to normalized format
  const normalizeRow = (row, headerIndices) => {
    const dateIdx = headerIndices[0];
    const personIdx = headerIndices[1];
    const milesIdx = headerIndices[2];

    // DD-MM-YYYY to ISO format
    const dateValue = row[dateIdx].toString().trim();
    const dateParts = dateValue.split('-');
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    const isoDate = `${year}-${month}-${day}`;

    return {
      date: isoDate,
      person: row[personIdx].toString().trim(),
      miles: parseFloat(row[milesIdx].toString().trim()),
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Must be .csv
    if (file && file.name.split('.').pop().toLowerCase() !== "csv") {
      setError("The input file is not a CSV file.");
      e.target.value = "";
      toast.error("Invalid file format");
      return;
    }

    if (!file) return;

    // Empty file
    if (file.size === 0) {
      setError("File is empty.");
      toast.error("File is empty");
      e.target.value = "";
      return;
    }

    setError("");
    toast.info(`Parsing ${file.name}...`);

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csv = event.target.result;

        Papa.parse(csv, {
          header: false,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data;

            // Empty CSV
            if (!rows || rows.length === 0) {
              setError("CSV file is empty or unreadable.");
              setTimeout(() => {
                toast.error("CSV file is empty or unreadable");
              }, 500);
              e.target.value = "";
              return;
            }

            // Headers but no data
            if (rows.length === 1) {
              setError("CSV has headers but no data rows.");
              setTimeout(() => {
                toast.error("CSV must contain data rows");
              }, 500);
              e.target.value = "";
              return;
            }

            const headers = rows[0];
            const dataRows = rows.slice(1);

            // Row limit check
            if (dataRows.length > ROW_LIMIT) {
              setRowLimitError(`The file contains ${dataRows.length.toLocaleString()} rows, which exceeds the 10,000 row limit.`);
              e.target.value = "";
              setTimeout(() => {
                setShowRowLimitDialog(true);
              }, 100);
              return;
            }

            // Header check
            const headerValidation = validateHeaders(headers);
            if (!headerValidation.isValid) {
              setError(headerValidation.error);
              setTimeout(() => {
                toast.error(headerValidation.error);
              }, 500);
              e.target.value = "";
              setParsedData(null);
              return;
            }

            // Process rows
            const normalizedRows = [];
            for (let i = 0; i < dataRows.length; i++) {
              // Skip blank rows
              const isEmptyRow = dataRows[i].every(cell => !cell || cell.toString().trim() === "");
              if (isEmptyRow) {
                continue;
              }

              const validationResult = validateRow(dataRows[i], headerValidation.headerIndices, i);
              if (!validationResult.isValid) {
                setError(validationResult.error);
                setTimeout(() => {
                  toast.error(validationResult.error);
                }, 500);
                e.target.value = "";
                setParsedData(null);
                return;
              }
              const normalized = normalizeRow(dataRows[i], headerValidation.headerIndices);
              normalizedRows.push(normalized);
            }

            const data = {
              headers,
              rawRows: dataRows,
              normalizedRows,
              rowCount: normalizedRows.length,
              columnCount: headers.length,
              headerIndices: headerValidation.headerIndices,
              groupedByPerson: normalizedRows.reduce((acc, run) => {
                if (!acc[run.person]) {
                  acc[run.person] = [];
                }
                acc[run.person].push(run);
                return acc;
              }, {}),
            };

            setParsedData(data);
            setGlobalParsedData(data);
            
            setTimeout(() => {
              toast.success("File is parsed");
            }, 500);
          },
          error: (error) => {
            setError(`Error parsing CSV: ${error.message}`);
            setTimeout(() => {
              toast.error(`Error parsing CSV: ${error.message}`);
            }, 500);
            e.target.value = "";
          },
        });
      } catch (err) {
        setError("Failed to read file.");
        toast.error("Failed to read file");
        e.target.value = "";
      }
    };

    reader.onerror = () => {
      setError("Unable to read file.");
      toast.error("Unable to read file");
      e.target.value = "";
    };

    reader.readAsText(file);
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="csvFile">CSV File</Label>
      <Input
        id="csvFile"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      {error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
      {parsedData && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Headers:</strong> {parsedData.headers.join(", ")}
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-1">
            <strong>Required headers found:</strong> {REQUIRED_HEADERS.join(", ")}
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-1">
            <strong>Total runs:</strong> {parsedData.rowCount} (normalized)
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-1">
            <strong>People:</strong> {Object.keys(parsedData.groupedByPerson).length} ({Object.keys(parsedData.groupedByPerson).join(", ")})
          </p>
          <p className="text-sm text-green-800 dark:text-green-200 mt-1">
            <strong>Status:</strong> ✅ Normalized & Grouped by person
          </p>
          <Link href="/visualization">
            <button className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              View Visualizations & Metrics
            </button>
          </Link>
        </div>
      )}

      {/* Row Limit Dialog */}
      <AlertDialog open={showRowLimitDialog} onOpenChange={setShowRowLimitDialog}>
        <AlertDialogContent className="border-red-900 bg-red-950">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <div>
                <AlertDialogTitle className="text-red-600">File Exceeds Row Limit</AlertDialogTitle>
              </div>
            </div>
            <AlertDialogDescription className="text-red-500 mt-2">
              {rowLimitError}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4 p-3 border border-red-900 rounded-lg bg-red-900/30">
            <p className="text-red-500 text-sm">
              Please select a different CSV file with fewer than 10,000 rows.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setShowRowLimitDialog(false);
                setRowLimitError("");
              }}
              className="bg-red-900 text-red-100 hover:bg-red-800 border-red-800"
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
