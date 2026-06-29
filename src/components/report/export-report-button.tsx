"use client";

import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { REPORT_EXPORT_TIP } from "@/lib/report-export";

export function ExportReportButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full sm:w-auto"
      onClick={() => window.print()}
    >
      <FileDown className="size-4" />
      Export PDF
    </Button>
  );
}

export function ReportExportActions() {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-1.5 sm:max-w-xs sm:items-end print:hidden">
      <ExportReportButton />
      <p className="text-xs leading-relaxed text-muted-foreground sm:text-right">
        {REPORT_EXPORT_TIP}
      </p>
    </div>
  );
}
