<div align="center">

  # Quiz App

  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)

  **Interactive multiple-choice quiz with countdown timer, instant feedback, and scoring.**

  </div>

  ---

  ## Features

  - **3 categories** — JavaScript · CS Fundamentals · Web Development
  - **Timer** — 20 seconds per question, color shifts as time runs out
  - **Instant feedback** — correct/incorrect highlighted immediately with explanation
  - **Result summary** — score percentage + question-by-question breakdown
  - **Randomized** — questions shuffled each round

  ## Getting Started

  ```bash
  npm install && npm run dev
  ```

  ## Adding Questions

  Questions live in `src/questions.ts`:

  ```typescript
  {
    question: 'What does typeof null return?',
    options: ['null', 'undefined', 'object', 'boolean'],
    correct: 2,                          // zero-indexed
    explanation: 'A historic JS bug — typeof null returns "object".'
  }
  ```

  Add a new `Category` object to `CATEGORIES` to create a new quiz topic.

  ---

  <div align="center">Made with TypeScript · Part of my <a href="https://github.com/9bzero">developer portfolio</a></div>
  