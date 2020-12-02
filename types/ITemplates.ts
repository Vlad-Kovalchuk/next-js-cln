export interface Request {
  db: any; // from documentation
  body: IBody;
  user: IUser;
  logIn?: (user: string, error: (err: string) => void) => void;
  logOut?: () => void;
  dbClient?: string;
}

export interface IBody {
  title?: string;
  start?: Date;
  end?: Date;
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
  mutate?: (arg?) => unknown;
}

export interface IExtractUser {
  user: IUser;
}

interface IUser {
  email: string;
  name: string;
  password: string;
  id: any;
}

export interface Response {
  json: (msg?: object) => unknown; // should be function :thinking:
  status: (
    code?: number
  ) => {
    json?: (msg: object) => void;
    send?: (text: string) => void;
    end?: () => void;
  };
  statusText: string;
  send?: (item: object) => unknown;
  message?: string;
  user?: IUser;
  text?: () => Promise<string>;
}

export interface SyntheticEvent {
  preventDefault(): void;
  currentTarget: any; // Team leader approved
}
