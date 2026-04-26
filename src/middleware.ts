import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 投稿フォームと編集フォームを保護
const isProtectedRoute = createRouteMatcher([
  "/food/new",
  "/food/(.*)/edit",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};