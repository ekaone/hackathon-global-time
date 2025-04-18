"use client";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { motion } from "framer-motion";
import CountdownTimer from "./countdown-timer";
import CityGrid from "./city-grid";
import DateTimeDrawer from "./date-time-drawer";
import EventTimeline, { eventDates, type EventDate } from "./event-timeline";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function CountdownApp() {
  const [targetDate, setTargetDate] = useState<DateTime | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDate | null>(null);

  // Find the next upcoming event on initial load
  useEffect(() => {
    const now = DateTime.now();
    const upcomingEvents = eventDates.filter((event) => event.date > now);

    if (upcomingEvents.length > 0) {
      // Sort by date and get the closest upcoming event
      const nextEvent = upcomingEvents.sort(
        (a, b) => a.date.toMillis() - b.date.toMillis()
      )[0];
      setSelectedEvent(nextEvent);
      setTargetDate(nextEvent.date);
    } else {
      // If all events have passed, set a default date
      setTargetDate(DateTime.now().plus({ days: 1 }));
    }
  }, []);

  const handleDateSubmit = (date: DateTime) => {
    setTargetDate(date);
    setSelectedEvent(null); // Clear selected event when custom date is set
    setIsDrawerOpen(false);
  };

  const handleEventSelect = (event: EventDate) => {
    setSelectedEvent(event);
    setTargetDate(event.date);
  };

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#0e1f33] to-black opacity-70 blur-xl -z-10"></div>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <a
              href="https://hackathon.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block"
            >
              <span className="relative inline-block bg-gradient-to-r from-[#ffffff] to-[#e8d8c3] group-hover:text-[#f5f5dc] text-transparent bg-clip-text">
                BOLT HACKATHON
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#ffffff] to-[#e8d8c3] group-hover:w-full transition-all duration-300"></span>
              </span>
              <span className="text-[#e8d8c3]"> COUNTDOWN</span>
            </a>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#e8d8c3]"
          >
            Track your deadline across the world
          </motion.p>
        </header>

        <EventTimeline
          onSelectEvent={handleEventSelect}
          selectedEventId={selectedEvent?.id || null}
        />

        <div className="mt-16">
          {targetDate && (
            <>
              <div className="text-center mb-6">
                {selectedEvent ? (
                  <div className="inline-block px-6 py-2 bg-[#e8d8c3]/10 rounded-full">
                    <span className="text-[#f5f5dc] font-medium">
                      Countdown to:{" "}
                    </span>
                    <span className="text-[#f5f5dc] font-bold">
                      {selectedEvent.title}
                    </span>
                    <span className="text-[#e8d8c3]/80 ml-2 text-sm">
                      ({selectedEvent.month} {selectedEvent.day})
                    </span>
                  </div>
                ) : (
                  <div className="inline-block px-6 py-2 bg-[#e8d8c3]/10 rounded-full">
                    <span className="text-[#f5f5dc] font-medium">
                      Custom Countdown
                    </span>
                  </div>
                )}
              </div>
              <CountdownTimer targetDate={targetDate} />
              <CityGrid targetDate={targetDate} />
            </>
          )}
        </div>

        <Button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-[#e8d8c3]/70 hover:bg-[#e8d8c3] text-black shadow-lg shadow-[#e8d8c3]/10"
          aria-label="Set deadline"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>

        <DateTimeDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSubmit={handleDateSubmit}
          initialDate={targetDate}
        />
      </div>
    </div>
  );
}
