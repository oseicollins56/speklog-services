# ALOG.SERVICES — GitHub Setup & Deployment Guide

---

## Step 1 — Create a GitHub Account (if you don't have one)

Go to **https://github.com** → Sign Up → Complete the registration.

---

## Step 2 — Create a New Repository

1. Log into GitHub and click the **+** icon (top right) → **New repository**
2. Fill in:
   - **Repository name:** `alog-services` (or `alog.services`)
   - **Description:** ALOG Construction, Interior Design & Real Estate website
   - **Visibility:** Public *(required for free GitHub Pages hosting)*
   - Leave "Add a README file" **unchecked** — you already have your files
3. Click **Create repository**

---

## Step 3 — Install Git (if not already installed)

Open Terminal (on your Mac) and run:

```bash
git --version
```

If you see a version number, Git is installed. If not, macOS will prompt you to install Xcode Command Line Tools — click **Install**.

---

## Step 4 — Configure Git (first time only)

```bash
git config --global user.name "Your Name"
git config --global user.email "oseicollins56@gmail.com"
```

---

## Step 5 — Push Your Project to GitHub

In Terminal, navigate to your project folder and run these commands **one at a time**:

```bash
# 1. Go to your project folder
cd ~/Documents/Claude/Projects/ALOG.SERVICES

# 2. Initialise a Git repository
git init

# 3. Add all files
git add .

# 4. Create the first commit
git commit -m "Initial commit: ALOG website — Construction, Interior Design, Real Estate"

# 5. Rename the branch to 'main'
git branch -M main

# 6. Link your local folder to GitHub
#    (replace YOUR-USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/alog-services.git

# 7. Push everything to GitHub
git push -u origin main
```

When prompted, enter your GitHub **username** and a **Personal Access Token** (not your password — see Step 6).

---

## Step 6 — Create a Personal Access Token (for authentication)

GitHub no longer accepts passwords over HTTPS. You need a token:

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Give it a name, set expiry, and tick the **repo** checkbox
4. Click **Generate token** — copy it immediately (you won't see it again)
5. Use this token as your password when Git asks

---

## Step 7 — Enable GitHub Pages (free hosting)

1. In your GitHub repository, go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Branch: **main** / Folder: **/ (root)**
4. Click **Save**
5. Wait 1–2 minutes, then your site will be live at:

```
https://YOUR-USERNAME.github.io/alog-services/
```

---

## Updating the Site Later

Every time you make changes to the files, push them with:

```bash
cd ~/Documents/Claude/Projects/ALOG.SERVICES
git add .
git commit -m "Update: describe what you changed"
git push
```

GitHub Pages will automatically redeploy within a minute or two.

---

## Adding the ALOG Logo

When you have the logo file ready:

1. Save it as `images/logo/alog-logo.png` inside the project folder
2. Run the update commands above to push it to GitHub
3. The site will automatically display it in the navbar and footer

---

## Optional — Custom Domain (e.g. alog.services)

If you own the domain **alog.services**:

1. In GitHub → Settings → Pages → **Custom domain** → enter `alog.services` → Save
2. At your domain registrar, create these DNS records:

| Type  | Name | Value                   |
|-------|------|-------------------------|
| A     | @    | 185.199.108.153         |
| A     | @    | 185.199.109.153         |
| A     | @    | 185.199.110.153         |
| A     | @    | 185.199.111.153         |
| CNAME | www  | YOUR-USERNAME.github.io |

3. Tick **Enforce HTTPS** in GitHub Pages settings once DNS propagates (can take up to 48 hours).

---

*Guide prepared for ALOG Construction & Real Estate Ltd — May 2026*
