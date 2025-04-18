"use client"

import { useState } from "react"
import { DateTime } from "luxon"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export interface EventDate {
  id: string
  month: string
  day: string
  title: string
  description: string
  date: DateTime
}

// Define the events with San Francisco local time
export const eventDates: EventDate[] = [
  {
    id: "kickoff",
    month: "MAY",
    day: "07",
    title: "Kickoff Party",
    description: "Location, San Francisco",
    date: DateTime.fromObject({ year: 2025, month: 5, day: 7, hour: 18 }, { zone: "America/Los_Angeles" }),
  },
  {
    id: "begins",
    month: "MAY",
    day: "30",
    title: "Hackathon Begins",
    description: "Hybrid, Worldwide",
    date: DateTime.fromObject({ year: 2025, month: 5, day: 30, hour: 9 }, { zone: "America/Los_Angeles" }),
  },
  {
    id: "ends",
    month: "JUNE",
    day: "30",
    title: "Hackathon Ends",
    description: "Hybrid, Worldwide",
    date: DateTime.fromObject({ year: 2025, month: 6, day: 30, hour: 23, minute: 59 }, { zone: "America/Los_Angeles" }),
  },
  {
    id: "awards",
    month: "JULY",
    day: "26",
    title: "Award Ceremony",
    description: "Hybrid, Worldwide",
    date: DateTime.fromObject({ year: 2025, month: 7, day: 26, hour: 16 }, { zone: "America/Los_Angeles" }),
  },
]

// Major cities for global time display
const majorCities = [
  { name: "San Francisco", timezone: "America/Los_Angeles" },
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Berlin", timezone: "Europe/Berlin" },
  { name: "Dubai", timezone: "Asia/Dubai" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
  { name: "Auckland", timezone: "Pacific/Auckland" },
]

interface EventTimelineProps {
  onSelectEvent: (event: EventDate) => void
  selectedEventId: string | null
}

export default function EventTimeline({ onSelectEvent, selectedEventId }: EventTimelineProps) {
  const [showGlobalTimes, setShowGlobalTimes] = useState<boolean>(false)

  const handleEventClick = (event: EventDate) => {
    onSelectEvent(event)
    setShowGlobalTimes(selectedEventId === event.id ? !showGlobalTimes : true)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#f5f5dc] to-[#e8d8c3] text-transparent bg-clip-text">
        BOLT HACKATHON TIMELINE
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {eventDates.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleEventClick(event)}
            className={`cursor-pointer ${selectedEventId === event.id ? "ring-2 ring-[#f5f5dc]/50 ring-offset-2 ring-offset-black" : ""}`}
          >
            <div className="rounded-lg overflow-hidden bg-black border border-[#e8d8c3]/20 hover:border-[#e8d8c3]/40 transition-all shadow-lg hover:shadow-[#e8d8c3]/10">
              <div className="bg-[#e8d8c3]/10 py-1 px-4 text-center text-[#f5f5dc] text-sm font-medium">
                {event.month}
              </div>
              <div className="py-6 px-4 text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-b from-[#f5f5dc] to-[#e8d8c3] text-transparent bg-clip-text">
                  {event.day}
                </div>
                <div className="text-[#f5f5dc] font-bold mb-1">{event.title}</div>
                <div className="text-[#e8d8c3]/70 text-sm">{event.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showGlobalTimes && selectedEventId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border border-[#e8d8c3]/20 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 text-[#f5f5dc]">
                {eventDates.find((e) => e.id === selectedEventId)?.title} - Global Times
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {majorCities.map((city) => {
                  const event = eventDates.find((e) => e.id === selectedEventId)
                  if (!event) return null

                  const localTime = event.date.setZone(city.timezone)
                  return (
                    <Card key={city.name} className="bg-black border-[#e8d8c3]/20">
                      <CardContent className="p-4">
                        <div className="font-bold text-[#f5f5dc] mb-1">{city.name}</div>
                        <div className="text-[#e8d8c3]/80 text-sm">{localTime.toFormat("ccc, MMM d")}</div>
                        <div className="text-[#f5f5dc] text-lg font-mono">{localTime.toFormat("HH:mm")}</div>
                        <div className="text-[#e8d8c3]/60 text-xs">{localTime.toFormat("ZZZZ")}</div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
