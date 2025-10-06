# Google Maps Integration Setup

## Getting Your API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable the following APIs**:
   - Maps JavaScript API
   - Geocoding API
   - Directions API (optional, for future enhancements)

4. **Create credentials**:
   - Go to "Credentials" in the left sidebar
   - Click "Create Credentials" → "API Key"
   - Copy your API key

## Environment Setup

1. **Create a `.env` file** in your project root:
```bash
touch .env
```

2. **Add your API key** to the `.env` file:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

3. **Restart your development server**:
```bash
npm run dev
```

## Security Notes

- **Restrict your API key** in Google Cloud Console:
  - Go to "Credentials" → Your API Key → "Restrict Key"
  - Add HTTP referrers: `localhost:3000/*`, `your-domain.com/*`
  - Restrict to specific APIs (Maps JavaScript API, Geocoding API)

- **Never commit your `.env` file** to version control
- The `.env` file is already in `.gitignore`

## Features Included

✅ **Interactive Map Display**
✅ **Office Location Marker** (orange with building icon)
✅ **Postcode Markers** (blue with numbers)
✅ **Route Visualization** (orange polyline)
✅ **Info Windows** (click markers for details)
✅ **Auto-fit Bounds** (map adjusts to show all markers)
✅ **Map Legend** (shows marker meanings)

## Troubleshooting

- **"Failed to load map"**: Check your API key and ensure APIs are enabled
- **Markers not showing**: Verify postcode data exists in the component
- **Route not drawing**: Ensure optimizedRoute array has valid postcodes

## Future Enhancements

- Real-time traffic data
- Turn-by-turn directions
- Multiple route options
- Export to GPS devices
- Street view integration
