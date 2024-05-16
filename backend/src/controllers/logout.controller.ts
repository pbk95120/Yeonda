import { Controller } from "@schemas/controller.schema";
import http from "http-status-codes";

export const proceedLogout: Controller = async (req, res) => {
  const sameSiteOption: "lax" | "strict" | "none" =
    process.env.NODE_ENV === "development" ? "lax" : "strict";

  const option = {
    sameSite: sameSiteOption,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    path: "/",
  };

  res.clearCookie("access-token", option);
  res.clearCookie("refresh-token", option);
  res.sendStatus(http.OK);
};
