import { IBody, IExtractUser } from "../types/ITemplates";

export default function extractUser(req: IExtractUser): IBody {
  if (!req.user) return null;
  const { name, email } = req.user;
  return {
    name,
    email,
  };
}
