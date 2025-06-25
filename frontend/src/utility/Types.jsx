export const SessionType = {
  STUDY: 'STUDY',
  BREAK: 'BREAK'
};

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}