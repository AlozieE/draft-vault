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
      onClick={() => window.print()}
    >
      <FileDown className="size-4" />
      Export PDF
    </Button>
  );
}

export function ReportExportActions() {
  return (
    <div className="flex flex-col items-end gap-1.5 print:hidden">
      <ExportReportButton />
      <p className="max-w-52 text-right text-xs leading-relaxed text-muted-foreground">
        {REPORT_EXPORT_TIP}
      </p>
    </div>
  );
}
