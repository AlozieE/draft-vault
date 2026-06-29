import {
  REPORT_PRINT_DISCLAIMER,
  REPORT_PRINT_FOOTER_ATTRIBUTION,
} from "@/lib/report-export";

export function ReportPrintFooter() {
  return (
    <footer className="report-print-footer hidden print:block">
      <p className="report-print-footer-attribution">
        {REPORT_PRINT_FOOTER_ATTRIBUTION}
      </p>
      <p className="report-print-footer-disclaimer">{REPORT_PRINT_DISCLAIMER}</p>
    </footer>
  );
}
