# Food Wheel

Food Wheel helps users decide what to eat by adding manual options or searching real nearby restaurants from Google Places, then spinning a wheel to pick one.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Google Places API Key

Create `.env.local` in the project root:

```env
GOOGLE_MAPS_API_KEY=your_google_places_api_key_here
```

The key is read only by the server-side API route. Do not use `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

## Deploy on Vercel

1. Import the project into Vercel.
2. Keep the default Next.js build settings.
3. Add `GOOGLE_MAPS_API_KEY` in Vercel Environment Variables.
4. Deploy.

Optional: set `NEXT_PUBLIC_SITE_URL` to your production domain so `sitemap.xml` and `robots.txt` use the final site URL.
