import RaceClassifier from "../app/components/race-classifier"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Race Classification Expert System</h1>
        <p className="text-gray-600 mb-8 text-center">
          This expert system uses the Fuzzy Sugeno method to classify individuals into five racial categories based on
          physical characteristics.
        </p>
        <RaceClassifier />
      </div>
    </main>
  )
}
