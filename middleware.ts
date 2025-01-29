import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "./convex/_generated/api";

const isSignInPage = createRouteMatcher(["/signin"]);
const isAdminRoute = createRouteMatcher(["/profile/admin"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/");
  }
  if (!isSignInPage && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
  if (isAdminRoute(request) && (await convexAuth.isAuthenticated())) {
    const user = await fetchQuery(
      api.users.viewer,
      {},
      { token: await convexAuth.getToken() },
    );
    if (user.role !== "admin") {
      return nextjsMiddlewareRedirect(request, "/");
    }
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
