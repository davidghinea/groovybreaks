export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard/auth"] };

// See reference about what this matcher does in /dashboard/auth/page.tsx (UX)
