import { z } from "zod";
import { apiClient, buildPath, type Credentials } from "@/shared/api";

const stateInstanceSchema = z.object({
  stateInstance: z.string(),
});

export async function getStateInstance(
  credentials: Credentials,
): Promise<string> {
  const { data } = await apiClient.get(
    buildPath(credentials, "getStateInstance"),
  );
  return stateInstanceSchema.parse(data).stateInstance;
}
