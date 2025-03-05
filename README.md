Sure! Below is the complete solution, with both files (`index.html` and `config.json`), including detailed comments explaining each part of the code. This will help you understand how everything works and how you can update the URL dynamically by changing only one file (`config.json`).

### **1. `config.json`**
This file contains the **redirection URL**. You only need to update the URL here when you want to change where users are being redirected.

```json
{
  "redirectUrl": "https://your-backend.com/api/getRedirect"  // This is the URL where the redirection target is fetched.
}
```

#### **Explanation**:
- The key `"redirectUrl"` holds the URL of your backend API endpoint where the final redirection URL will be fetched.
- Whenever you need to update the redirection target, just change the value of this URL.

---

### **2. `index.html`**
This file handles the redirection logic. It fetches the `config.json` file to get the backend URL, then uses that to redirect the user. In case of failure, it shows a fallback message with a clickable link.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <script>
      // Adding timestamp to prevent caching issues
      const timestamp = new Date().getTime();

      // Fetching the config.json file dynamically to avoid caching (timestamp appended)
      fetch(`config.json?t=${timestamp}`) 
        .then(response => response.json()) // Parsing the response as JSON
        .then(data => {
          // Extract the redirect URL from config.json
          const redirectUrl = data.redirectUrl; 
          
          // Fetch the redirection URL from the backend API
          fetch(redirectUrl) 
            .then(response => response.json()) // Backend returns a JSON with the final URL
            .then(redirectData => {
              // Perform the redirection by updating the window location
              window.location.href = redirectData.url;
            })
            .catch(error => {
              console.error("Error fetching redirect URL:", error);
              // If there's an issue fetching the URL, display an error message with a clickable link
              document.body.innerHTML = `
                <h1>Something went wrong</h1>
                <p>If you are not redirected, please <a href="${redirectUrl}" target="_blank">click here</a> to go to the destination.</p>
              `;
            });
        })
        .catch(error => {
          console.error("Error fetching config:", error);
          // If there's an issue fetching config.json, display an error message with a clickable link
          document.body.innerHTML = `
            <h1>Something went wrong</h1>
            <p>If you are not redirected, please <a href="${redirectUrl}" target="_blank">click here</a> to go to the destination.</p>
          `;
        });
    </script>
</head>
<body>
    <p>If you are not redirected, please wait or contact support.</p>
</body>
</html>
```

#### **Explanation**:
- **Timestamp for Cache Prevention**:
  - We append a timestamp (`?t=${timestamp}`) to the URL when fetching `config.json` to ensure that the latest version of the `config.json` file is always fetched, avoiding any caching issues by the browser.
  
- **Fetching `config.json`**:
  - The script starts by fetching the `config.json` file to get the **`redirectUrl`**. This is the URL where the backend API that returns the final redirection URL is located.

- **Redirection Process**:
  - After the `redirectUrl` is fetched from `config.json`, it performs another `fetch` call to that URL to retrieve the **final redirection URL**.
  - Once that URL is obtained, it uses `window.location.href` to redirect the user to the final URL.

- **Error Handling**:
  - **Failure to Fetch Config or Redirection URL**: 
    - If there is an issue with fetching either the `config.json` or the redirection URL from the backend, the page will display an error message along with a fallback **"Click here"** link that will open the destination URL manually in a new tab.
    - This ensures that users can still reach the destination if something goes wrong.

- **Fallback Link**:
  - The fallback link uses the `redirectUrl` from the `config.json` and allows users to click and open the link manually in case the automatic redirection fails.
  - The link opens in a new tab (`target="_blank"`) to ensure the user doesn't leave the current page unexpectedly.

---

### **How to Use This Solution**:

1. **Deploy to GitHub Pages**:
   - Push both the `index.html` and `config.json` files to the **main branch** of your GitHub repository.
   - Set up **GitHub Pages** in the repository settings, and select `index.html` as the homepage.

2. **Update the Redirection URL**:
   - Whenever you need to change the destination URL, simply update the `redirectUrl` value in `config.json` and push the changes to your GitHub repository.
   - The **GitHub Pages URL** will automatically serve the updated redirection URL.

3. **No Cache Issues**:
   - The timestamp (`?t=${timestamp}`) ensures that every time the page is loaded, the browser fetches the latest version of `config.json`, avoiding caching problems.

4. **Fallback Option**:
   - If anything goes wrong with fetching the redirect URL or `config.json`, the user will see a message with a clickable link to open the destination manually.

---

### **Example Flow**:
1. A user visits your GitHub Pages link (e.g., `https://username.github.io/repo-name`).
2. The `index.html` fetches the `config.json` and gets the `redirectUrl`.
3. It then tries to fetch the actual redirection URL from the backend API.
4. If everything works, the user is redirected to the new destination.
5. If there's an issue (e.g., the backend is down), the user sees an error message with a clickable link to the destination.

### **Next Steps**:
- Deploy the code to GitHub Pages and update the URL in `config.json` whenever you need to change the redirection.
- This solution keeps everything simple, avoids caching issues, and allows easy updates to the redirection URL with minimal maintenance.

Let me know if you need further clarifications or help with setting this up!
