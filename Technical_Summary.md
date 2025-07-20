Technical Summary – AI-Pdf-Reader

Overview
The AI-Pdf-Reader is a full-stack web application that allows users to upload PDF documents and ask questions about the content. It leverages both OpenAI API and Ollama (local AI models like Mistral) to provide flexible and privacy-conscious options for answering user queries. The goal was to create an intuitive, lightweight tool that can operate with or without internet connectivity, depending on the chosen AI model.

🏗 Architecture and Tech Stack Decisions
The project was split into three key components: frontend, backend, and AI model integration.

Frontend: Built using React with TypeScript, offering a modular structure, strong typing, and improved maintainability. It features a clean UI with a chat interface where users can ask questions, view responses, and switch between AI models.

Backend: Developed with Node.js and Express.js (also using TypeScript). This layer handles file uploads, PDF text extraction, and communication with AI models. TypeScript on the backend ensures better error handling and code clarity.

AI Integration:

For OpenAI, the backend sends extracted text and the user's question to the OpenAI API.

For Ollama, it interacts with the locally running model (like mistral) using shell commands and captures the response.

PDF Parsing: The pdf-parse library was used to extract text from uploaded PDFs. It’s lightweight and supports most common PDF formats, making it suitable for this use case.

This layered architecture ensures the frontend remains decoupled from the AI logic, and the backend can evolve independently to support new features or additional AI providers.

🧩 Challenges Faced and Solutions

1. Deployment-Level Issues:
    During deployment on platforms like Render and Railway, environment variables were not being correctly picked up, especially from .env or Docker-level environment injection. This led to runtime errors like undefined REACT_APP_API_BASE_URL.

    To resolve this, I removed all .env references from the frontend (since it's not a Vite app) and hardcoded the backend URL via runtime ENV injection in Dockerfile or deployment settings.

2. Ollama Integration:
    Running Ollama locally required platform-specific setup and clear documentation. To avoid user confusion, detailed steps were included in the README, including how to install Ollama and run mistral locally using ollama run mistral.

3. Consistent API Responses:
    Different routes were returning inconsistent response structures. I created a common response format (status, message, data, error) to standardize all API outputs and simplify frontend error handling.

4. UI Feedback and Error Handling:
    Errors from the backend were not clearly communicated in the UI. I updated the frontend to capture and display error messages (e.g., if the model is not running or if no PDF is uploaded) in a user-friendly format.

🛠 What I Would Improve With More Time
If more time were available, I would:

Add persistent storage using MongoDB to save user history, uploaded PDFs, and interactions.

Introduce authentication for personalized experiences and usage tracking.

Add unit and integration tests using Jest and Supertest for stability and future scalability.

✨ Final Thoughts
This project was a rewarding challenge that blended frontend development, backend design, and AI integration. It deepened my understanding of full-stack systems and taught me how to build developer- and user-friendly tools. The flexibility to use both online and offline AI models adds a practical edge, and I'm excited about refining and expanding it further.

