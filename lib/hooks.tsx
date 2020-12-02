import useSWR from "swr";
import { IBody } from "../types/ITemplates";

const fetcher = (url) => fetch(url).then((r) => r.json());

export function useCurrentUser(): IBody[] {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const user = data?.user;
  return [user, { mutate }];
}

export function useUser(): IBody[] {
  const { data, mutate } = useSWR("/api/user", fetcher);
  const user = data && data.user;
  return [user, { mutate }];
}
