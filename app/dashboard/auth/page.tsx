import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function RedirectProtected(): void {
  revalidatePath("/dashboard");
  redirect(`/dashboard`);
}

// THIS IS TO CLARIFY THE FLOW OF THE PAGE (UX)

// I wanted the "/dashboard" page to be protected so the users
// who are not logged in would see "You are not authenticated" and the
// authenticated users would see the actual dashboard.

// In the @/middleware.ts file you can see that the matcher is referencing this address (/dashboard/auth).
// This is because NextAuth protects the addresses mentioned in the matcher by redirecting to a login screen
// which if the user connects to, it will redirect to the page that initiated this log in screen. Which in our
// case is this /dashboard/auth page, that will redirect to the dashboard after the request is succesfull.

// Simple Example:
// Home Page *clicks on call to action button* -> gets sent to /dashboard/auth
// /dashboard/auth resolves the log in request and sends to -> /dashboard where the user
// can see the actual dashboard

// Or:
// User accesses the "/dashboard" route directly in the url -> gets sent to a page telling him "You are not authenticated"
// -> Clicks the link to authenticate and gets sent here where he logs in -> and gets redirected to "/dashboard" after he is logged in.

// This last example is useful for people that access the site using browser bookmarks or saved pages.
