import { APP_NAME } from "@/lib/constants";
import { getVerificationStatusLabel } from "@/lib/report-export";

type ReportPrintHeaderProps = {
  documentTitle: string;
  generatedAtLabel: string;
  chainIsValid: boolean;
};

export function ReportPrintHeader({
  documentTitle,
  generatedAtLabel,
  chainIsValid,
}: ReportPrintHeaderProps) {
  const verificationLabel = getVerificationStatusLabel(chainIsValid);

  return (
    <header className="report-print-header hidden print:block">
      <p className="report-print-brand">{APP_NAME}</p>
      <h1 className="report-print-title">Authorship Report</h1>
      <p className="report-print-document-title">{documentTitle}</p>
      <p className="report-print-meta">Generated {generatedAtLabel}</p>
      <p
        className={
          chainIsValid
            ? "report-print-verification report-print-verification--passed"
            : "report-print-verification report-print-verification--failed"
        }
      >
        {verificationLabel}
      </p>
    </header>
  );
}
