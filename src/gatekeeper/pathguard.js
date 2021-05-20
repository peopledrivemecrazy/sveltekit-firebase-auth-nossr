import { goto } from "$app/navigation";

export const securePaths = [{ path: "/app" }, { path: "/dev" }];

export const switchPath = async (path) => {
  await goto(path);
};
