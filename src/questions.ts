export type Question = { question: string; options: string[]; correct: number; explanation: string }
export type Category = { id: string; label: string; emoji: string; questions: Question[] }

export const CATEGORIES: Category[] = [
  {
    id: 'javascript', label: 'JavaScript', emoji: 'JS',
    questions: [
      { question: 'What does `typeof null` return in JavaScript?', options: ['null', 'undefined', 'object', 'boolean'], correct: 2, explanation: 'A historical bug in JS — typeof null returns "object".' },
      { question: 'Which method creates a new array from calling a function on every element?', options: ['forEach', 'filter', 'map', 'reduce'], correct: 2, explanation: 'Array.map() transforms each element and returns a new array.' },
      { question: 'What is the output of `0.1 + 0.2 === 0.3`?', options: ['true', 'false', 'NaN', 'undefined'], correct: 1, explanation: 'Floating point precision issue — 0.1 + 0.2 equals 0.30000000000000004.' },
      { question: 'What does the `??` operator do?', options: ['Logical OR', 'Logical AND', 'Nullish coalescing', 'Optional chaining'], correct: 2, explanation: 'Nullish coalescing returns the right side only if the left is null or undefined.' },
      { question: 'Which is NOT a valid way to declare a variable?', options: ['var x = 1', 'let x = 1', 'const x = 1', 'int x = 1'], correct: 3, explanation: 'int is not a JavaScript keyword — it is used in languages like C/Java.' },
    ]
  },
  {
    id: 'cs', label: 'CS Fundamentals', emoji: 'CS',
    questions: [
      { question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correct: 1, explanation: 'Binary search halves the search space each step → O(log n).' },
      { question: 'Which data structure uses LIFO order?', options: ['Queue', 'Stack', 'Heap', 'Linked List'], correct: 1, explanation: 'Stack is Last In, First Out — like a stack of plates.' },
      { question: 'What does CPU stand for?', options: ['Core Processing Unit', 'Central Processing Unit', 'Computer Processing Utility', 'Central Program Unit'], correct: 1, explanation: 'CPU = Central Processing Unit — the main processor of a computer.' },
      { question: 'Which sorting algorithm has O(n log n) average complexity?', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'], correct: 2, explanation: 'Merge Sort consistently runs in O(n log n) time in all cases.' },
      { question: 'What is a deadlock?', options: ['A memory leak', 'Two processes waiting for each other indefinitely', 'A crashed process', 'A race condition'], correct: 1, explanation: 'Deadlock: two or more processes wait forever for resources held by each other.' },
    ]
  },
  {
    id: 'web', label: 'Web Dev', emoji: 'WEB',
    questions: [
      { question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'High Transfer Text Protocol', 'Hyperlink Text Transfer Process', 'Host Transfer Technology Protocol'], correct: 0, explanation: 'HTTP = HyperText Transfer Protocol — the foundation of web communication.' },
      { question: 'Which HTML tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1, explanation: 'The <a> (anchor) tag with an href attribute creates hyperlinks.' },
      { question: 'What does CSS stand for?', options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Syntax', 'Cascading Source Script'], correct: 1, explanation: 'CSS = Cascading Style Sheets — styles web pages.' },
      { question: 'Which HTTP method is used to create a resource?', options: ['GET', 'PUT', 'POST', 'DELETE'], correct: 2, explanation: 'POST is used to create new resources; PUT is used to update/replace.' },
      { question: 'What is the purpose of the `alt` attribute on images?', options: ['Sets image title', 'Provides alternative text for accessibility', 'Controls image size', 'Links to image source'], correct: 1, explanation: 'alt text is read by screen readers and shown when the image fails to load.' },
    ]
  },
]
