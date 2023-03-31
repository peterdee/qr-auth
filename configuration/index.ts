import backendURL from './backend';

export const BACKEND_URL = backendURL;

export const COLORS = {
  accent: '#1D0C59',
  error: '#AA2244',
  muted: '#8A8A8A',
  text: '#0A0A0A',
  textInverted: '#FFFFFF',
};

export const EVENTS = {
  authenticateTarget: 'authenticate-target',
  clientDisconnect: 'client-disconnect',
  invalidTarget: 'invalid-target',
  ping: 'ping',
  pingResponse: 'pong',
  registerConnection: 'register-connection',
  registerUser: 'register-user',
  serverDisconnect: 'server-disconnect',
  signOut: 'sign-out',
  unauthorized: 'unauthorized',
};

export const SPACER = 16;
