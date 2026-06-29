export type TextChangeOperation =
  | {
      type: "insert";
      position: number;
      insertedText: string;
    }
  | {
      type: "delete";
      position: number;
      deletedText: string;
    };

export function computeTextChanges(
  previousText: string,
  currentText: string,
): TextChangeOperation[] {
  if (previousText === currentText) {
    return [];
  }

  let prefixLength = 0;
  const minLength = Math.min(previousText.length, currentText.length);

  while (
    prefixLength < minLength &&
    previousText[prefixLength] === currentText[prefixLength]
  ) {
    prefixLength++;
  }

  const deletedText = previousText.slice(prefixLength);
  const insertedText = currentText.slice(prefixLength);
  const changes: TextChangeOperation[] = [];

  if (deletedText.length > 0) {
    changes.push({
      type: "delete",
      position: prefixLength,
      deletedText,
    });
  }

  if (insertedText.length > 0) {
    changes.push({
      type: "insert",
      position: prefixLength,
      insertedText,
    });
  }

  return changes;
}

export function createTextPreview(change: TextChangeOperation): string {
  if (change.type === "insert") {
    const preview =
      change.insertedText.length > 40
        ? `${change.insertedText.slice(0, 40)}…`
        : change.insertedText;

    return `+${preview}`;
  }

  const preview =
    change.deletedText.length > 40
      ? `${change.deletedText.slice(0, 40)}…`
      : change.deletedText;

  return `-${preview}`;
}
