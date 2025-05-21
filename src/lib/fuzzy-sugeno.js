// Fuzzy Sugeno algorithm implementation for laptop recommendation

// Define the fuzzy sets for each input
const budgetSets = {
  low: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  medium: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  high: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

const gamingSets = {
  rare: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  moderate: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  frequent: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

const videoEditingSets = {
  rare: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  moderate: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  frequent: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

const portabilitySets = {
  notImportant: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  important: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  veryImportant: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

const batterySets = {
  notImportant: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  important: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  veryImportant: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

const screenSizeSets = {
  small: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  medium: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  large: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

const performanceSets = {
  basic: (x) => (x <= 2 ? 1 : x <= 3 ? 3 - x : 0),
  moderate: (x) => (x <= 2 ? 0 : x <= 3 ? x - 2 : x <= 4 ? 4 - x : 0),
  high: (x) => (x <= 3 ? 0 : x <= 4 ? x - 3 : 1),
}

// Sample laptop database
const laptops = [
  {
    id: 1,
    name: "Asus ROG Strix G15",
    price: "Rp 15.000.000",
    processor: "AMD Ryzen 7 5800H",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    gpu: "NVIDIA RTX 3060",
    display: '15.6" FHD 144Hz',
    battery: "4-5 jam",
    weight: "2.3 kg",
    category: "gaming",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 3,
      gaming: 5,
      videoEditing: 4,
      portability: 2,
      battery: 2,
      screenSize: 4,
      performance: 4,
      multitasking: 4,
      design: 3,
      cooling: 5,
      buildQuality: 4,
      touchscreen: 1,
      noiseLevel: 4,
    },
  },
  {
    id: 2,
    name: "MacBook Air M2",
    price: "Rp 18.999.000",
    processor: "Apple M2",
    ram: "8GB Unified",
    storage: "256GB SSD",
    gpu: "Apple M2 GPU",
    display: '13.6" Retina',
    battery: "18 jam",
    weight: "1.24 kg",
    category: "ultraportable",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 4,
      gaming: 2,
      videoEditing: 4,
      portability: 5,
      battery: 5,
      screenSize: 3,
      performance: 4,
      multitasking: 3,
      design: 5,
      cooling: 3,
      buildQuality: 5,
      touchscreen: 1,
      noiseLevel: 1,
    },
  },
  {
    id: 3,
    name: "Dell XPS 15",
    price: "Rp 22.500.000",
    processor: "Intel i7-12700H",
    ram: "16GB DDR5",
    storage: "512GB SSD",
    gpu: "NVIDIA RTX 3050 Ti",
    display: '15.6" 4K OLED',
    battery: "10-12 jam",
    weight: "1.8 kg",
    category: "productivity",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 4,
      gaming: 3,
      videoEditing: 5,
      portability: 4,
      battery: 4,
      screenSize: 4,
      performance: 4,
      multitasking: 5,
      design: 5,
      cooling: 3,
      buildQuality: 5,
      touchscreen: 3,
      noiseLevel: 2,
    },
  },
  {
    id: 4,
    name: "Lenovo ThinkPad X1 Carbon",
    price: "Rp 19.999.000",
    processor: "Intel i7-1260P",
    ram: "16GB LPDDR5",
    storage: "1TB SSD",
    gpu: "Intel Iris Xe",
    display: '14" WUXGA',
    battery: "15 jam",
    weight: "1.12 kg",
    category: "ultraportable",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 4,
      gaming: 2,
      videoEditing: 3,
      portability: 5,
      battery: 5,
      screenSize: 3,
      performance: 3,
      multitasking: 4,
      design: 3,
      cooling: 3,
      buildQuality: 5,
      touchscreen: 2,
      noiseLevel: 1,
    },
  },
  {
    id: 5,
    name: "HP Pavilion Gaming",
    price: "Rp 10.500.000",
    processor: "AMD Ryzen 5 5600H",
    ram: "8GB DDR4",
    storage: "512GB SSD",
    gpu: "NVIDIA GTX 1650",
    display: '15.6" FHD 144Hz',
    battery: "5-6 jam",
    weight: "2.1 kg",
    category: "gaming",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 2,
      gaming: 4,
      videoEditing: 3,
      portability: 2,
      battery: 2,
      screenSize: 4,
      performance: 3,
      multitasking: 3,
      design: 3,
      cooling: 4,
      buildQuality: 3,
      touchscreen: 1,
      noiseLevel: 3,
    },
  },
  {
    id: 6,
    name: "Acer Swift 3",
    price: "Rp 8.999.000",
    processor: "Intel i5-1135G7",
    ram: "8GB LPDDR4X",
    storage: "512GB SSD",
    gpu: "Intel Iris Xe",
    display: '14" FHD IPS',
    battery: "12-14 jam",
    weight: "1.2 kg",
    category: "ultraportable",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 2,
      gaming: 2,
      videoEditing: 2,
      portability: 4,
      battery: 4,
      screenSize: 3,
      performance: 3,
      multitasking: 3,
      design: 3,
      cooling: 3,
      buildQuality: 3,
      touchscreen: 1,
      noiseLevel: 2,
    },
  },
  {
    id: 7,
    name: "MSI Creator Z16",
    price: "Rp 25.999.000",
    processor: "Intel i7-12700H",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    gpu: "NVIDIA RTX 3060",
    display: '16" QHD+ 120Hz',
    battery: "8-10 jam",
    weight: "2.2 kg",
    category: "productivity",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 5,
      gaming: 4,
      videoEditing: 5,
      portability: 3,
      battery: 3,
      screenSize: 5,
      performance: 5,
      multitasking: 5,
      design: 4,
      cooling: 4,
      buildQuality: 4,
      touchscreen: 1,
      noiseLevel: 3,
    },
  },
  {
    id: 8,
    name: "Asus VivoBook 14",
    price: "Rp 7.500.000",
    processor: "AMD Ryzen 5 5500U",
    ram: "8GB DDR4",
    storage: "512GB SSD",
    gpu: "AMD Radeon Graphics",
    display: '14" FHD',
    battery: "8-10 jam",
    weight: "1.4 kg",
    category: "productivity",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 2,
      gaming: 2,
      videoEditing: 2,
      portability: 4,
      battery: 3,
      screenSize: 3,
      performance: 2,
      multitasking: 3,
      design: 3,
      cooling: 3,
      buildQuality: 3,
      touchscreen: 1,
      noiseLevel: 2,
    },
  },
  {
    id: 9,
    name: "Razer Blade 15",
    price: "Rp 28.999.000",
    processor: "Intel i9-12900H",
    ram: "32GB DDR5",
    storage: "1TB SSD",
    gpu: "NVIDIA RTX 3080 Ti",
    display: '15.6" QHD 240Hz',
    battery: "5-6 jam",
    weight: "2.0 kg",
    category: "gaming",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 5,
      gaming: 5,
      videoEditing: 5,
      portability: 3,
      battery: 2,
      screenSize: 4,
      performance: 5,
      multitasking: 5,
      design: 5,
      cooling: 4,
      buildQuality: 5,
      touchscreen: 1,
      noiseLevel: 3,
    },
  },
  {
    id: 10,
    name: "Lenovo IdeaPad Slim 3",
    price: "Rp 6.500.000",
    processor: "Intel i3-1115G4",
    ram: "8GB DDR4",
    storage: "256GB SSD",
    gpu: "Intel UHD Graphics",
    display: '15.6" FHD',
    battery: "7-8 jam",
    weight: "1.65 kg",
    category: "productivity",
    imageUrl: "/placeholder.svg?height=200&width=300",
    attributes: {
      budget: 1,
      gaming: 1,
      videoEditing: 1,
      portability: 3,
      battery: 3,
      screenSize: 4,
      performance: 2,
      multitasking: 2,
      design: 2,
      cooling: 2,
      buildQuality: 2,
      touchscreen: 1,
      noiseLevel: 2,
    },
  },
]

