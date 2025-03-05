const express = require('express');
const app = express();
const port = 3000;

// Endpoint to return the redirect URL
app.get("/api/getRedirect", (req, res) => {
  // Set headers to avoid caching
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0"
  });

  // Change the URL dynamically here (this is where the URL can be modified)
  res.json({ url: "https://www.baps.org/news" }); // <-- Update this URL whenever you need a new redirect
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
