export const userData = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  rank: 42,
  totalScore: 3420,
  accuracy: 78.5,
}

export const questions = [
  {
    id: '1',
    subject: 'Data Structures',
    difficulty: 'medium',
    category: 'Arrays',
    text: 'What is the time complexity of binary search?',
    options: [
      { id: 'a', text: 'O(n)', isCorrect: false },
      { id: 'b', text: 'O(log n)', isCorrect: true },
      { id: 'c', text: 'O(n²)', isCorrect: false },
      { id: 'd', text: 'O(1)', isCorrect: false },
    ],
    explanation: 'Binary search eliminates half of the remaining elements with each comparison, resulting in O(log n) time complexity.',
    codeSnippet: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
}`,
  },
  {
    id: '2',
    subject: 'Data Structures',
    difficulty: 'hard',
    category: 'Trees',
    text: 'What traversal method visits nodes level by level?',
    options: [
      { id: 'a', text: 'In-order', isCorrect: false },
      { id: 'b', text: 'Pre-order', isCorrect: false },
      { id: 'c', text: 'Post-order', isCorrect: false },
      { id: 'd', text: 'Level-order (BFS)', isCorrect: true },
    ],
    explanation: 'Level-order traversal uses Breadth-First Search (BFS) to visit all nodes at the current depth level before moving to the next level.',
    codeSnippet: `function levelOrderTraversal(root) {
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return result;
}`,
  },
  {
    id: '3',
    subject: 'Algorithms',
    difficulty: 'easy',
    category: 'Sorting',
    text: 'Which sorting algorithm is most efficient for nearly sorted data?',
    options: [
      { id: 'a', text: 'Quick Sort', isCorrect: false },
      { id: 'b', text: 'Insertion Sort', isCorrect: true },
      { id: 'c', text: 'Merge Sort', isCorrect: false },
      { id: 'd', text: 'Heap Sort', isCorrect: false },
    ],
    explanation: 'Insertion sort has O(n) time complexity for nearly sorted data, making it the most efficient choice.',
    codeSnippet: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  },
  {
    id: '4',
    subject: 'Database',
    difficulty: 'medium',
    category: 'SQL',
    text: 'What is the primary purpose of indexes in databases?',
    options: [
      { id: 'a', text: 'To store data', isCorrect: false },
      { id: 'b', text: 'To speed up queries', isCorrect: true },
      { id: 'c', text: 'To reduce storage', isCorrect: false },
      { id: 'd', text: 'To encrypt data', isCorrect: false },
    ],
    explanation: 'Indexes create a data structure that allows faster data retrieval by reducing the number of disk accesses needed.',
    codeSnippet: `CREATE INDEX idx_user_email ON users(email);

SELECT * FROM users WHERE email = 'test@example.com';
-- This query will use the index to quickly find the user`,
  },
  {
    id: '5',
    subject: 'Web Development',
    difficulty: 'easy',
    category: 'HTML/CSS',
    text: 'What does CSS stand for?',
    options: [
      { id: 'a', text: 'Computer Style Sheets', isCorrect: false },
      { id: 'b', text: 'Cascading Style Sheets', isCorrect: true },
      { id: 'c', text: 'Creative Style System', isCorrect: false },
      { id: 'd', text: 'Custom Stylesheet Syntax', isCorrect: false },
    ],
    explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages and to apply different styles to different elements.',
    codeSnippet: `/* CSS Example */
.container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
}`,
  },
]

export const mockTests = [
  {
    id: '1',
    title: 'Data Structures Fundamentals',
    description: 'Test your knowledge of basic data structures',
    duration: 60,
    totalQuestions: 25,
    difficulty: 'medium',
    subject: 'Data Structures',
    attempted: 3,
    bestScore: 92,
    icon: '📊',
  },
  {
    id: '2',
    title: 'Algorithms Intensive',
    description: 'Comprehensive algorithms test',
    duration: 90,
    totalQuestions: 40,
    difficulty: 'hard',
    subject: 'Algorithms',
    attempted: 1,
    bestScore: 78,
    icon: '⚙️',
  },
  {
    id: '3',
    title: 'Database Design',
    description: 'SQL and database concepts',
    duration: 45,
    totalQuestions: 20,
    difficulty: 'medium',
    subject: 'Database',
    attempted: 5,
    bestScore: 88,
    icon: '🗄️',
  },
  {
    id: '4',
    title: 'Web Development Basics',
    description: 'HTML, CSS, JavaScript fundamentals',
    duration: 60,
    totalQuestions: 30,
    difficulty: 'easy',
    subject: 'Web Development',
    attempted: 2,
    bestScore: 95,
    icon: '🌐',
  },
  {
    id: '5',
    title: 'System Design',
    description: 'Large-scale system design questions',
    duration: 120,
    totalQuestions: 5,
    difficulty: 'hard',
    subject: 'System Design',
    attempted: 0,
    bestScore: null,
    icon: '🏗️',
  },
  {
    id: '6',
    title: 'Operating Systems',
    description: 'OS concepts and processes',
    duration: 75,
    totalQuestions: 35,
    difficulty: 'hard',
    subject: 'Operating Systems',
    attempted: 2,
    bestScore: 82,
    icon: '💻',
  },
]

export const performanceData = [
  { subject: 'Data Structures', accuracy: 78, attempts: 5 },
  { subject: 'Algorithms', accuracy: 72, attempts: 3 },
  { subject: 'Database', accuracy: 85, attempts: 4 },
  { subject: 'Web Dev', accuracy: 92, attempts: 2 },
  { subject: 'OS', accuracy: 68, attempts: 2 },
  { subject: 'System Design', accuracy: 0, attempts: 0 },
]

export const weeklyProgressData = [
  { day: 'Mon', score: 72 },
  { day: 'Tue', score: 75 },
  { day: 'Wed', score: 78 },
  { day: 'Thu', score: 76 },
  { day: 'Fri', score: 82 },
  { day: 'Sat', score: 88 },
  { day: 'Sun', score: 85 },
]

export const leaderboardData = [
  { rank: 1, name: 'Anil Sharma', score: 4250, accuracy: 89.2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil' },
  { rank: 2, name: 'Priya Patel', score: 4180, accuracy: 87.5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { rank: 3, name: 'Vikram Singh', score: 4050, accuracy: 85.8, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
  { rank: 42, name: 'Rajesh Kumar', score: 3420, accuracy: 78.5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh', isCurrentUser: true },
  { rank: 43, name: 'Ananya Desai', score: 3380, accuracy: 77.2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
  { rank: 44, name: 'Rohan Mehta', score: 3320, accuracy: 76.1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan' },
]

export const recentActivity = [
  { id: '1', type: 'test_completed', title: 'Completed Data Structures test', time: '2 hours ago', score: 92 },
  { id: '2', type: 'question_solved', title: 'Solved 15 questions on Algorithms', time: '4 hours ago', score: null },
  { id: '3', type: 'milestone', title: 'Reached 78% accuracy', time: '1 day ago', score: null },
  { id: '4', type: 'test_completed', title: 'Completed Mock Test #3', time: '2 days ago', score: 85 },
]

// Daily Question Sets Generator
const difficulties = ['easy', 'medium', 'hard'] as const
const subjects = ['Data Structures', 'Algorithms', 'Database', 'Web Development'] as const

export function generateDailyQuestionSets() {
  const today = new Date()
  const dateKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  const seed = parseInt(dateKey.replace(/-/g, ''))

  const sets = []

  for (let setNum = 1; setNum <= 3; setNum++) {
    const setId = `daily-${dateKey}-set-${setNum}`
    const setQuestions = []

    // Generate 12 questions per set (3 difficulties × 4 subjects = 12)
    let qIndex = 0
    for (const difficulty of difficulties) {
      for (const subject of subjects) {
        const baseSeed = seed + setNum * 1000 + qIndex
        const selectedQuestion = questions[(baseSeed + qIndex) % questions.length]

        setQuestions.push({
          ...selectedQuestion,
          id: `${setId}-q${qIndex}`,
          difficulty: difficulty as 'easy' | 'medium' | 'hard',
          subject: subject,
        })
        qIndex++
      }
    }

    sets.push({
      id: setId,
      setNumber: setNum,
      date: today,
      dateString: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      questions: setQuestions,
      totalQuestions: setQuestions.length,
      completed: false,
      score: null,
    })
  }

  return sets
}

export type DailyQuestionSet = ReturnType<typeof generateDailyQuestionSets>[number]
