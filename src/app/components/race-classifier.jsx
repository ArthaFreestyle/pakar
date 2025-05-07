"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { calculateRaceClassification } from "../lib/fuzzy-logic"

export default function RaceClassifier() {
  const [skinTone, setSkinTone] = useState(50)
  const [eyeShape, setEyeShape] = useState(50)
  const [noseWidth, setNoseWidth] = useState(50)
  const [lipThickness, setLipThickness] = useState(50)
  const [hairTexture, setHairTexture] = useState(50)
  const [result, setResult] = useState(null)

  const handleClassify = () => {
    const classificationResult = calculateRaceClassification({
      skinTone,
      eyeShape,
      noseWidth,
      lipThickness,
      hairTexture,
    })
    setResult(classificationResult)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Physical Characteristics</CardTitle>
          <CardDescription>Adjust the sliders to match the physical characteristics of the individual</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="skinTone">Skin Tone</Label>
              <span className="text-sm text-gray-500">{skinTone}</span>
            </div>
            <Slider
              id="skinTone"
              min={0}
              max={100}
              step={1}
              value={[skinTone]}
              onValueChange={(value) => setSkinTone(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Light</span>
              <span>Medium</span>
              <span>Dark</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="eyeShape">Eye Shape</Label>
              <span className="text-sm text-gray-500">{eyeShape}</span>
            </div>
            <Slider
              id="eyeShape"
              min={0}
              max={100}
              step={1}
              value={[eyeShape]}
              onValueChange={(value) => setEyeShape(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Round</span>
              <span>Almond</span>
              <span>Narrow</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="noseWidth">Nose Width</Label>
              <span className="text-sm text-gray-500">{noseWidth}</span>
            </div>
            <Slider
              id="noseWidth"
              min={0}
              max={100}
              step={1}
              value={[noseWidth]}
              onValueChange={(value) => setNoseWidth(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Narrow</span>
              <span>Medium</span>
              <span>Wide</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="lipThickness">Lip Thickness</Label>
              <span className="text-sm text-gray-500">{lipThickness}</span>
            </div>
            <Slider
              id="lipThickness"
              min={0}
              max={100}
              step={1}
              value={[lipThickness]}
              onValueChange={(value) => setLipThickness(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Thin</span>
              <span>Medium</span>
              <span>Full</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="hairTexture">Hair Texture</Label>
              <span className="text-sm text-gray-500">{hairTexture}</span>
            </div>
            <Slider
              id="hairTexture"
              min={0}
              max={100}
              step={1}
              value={[hairTexture]}
              onValueChange={(value) => setHairTexture(value[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Straight</span>
              <span>Wavy</span>
              <span>Curly</span>
            </div>
          </div>

          <Button onClick={handleClassify} className="w-full mt-4">
            Classify
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Classification Result</CardTitle>
            <CardDescription>Based on the provided characteristics, the individual is classified as:</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-center">{result.race}</div>
              <div className="text-center text-gray-500">Confidence: {(result.confidence * 100).toFixed(2)}%</div>

              <div className="space-y-2 mt-6">
                <h3 className="font-medium">Detailed Scores:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(result.scores).map(([race, score]) => (
                    <div key={race} className="flex justify-between">
                      <span>{race}:</span>
                      <span>{(score * 100).toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
