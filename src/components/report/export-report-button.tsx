"use client";

import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ExportReportButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="print:hidden"
      onClick={() => window.print()}
    >
      <FileDown className="size-4" />
      Export PDF
    </Button>
  );
}
