import type { ContentWarning } from "#/types/comics";

export type ContentWarningDialogProps = Readonly<{
  contentWarnings: Array<ContentWarning>;
  comicTitle: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}>;
