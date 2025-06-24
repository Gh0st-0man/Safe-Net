 # 🚀 Project Name

> A quick start guide to getting the backend and frontend up and running.

## 📝 Prerequisites

* **Git** installed on your machine.
* **Python 3.11.7** (ensure you have this exact version).
* **Node.js** (v16 or higher) and **pnpm** package manager.
* A `.env` file in the `backend/` folder with all necessary environment variables.

## ⚙️ Project Structure

```
root/
├── backend/      # FastAPI backend service
└── frontend/     # Plasmo-based frontend
```

---

## 1️⃣ Clone the Repo

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

## 2️⃣ Setup the Backend

1. Create a virtual environment (using Python 3.11.7):

   ```bash
   python3.11 -m venv venv
   ```
2. Activate it:

   * **Linux/macOS:**

     ```bash
     source venv/bin/activate
     ```
   * **Windows (PowerShell):**

     ```powershell
     .\\venv\\Scripts\\Activate.ps1
     ```
3. Navigate into the backend folder:

   ```bash
   cd backend
   ```
4. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```
5. Create a `.env` file or copy the example:

   ```bash
   cp .env.example .env
   ```

   Fill in your env vars as needed.

## 3️⃣ Run the Backend

Start the FastAPI server with Uvicorn:

```bash
uvicorn app.main:app \
  --host 0.0.0.0 \
  --port 5000 \
  --env-file .env
```

Once you see `Application startup complete.` in the logs, your backend is live at:

```
http://localhost:5000
```

---

## 4️⃣ Setup & Run the Frontend

1. Open a new terminal and navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```

2. Install dependencies (including Plasmo):

   ```bash
   pnpm install plasmo
   ```

3. Start the dev server:

   ```bash
   pnpm dev
   ```

Your frontend should now be running at:

```
http://localhost:PORT
```

*(Check your terminal for the exact port number, usually `3000`.)*

---

## 🙌 You're All Set!

* Backend: `http://localhost:5000`
* Frontend: `http://localhost:3000`

Feel free to tweak, hack, and rock this project! 👾

---
## Download model weights from here 
https://drive.google.com/file/d/1G0ZuSwpfgFV1ZAjf89DtNT6TTvcobN2c/view?usp=sharing

## 🚧 Troubleshooting

* If you run into issues installing dependencies, check your Python and pnpm versions.
* Need to reset your virtual environment? Just delete `venv/` and re-run step 2.
* Env vars acting sus? Double-check your `.env` values.

---

🛠️ **Happy coding!**
