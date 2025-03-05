Certainly! Below is the **complete structure of the files** you should have in your main branch to implement the solution. These files will include:

1. **`index.html`** (Frontend)
2. **`server.js`** (Backend API using Node.js)
3. **`package.json`** (For dependencies)

### **File Structure**
```
/main-branch/
  ├── index.html
  ├── server.js
  └── package.json
```

---

### **1. `index.html` (Frontend)**

This is the file that will be hosted on GitHub Pages (or any static hosting service). It dynamically fetches the URL from your backend.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>Redirecting...</title>
    <script>
        // Modify this URL to change the backend that provides the redirect URL
        const backendUrl = "https://your-backend.com/api/getRedirect"; // <-- Update this when you change the backend URL
        
        fetch(backendUrl + "?t=" + new Date().getTime()) // Cache-busting query using timestamp
            .then(response => response.json())
            .then(data => {
                window.location.href = data.url;  // Perform the redirect to the new URL
            })
            .catch(error => {
                console.error("Error fetching redirect URL:", error);
                window.location.href = "https://www.baps.org/home.aspx";  // Fallback URL
            });
    </script>
</head>
<body>
    <p>If you are not redirected, <a href="https://www.baps.org/home.aspx">click here</a>.</p>
</body>
</html>
```

#### **Where to update the backend URL**:
- **Line 15:** The variable `backendUrl` holds the URL of your backend API. Each time you change the backend URL, you need to update this value in `index.html`.
    ```js
    const backendUrl = "https://your-backend.com/api/getRedirect"; // <-- Update this when you change the backend URL
    ```

---

### **2. `server.js` (Backend API using Node.js)**

This is your backend that serves the dynamic redirect URL. This backend will be responsible for sending the redirect URL in response to the frontend's request.

#### **Node.js (Express) Backend Code:**
```js
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
  res.json({ url: "https://your-new-destination.com" }); // <-- Update this URL whenever you need a new redirect
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

#### **Where to update the backend URL**:
- **Line 15:** The `res.json({ url: "https://your-new-destination.com" });` is where you define the redirect URL. Each time you want to change the destination URL, you modify this value.
    ```js
    res.json({ url: "https://your-new-destination.com" }); // <-- Update this URL whenever you need a new redirect
    ```

---

### **3. `package.json` (For Node.js Project Dependencies)**

This file is necessary for managing dependencies, particularly for running the server. Make sure you have the **Express** library installed.

```json
{
  "name": "redirect-backend",
  "version": "1.0.0",
  "description": "Backend for dynamic redirects",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "author": "Your Name",
  "license": "ISC"
}
```

---

### **Steps to Set Up**

1. **Create and Configure Your Backend**:
   - In the main branch of your project, create a new file called `server.js` and paste the backend code there.
   - Create the `package.json` file and run `npm install` to install the necessary dependencies (Express).
   - Start the server using `npm start`.

2. **Configure GitHub Pages for the Frontend**:
   - Upload your `index.html` to GitHub Pages (or any static hosting platform) so that it is served to users. This file will dynamically fetch the redirect URL from your backend.

3. **Update the URL**:
   - Every time you need to change the redirect destination, you **update the `backendUrl`** in `index.html` and **modify the URL in `server.js`** (inside `res.json()`).
   
   - For example, if the destination changes from `https://new-url.com` to `https://another-url.com`, you would:
     - **In `server.js`:**
       ```js
       res.json({ url: "https://another-url.com" });
       ```
     - **In `index.html`:**
       ```js
       const backendUrl = "https://new-backend-url.com/api/getRedirect"; // If backend changes
       ```

---

### **Optional: Hosting Your Backend**
- If you're hosting the backend (e.g., on **Heroku**, **Vercel**, or any cloud platform), replace `https://your-backend.com` with the URL provided by your hosting service.

---

### **Final Note**:
- **Frontend (GitHub Pages)**: Always update the URL in `index.html` if you change the backend.
- **Backend**: Update the redirect URL in `server.js` whenever you want to change the target redirect.

By following this structure, you will have a fully dynamic redirect system that doesn't rely on static file changes for every redirect update. 😊
