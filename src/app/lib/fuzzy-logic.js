// Define the races
const RACES = ["Mongoloid", "Negroid", "Caucasoid", "Australoid", "Khoisan"]

// Membership functions for each characteristic
const membershipFunctions = {
  skinTone: {
    light: (value) => {
      if (value <= 30) return 1
      if (value >= 60) return 0
      return (60 - value) / 30
    },
    medium: (value) => {
      if (value <= 30) return 0
      if (value >= 30 && value <= 50) return (value - 30) / 20
      if (value >= 50 && value <= 70) return (70 - value) / 20
      return 0
    },
    dark: (value) => {
      if (value <= 40) return 0
      if (value >= 70) return 1
      return (value - 40) / 30
    },
  },
  eyeShape: {
    round: (value) => {
      if (value <= 30) return 1
      if (value >= 60) return 0
      return (60 - value) / 30
    },
    almond: (value) => {
      if (value <= 30) return 0
      if (value >= 30 && value <= 50) return (value - 30) / 20
      if (value >= 50 && value <= 70) return (70 - value) / 20
      return 0
    },
    narrow: (value) => {
      if (value <= 40) return 0
      if (value >= 70) return 1
      return (value - 40) / 30
    },
  },
  noseWidth: {
    narrow: (value) => {
      if (value <= 30) return 1
      if (value >= 60) return 0
      return (60 - value) / 30
    },
    medium: (value) => {
      if (value <= 30) return 0
      if (value >= 30 && value <= 50) return (value - 30) / 20
      if (value >= 50 && value <= 70) return (70 - value) / 20
      return 0
    },
    wide: (value) => {
      if (value <= 40) return 0
      if (value >= 70) return 1
      return (value - 40) / 30
    },
  },
  lipThickness: {
    thin: (value) => {
      if (value <= 30) return 1
      if (value >= 60) return 0
      return (60 - value) / 30
    },
    medium: (value) => {
      if (value <= 30) return 0
      if (value >= 30 && value <= 50) return (value - 30) / 20
      if (value >= 50 && value <= 70) return (70 - value) / 20
      return 0
    },
    full: (value) => {
      if (value <= 40) return 0
      if (value >= 70) return 1
      return (value - 40) / 30
    },
  },
  hairTexture: {
    straight: (value) => {
      if (value <= 30) return 1
      if (value >= 60) return 0
      return (60 - value) / 30
    },
    wavy: (value) => {
      if (value <= 30) return 0
      if (value >= 30 && value <= 50) return (value - 30) / 20
      if (value >= 50 && value <= 70) return (70 - value) / 20
      return 0
    },
    curly: (value) => {
      if (value <= 40) return 0
      if (value >= 70) return 1
      return (value - 40) / 30
    },
  },
}

