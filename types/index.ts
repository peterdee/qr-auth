export interface ConnectionError {
  isTrusted: boolean;
  message?: string;
}

export interface MessageData {
  data?: string;
  event: string;
}