// Define all possible questions
export const questionPool = [
  {
    id: "budget",
    question: "Berapa budget Anda untuk laptop? (dalam jutaan rupiah)",
    options: [
      { value: 1, label: "< 5 juta" },
      { value: 2, label: "5-8 juta" },
      { value: 3, label: "8-12 juta" },
      { value: 4, label: "12-20 juta" },
      { value: 5, label: "> 20 juta" },
    ],
    priority: 10, // Higher priority questions are asked first
  },
  {
    id: "gaming",
    question: "Seberapa sering Anda bermain game?",
    options: [
      { value: 1, label: "Tidak pernah" },
      { value: 2, label: "Jarang (1-2 kali seminggu)" },
      { value: 3, label: "Kadang-kadang (3-4 kali seminggu)" },
      { value: 4, label: "Sering (hampir setiap hari)" },
      { value: 5, label: "Sangat sering (setiap hari, berjam-jam)" },
    ],
    priority: 9,
    conditionalPriority: {
      // Increase priority based on previous answers
      budget: { min: 3, priority: 15 }, // If budget >= 3, increase priority
    },
  },
  {
    id: "videoEditing",
    question: "Seberapa sering Anda melakukan editing video?",
    options: [
      { value: 1, label: "Tidak pernah" },
      { value: 2, label: "Jarang (beberapa kali sebulan)" },
      { value: 3, label: "Kadang-kadang (beberapa kali seminggu)" },
      { value: 4, label: "Sering (hampir setiap hari)" },
      { value: 5, label: "Sangat sering (profesional)" },
    ],
    priority: 8,
    conditionalPriority: {
      budget: { min: 3, priority: 12 },
      gaming: { max: 2, priority: 14 },
    },
  },
  {
    id: "portability",
    question: "Seberapa penting portabilitas laptop bagi Anda?",
    options: [
      { value: 1, label: "Tidak penting (selalu digunakan di satu tempat)" },
      { value: 2, label: "Sedikit penting" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting (sering dibawa bepergian)" },
      { value: 5, label: "Sangat penting (dibawa setiap hari)" },
    ],
    priority: 7,
    conditionalPriority: {
      gaming: { max: 2, priority: 13 },
    },
  },
  {
    id: "battery",
    question: "Seberapa penting daya tahan baterai bagi Anda?",
    options: [
      { value: 1, label: "Tidak penting (selalu terhubung ke listrik)" },
      { value: 2, label: "Sedikit penting" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting (sering digunakan tanpa charger)" },
      { value: 5, label: "Sangat penting (harus tahan seharian)" },
    ],
    priority: 6,
    conditionalPriority: {
      portability: { min: 4, priority: 12 },
    },
  },
  {
    id: "screenSize",
    question: "Ukuran layar seperti apa yang Anda inginkan?",
    options: [
      { value: 1, label: "Sangat kecil (11-12 inci)" },
      { value: 2, label: "Kecil (13 inci)" },
      { value: 3, label: "Sedang (14 inci)" },
      { value: 4, label: "Besar (15-16 inci)" },
      { value: 5, label: "Sangat besar (17+ inci)" },
    ],
    priority: 5,
    conditionalPriority: {
      portability: { min: 4, priority: 11 },
      gaming: { min: 4, priority: 10 },
    },
  },
  {
    id: "performance",
    question: "Seberapa tinggi performa yang Anda butuhkan?",
    options: [
      { value: 1, label: "Dasar (browsing, dokumen)" },
      { value: 2, label: "Rendah (multimedia ringan)" },
      { value: 3, label: "Menengah (multitasking sedang)" },
      { value: 4, label: "Tinggi (editing, gaming)" },
      { value: 5, label: "Sangat tinggi (workstation profesional)" },
    ],
    priority: 8,
    conditionalPriority: {
      gaming: { max: 2, min: 1, priority: 13 },
      videoEditing: { max: 2, min: 1, priority: 13 },
    },
  },
  {
    id: "multitasking",
    question: "Seberapa banyak aplikasi yang biasa Anda jalankan bersamaan?",
    options: [
      { value: 1, label: "Sedikit (1-2 aplikasi)" },
      { value: 2, label: "Beberapa (3-5 aplikasi)" },
      { value: 3, label: "Cukup banyak (5-8 aplikasi)" },
      { value: 4, label: "Banyak (8-12 aplikasi)" },
      { value: 5, label: "Sangat banyak (12+ aplikasi)" },
    ],
    priority: 4,
    conditionalPriority: {
      performance: { min: 3, priority: 9 },
    },
  },
  {
    id: "design",
    question: "Seberapa penting desain dan estetika laptop bagi Anda?",
    options: [
      { value: 1, label: "Tidak penting sama sekali" },
      { value: 2, label: "Sedikit penting" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting" },
      { value: 5, label: "Sangat penting" },
    ],
    priority: 3,
    conditionalPriority: {
      budget: { min: 4, priority: 8 },
    },
  },
  {
    id: "cooling",
    question: "Seberapa penting sistem pendingin yang baik bagi Anda?",
    options: [
      { value: 1, label: "Tidak penting" },
      { value: 2, label: "Sedikit penting" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting" },
      { value: 5, label: "Sangat penting" },
    ],
    priority: 2,
    conditionalPriority: {
      gaming: { min: 4, priority: 9 },
      performance: { min: 4, priority: 8 },
    },
  },
  {
    id: "buildQuality",
    question: "Seberapa penting kualitas bahan dan ketahanan laptop bagi Anda?",
    options: [
      { value: 1, label: "Tidak penting" },
      { value: 2, label: "Sedikit penting" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting" },
      { value: 5, label: "Sangat penting" },
    ],
    priority: 3,
    conditionalPriority: {
      budget: { min: 3, priority: 7 },
      portability: { min: 4, priority: 8 },
    },
  },
  {
    id: "touchscreen",
    question: "Apakah Anda membutuhkan layar sentuh?",
    options: [
      { value: 1, label: "Tidak butuh sama sekali" },
      { value: 2, label: "Mungkin berguna sesekali" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting" },
      { value: 5, label: "Sangat penting / wajib" },
    ],
    priority: 1,
    conditionalPriority: {
      portability: { min: 4, priority: 6 },
    },
  },
  {
    id: "noiseLevel",
    question: "Seberapa penting tingkat kebisingan laptop bagi Anda?",
    options: [
      { value: 1, label: "Tidak penting (bising tidak masalah)" },
      { value: 2, label: "Sedikit penting" },
      { value: 3, label: "Cukup penting" },
      { value: 4, label: "Penting (lebih suka yang tenang)" },
      { value: 5, label: "Sangat penting (harus sangat tenang)" },
    ],
    priority: 1,
    conditionalPriority: {
      cooling: { min: 4, priority: 7 },
    },
  },
]

// Function to calculate the degree of membership for a given input
function getMembershipDegree(variable, set, value) {
  switch (variable) {
    case "budget":
      return budgetSets[set](value)
    case "gaming":
      return gamingSets[set](value)
    case "videoEditing":
      return videoEditingSets[set](value)
    case "portability":
      return portabilitySets[set](value)
    case "battery":
      return batterySets[set](value)
    case "screenSize":
      return screenSizeSets[set](value)
    case "performance":
      return performanceSets[set](value)
    default:
      return 0
  }
}

// Fuzzy rules for laptop recommendation
const rules = [
  // Gaming laptops
  {
    antecedents: [
      { variable: "gaming", set: "frequent" },
      { variable: "budget", set: "high" },
    ],
    consequent: { category: "gaming", score: 0.9 },
  },
  {
    antecedents: [
      { variable: "gaming", set: "frequent" },
      { variable: "budget", set: "medium" },
    ],
    consequent: { category: "gaming", score: 0.7 },
  },
  {
    antecedents: [
      { variable: "gaming", set: "moderate" },
      { variable: "budget", set: "high" },
    ],
    consequent: { category: "gaming", score: 0.8 },
  },

  // Productivity laptops
  {
    antecedents: [
      { variable: "videoEditing", set: "frequent" },
      { variable: "budget", set: "high" },
    ],
    consequent: { category: "productivity", score: 0.9 },
  },
  {
    antecedents: [
      { variable: "videoEditing", set: "moderate" },
      { variable: "budget", set: "medium" },
    ],
    consequent: { category: "productivity", score: 0.7 },
  },

  // Ultraportable laptops
  {
    antecedents: [
      { variable: "portability", set: "veryImportant" },
      { variable: "battery", set: "veryImportant" },
    ],
    consequent: { category: "ultraportable", score: 0.9 },
  },
  {
    antecedents: [
      { variable: "portability", set: "veryImportant" },
      { variable: "gaming", set: "rare" },
    ],
    consequent: { category: "ultraportable", score: 0.8 },
  },
  {
    antecedents: [
      { variable: "portability", set: "important" },
      { variable: "battery", set: "important" },
      { variable: "budget", set: "medium" },
    ],
    consequent: { category: "ultraportable", score: 0.7 },
  },

  // Budget constraints
  {
    antecedents: [{ variable: "budget", set: "low" }],
    consequent: { category: "productivity", score: 0.6 },
  },
]

// Function to evaluate a rule based on user inputs
function evaluateRule(rule, inputs) {
  // Calculate the minimum membership degree across all antecedents (AND operation)
  const membershipDegrees = rule.antecedents.map((antecedent) => {
    const inputValue = inputs[antecedent.variable]
    if (inputValue === undefined) return 0
    return getMembershipDegree(antecedent.variable, antecedent.set, inputValue)
  })

  // Return the minimum membership degree (fuzzy AND)
  return Math.min(...membershipDegrees)
}

// Function to calculate laptop recommendations using Fuzzy Sugeno
export function calculateRecommendation(answers) {
  // Evaluate all rules
  const ruleResults = rules.map((rule) => {
    const firingStrength = evaluateRule(rule, answers)
    return {
      firingStrength,
      category: rule.consequent.category,
      score: rule.consequent.score,
    }
  })

  // Calculate scores for each laptop based on rule firing strengths and attribute matching
  const laptopScores = laptops.map((laptop) => {
    // Find all rules that match this laptop's category
    const matchingRules = ruleResults.filter((rule) => rule.category === laptop.category)

    let baseScore = 0
    if (matchingRules.length > 0) {
      // Calculate weighted average using Sugeno defuzzification
      let numerator = 0
      let denominator = 0

      matchingRules.forEach((rule) => {
        numerator += rule.firingStrength * rule.score
        denominator += rule.firingStrength
      })

      baseScore = denominator > 0 ? numerator / denominator : 0
    }

    // Calculate attribute matching score
    let attributeScore = 0
    let attributeCount = 0

    for (const [key, value] of Object.entries(answers)) {
      if (laptop.attributes[key] !== undefined) {
        const laptopValue = laptop.attributes[key]
        // Calculate similarity (5 - absolute difference)
        const similarity = 5 - Math.abs(laptopValue - value)
        attributeScore += similarity
        attributeCount++
      }
    }

    // Normalize attribute score (0-1)
    const normalizedAttributeScore = attributeCount > 0 ? attributeScore / (attributeCount * 5) : 0

    // Combine scores (70% attribute matching, 30% rule-based)
    const combinedScore = (normalizedAttributeScore * 0.7 + baseScore * 0.3) * 10

    return { ...laptop, score: combinedScore }
  })

  // Sort laptops by score in descending order
  return laptopScores.sort((a, b) => b.score - a.score)
}

// Function to determine the next question to ask based on current answers
export function getNextQuestion(currentAnswers, askedQuestions) {
  // Filter out questions that have already been asked
  const availableQuestions = questionPool.filter((q) => !askedQuestions.includes(q.id))

  if (availableQuestions.length === 0) return null

  // Calculate priority for each question based on current answers
  const questionsWithPriority = availableQuestions.map((question) => {
    let priority = question.priority

    // Check conditional priorities
    if (question.conditionalPriority) {
      for (const [conditionKey, condition] of Object.entries(question.conditionalPriority)) {
        const answerValue = currentAnswers[conditionKey]
        if (answerValue !== undefined) {
          // Check if the answer meets the condition
          const meetsMinCondition = condition.min === undefined || answerValue >= condition.min
          const meetsMaxCondition = condition.max === undefined || answerValue <= condition.max

          if (meetsMinCondition && meetsMaxCondition) {
            priority = condition.priority
          }
        }
      }
    }

    return { ...question, currentPriority: priority }
  })

  // Sort by priority (highest first)
  questionsWithPriority.sort((a, b) => b.currentPriority - a.currentPriority)

  // Return the highest priority question
  return questionsWithPriority[0]
}

// Function to calculate confidence level based on answers
export function calculateConfidence(answers) {
  // Base confidence starts at 0
  let confidence = 0

  // Each answer increases confidence
  const answerCount = Object.keys(answers).length

  // Calculate confidence based on number of questions answered
  // With 5 questions, we reach ~90% confidence
  confidence = Math.min(100, answerCount * 18)

  // Certain key questions increase confidence more
  const keyQuestions = ["budget", "gaming", "videoEditing", "portability"]
  const keyQuestionsAnswered = keyQuestions.filter((q) => answers[q] !== undefined).length

  // Bonus confidence for key questions
  confidence += keyQuestionsAnswered * 5

  // Cap at 100%
  return Math.min(100, confidence)
}

// Function to check if we have enough information to make a recommendation
export function hasEnoughInformation(answers) {
  // We need at least 3 answers to make a decent recommendation
  if (Object.keys(answers).length < 3) return false

  // We need at least 2 of the key questions answered
  const keyQuestions = ["budget", "gaming", "videoEditing", "portability"]
  const keyQuestionsAnswered = keyQuestions.filter((q) => answers[q] !== undefined).length

  return keyQuestionsAnswered >= 2
}
