"use client"

import { useState, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type WorkoutProgram = {
  id: number
  name: string
  detail: string
  day: string
  equipment: string
  type: string
  time: string
  year: string
  img: string
  banner: string
  releaseDate: string
  category: string
}

export function ViewAll() {
  const [workoutPrograms, setWorkoutPrograms] = useState<WorkoutProgram[]>([
    {
      id: 1,
      name: "Strength Training",
      detail: "Comprehensive strength-building program",
      day: "Monday, Wednesday, Friday",
      equipment: "Weights, Resistance Bands",
      type: "Strength",
      time: "60 minutes",
      year: "2023",
      img: "/placeholder.svg",
      banner: "/placeholder.svg",
      releaseDate: "2023-01-01",
      category: "Fitness",
    },
    {
      id: 2,
      name: "Cardio Blast",
      detail: "High-intensity cardio workout",
      day: "Tuesday, Thursday",
      equipment: "Treadmill, Stationary Bike",
      type: "Cardio",
      time: "45 minutes",
      year: "2023",
      img: "/placeholder.svg",
      banner: "/placeholder.svg",
      releaseDate: "2023-02-15",
      category: "Fitness",
    },
    {
      id: 3,
      name: "Yoga Flow",
      detail: "Gentle and restorative yoga practice",
      day: "Wednesday, Saturday",
      equipment: "Yoga Mat",
      type: "Yoga",
      time: "60 minutes",
      year: "2023",
      img: "/placeholder.svg",
      banner: "/placeholder.svg",
      releaseDate: "2023-03-01",
      category: "Wellness",
    },
  ])
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  const handleEdit = (program: WorkoutProgram): void => {
    setSelectedProgram(program)
    setShowModal(true)
  }

  const handleSave = (updatedProgram: WorkoutProgram): void => {
    setWorkoutPrograms((prevPrograms) => {
      return prevPrograms.map((program) => {
        if (program.id === updatedProgram.id) {
          return updatedProgram
        }
        return program
      })
    })
    setSelectedProgram(null)
    setShowModal(false)
  }

  const handleDelete = (id: number): void => {
    setWorkoutPrograms((prevPrograms) => prevPrograms.filter((program) => program.id !== id))
  }

  const handleAdd = (): void => {
    setSelectedProgram({
      id: 0,
      name: "",
      detail: "",
      day: "",
      equipment: "",
      type: "",
      time: "",
      year: "",
      img: "/placeholder.svg",
      banner: "/placeholder.svg",
      releaseDate: "",
      category: "",
    })
    setShowAddModal(true)
  }

  const handleSaveNew = (newProgram: WorkoutProgram): void => {
    setWorkoutPrograms((prevPrograms) => [...prevPrograms, newProgram])
    setSelectedProgram(null)
    setShowAddModal(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (selectedProgram) {
      setSelectedProgram({ ...selectedProgram, [e.target.id]: e.target.value })
    }
  }

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    if (selectedProgram) {
      setSelectedProgram({ ...selectedProgram, [e.target.id]: e.target.value })
    }
  }

  const handleSelectChange = (id: string, value: string): void => {
    if (selectedProgram) {
      setSelectedProgram({ ...selectedProgram, [id]: value })
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Workout Programs</h1>
          <Button onClick={handleAdd}>Add Program</Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="grid gap-6">
          {workoutPrograms.map((program) => (
            <Card key={program.id} className="w-full">
              <div className="grid md:grid-cols-[200px_1fr] gap-6">
                <div className="relative">
                  <img
                    src="/placeholder.svg"
                    alt={program.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
                    {program.category}
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{program.name}</h2>
                    <p className="text-muted-foreground">{program.detail}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Day</div>
                      <div>{program.day}</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Equipment</div>
                      <div>{program.equipment}</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Type</div>
                      <div>{program.type}</div>
                    </div>
                    <div className="grid gap-1">
                      <div className="text-sm font-medium">Time</div>
                      <div>{program.time}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="default" onClick={() => handleEdit(program)}>
                      Edit
                    </Button>
                    <Button variant="default" onClick={() => handleDelete(program.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      {showModal && selectedProgram && (
        <div>
          <div className="w-full max-w-2xl">
            <div>
              <div>Edit Workout Program</div>
            </div>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={selectedProgram.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedProgram.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fitness">Fitness</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detail">Detail</Label>
                <Textarea
                  id="detail"
                  value={selectedProgram.detail}
                  onChange={handleTextareaChange}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Input
                    id="day"
                    value={selectedProgram.day}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <Input
                    id="equipment"
                    value={selectedProgram.equipment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={selectedProgram.type}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={selectedProgram.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={selectedProgram.year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={selectedProgram.releaseDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button variant="default" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSave(selectedProgram)}>Save</Button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && selectedProgram && (
        <div>
          <div className="w-full max-w-2xl">
            <div>
              <div>Add Workout Program</div>
            </div>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={selectedProgram.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedProgram.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fitness">Fitness</SelectItem>
                      <SelectItem value="Wellness">Wellness</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="detail">Detail</Label>
                <Textarea
                  id="detail"
                  value={selectedProgram.detail}
                  onChange={handleTextareaChange}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Input
                    id="day"
                    value={selectedProgram.day}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <Input
                    id="equipment"
                    value={selectedProgram.equipment}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    value={selectedProgram.type}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={selectedProgram.time}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    value={selectedProgram.year}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={selectedProgram.releaseDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button variant="default" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSaveNew(selectedProgram)}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
