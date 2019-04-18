export class Alert {
  type: AlertType;
  header: string;
  message: string;
  tip: string;
  progress: number;
  autodismiss: boolean;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