// Fuzzy rules using Sugeno method
// Each rule returns a value between 0 and 1 for each race
const fuzzyRules = [
  // Mongoloid rules
  {
    condition: (char) => {
      const skinMedium = membershipFunctions.skinTone.medium(char.skinTone)
      const eyeNarrow = membershipFunctions.eyeShape.narrow(char.eyeShape)
      const noseNarrow = membershipFunctions.noseWidth.narrow(char.noseWidth)
      const lipThin = membershipFunctions.lipThickness.thin(char.lipThickness)
      const hairStraight = membershipFunctions.hairTexture.straight(char.hairTexture)

      return Math.min(skinMedium, eyeNarrow, noseNarrow, lipThin, hairStraight)
    },
    output: { race: "Mongoloid", value: 0.9 },
  },
  {
    condition: (char) => {
      const skinLight = membershipFunctions.skinTone.light(char.skinTone)
      const eyeNarrow = membershipFunctions.eyeShape.narrow(char.eyeShape)

      return Math.min(skinLight, eyeNarrow)
    },
    output: { race: "Mongoloid", value: 0.7 },
  },

  // Negroid rules
  {
    condition: (char) => {
      const skinDark = membershipFunctions.skinTone.dark(char.skinTone)
      const noseWide = membershipFunctions.noseWidth.wide(char.noseWidth)
      const lipFull = membershipFunctions.lipThickness.full(char.lipThickness)
      const hairCurly = membershipFunctions.hairTexture.curly(char.hairTexture)

      return Math.min(skinDark, noseWide, lipFull, hairCurly)
    },
    output: { race: "Negroid", value: 0.9 },
  },
  {
    condition: (char) => {
      const skinDark = membershipFunctions.skinTone.dark(char.skinTone)
      const lipFull = membershipFunctions.lipThickness.full(char.lipThickness)

      return Math.min(skinDark, lipFull)
    },
    output: { race: "Negroid", value: 0.7 },
  },

  // Caucasoid rules
  {
    condition: (char) => {
      const skinLight = membershipFunctions.skinTone.light(char.skinTone)
      const eyeAlmond = membershipFunctions.eyeShape.almond(char.eyeShape)
      const noseNarrow = membershipFunctions.noseWidth.narrow(char.noseWidth)
      const lipThin = membershipFunctions.lipThickness.thin(char.lipThickness)
      const hairWavy = membershipFunctions.hairTexture.wavy(char.hairTexture)

      return Math.min(skinLight, eyeAlmond, noseNarrow, lipThin, hairWavy)
    },
    output: { race: "Caucasoid", value: 0.9 },
  },
  {
    condition: (char) => {
      const skinLight = membershipFunctions.skinTone.light(char.skinTone)
      const noseNarrow = membershipFunctions.noseWidth.narrow(char.noseWidth)

      return Math.min(skinLight, noseNarrow)
    },
    output: { race: "Caucasoid", value: 0.7 },
  },

  // Australoid rules
  {
    condition: (char) => {
      const skinDark = membershipFunctions.skinTone.dark(char.skinTone)
      const eyeRound = membershipFunctions.eyeShape.round(char.eyeShape)
      const noseWide = membershipFunctions.noseWidth.wide(char.noseWidth)
      const hairWavy = membershipFunctions.hairTexture.wavy(char.hairTexture)

      return Math.min(skinDark, eyeRound, noseWide, hairWavy)
    },
    output: { race: "Australoid", value: 0.9 },
  },
  {
    condition: (char) => {
      const skinDark = membershipFunctions.skinTone.dark(char.skinTone)
      const noseWide = membershipFunctions.noseWidth.wide(char.noseWidth)

      return Math.min(skinDark, noseWide)
    },
    output: { race: "Australoid", value: 0.7 },
  },

  // Khoisan rules
  {
    condition: (char) => {
      const skinMedium = membershipFunctions.skinTone.medium(char.skinTone)
      const eyeRound = membershipFunctions.eyeShape.round(char.eyeShape)
      const noseWide = membershipFunctions.noseWidth.wide(char.noseWidth)
      const lipMedium = membershipFunctions.lipThickness.medium(char.lipThickness)
      const hairCurly = membershipFunctions.hairTexture.curly(char.hairTexture)

      return Math.min(skinMedium, eyeRound, noseWide, lipMedium, hairCurly)
    },
    output: { race: "Khoisan", value: 0.9 },
  },
  {
    condition: (char) => {
      const skinMedium = membershipFunctions.skinTone.medium(char.skinTone)
      const eyeRound = membershipFunctions.eyeShape.round(char.eyeShape)

      return Math.min(skinMedium, eyeRound)
    },
    output: { race: "Khoisan", value: 0.7 },
  },
]

// Calculate the race classification using Sugeno method
export function calculateRaceClassification(characteristics) {
  // Initialize scores for each race
  const scores = {}
  RACES.forEach((race) => {
    scores[race] = 0
  })

  let totalWeight = 0

  // Apply each rule
  fuzzyRules.forEach((rule) => {
    const firingStrength = rule.condition(characteristics)
    if (firingStrength > 0) {
      const race = rule.output.race
      const weightedValue = firingStrength * rule.output.value

      scores[race] += weightedValue
      totalWeight += firingStrength
    }
  })

  // Normalize scores if there are any firing rules
  if (totalWeight > 0) {
    RACES.forEach((race) => {
      scores[race] = scores[race] / totalWeight
    })
  }

  // Find the race with the highest score
  let maxScore = 0
  let classifiedRace = ""

  RACES.forEach((race) => {
    if (scores[race] > maxScore) {
      maxScore = scores[race]
      classifiedRace = race
    }
  })

  return {
    race: classifiedRace || "Undetermined",
    confidence: maxScore,
    scores,
  }
}
