# Groovy Breaks

Welcome to **Groovy Breaks**, a web app designed to enhance your study or work sessions with perfectly timed music breaks. Connect your Spotify account and enjoy your favorite tunes during scheduled intervals to help you stay focused and refreshed.

Currently, **Groovy Breaks** streams music from a user-selected Spotify playlist while we await official approval from Spotify for broader functionality.

**Tech Stack:** Next.js, NextAuth, TypeScript

## Getting Started - How to run the environment locally

### Step 1 - Setting the `NEXTAUTH_SECRET`

First, at the root level of your project (the same level as the `package.json` file), create a file named `.env.local.`

- This file will be automatically hidden by the `.gitignore` file, ensuring you don't publish your credentials when commiting to GitHub.

Next, open a terminal and run:

```bash
openssl rand -base64 32
```

This command will generate a secret key. Add the key to your .env.local file as:

```env
NEXTAUTH_SECRET=generated_key
```

- Replace `generated_key` with the generated key.

### Step 2 - Creating a new Spotify App

Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create a new app.

Fill in the required fields. In the Website field, enter your local environment address (e.g., `http://localhost:3000/`).

In the Redirect URI field, enter: `http://localhost:3000/api/auth/callback/spotify`

After creating the app, access the **Dashboard**. You’ll find the **Client ID** and **Client Secret**. Add these to your `.env.local` file as follows:

```env
SPOTIFY_CLIENT_ID=client_id
SPOTIFY_CLIENT_SECRET=client_secret
```

- Replace `client_id` and `secret_id` with the values from the Dashboard.

### Step 3 - Install dependencies and Run locally!

To install the dependencies, open a terminal in the root directory of your app and run:

```bash
npm install
```

Then, to start the app locally, run one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Credits

The illustrations used in this project are provided by [Streamline](https://www.streamlinehq.com/illustrations).
