"use client";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock, RefreshCw } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DateTimeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: DateTime) => void;
  initialDate: DateTime | null;
}

export default function DateTimeDrawer({
  isOpen,
  onClose,
  onSubmit,
  initialDate,
}: DateTimeDrawerProps) {
  const [date, setDate] = useState<Date | undefined>(
    initialDate
      ? new Date(initialDate.toJSDate())
      : new Date(Date.now() + 24 * 60 * 60 * 1000)
  );

  const [time, setTime] = useState<string>(
    initialDate
      ? initialDate.toFormat("HH:mm")
      : new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
  );

  const [isoInput, setIsoInput] = useState<string>(
    initialDate
      ? initialDate.toUTC().toISO({ suppressMilliseconds: true }) || ""
      : ""
  );

  // Update local state when initialDate changes
  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate.toJSDate()));
      setTime(initialDate.toFormat("HH:mm"));
      setIsoInput(
        initialDate.toUTC().toISO({ suppressMilliseconds: true }) || ""
      );
    }
  }, [initialDate]);

  const handleSubmit = () => {
    if (!date) return;

    // Parse the time string
    const [hours, minutes] = time.split(":").map(Number);

    // Create a new date with the selected date and time
    const selectedDate = new Date(date);
    selectedDate.setHours(hours);
    selectedDate.setMinutes(minutes);

    // Convert to Luxon DateTime
    const luxonDate = DateTime.fromJSDate(selectedDate);

    onSubmit(luxonDate);
  };

  const handleIsoSubmit = () => {
    try {
      const luxonDate = DateTime.fromISO(isoInput);

      if (!luxonDate.isValid) {
        throw new Error("Invalid ISO format");
      }

      onSubmit(luxonDate);
    } catch (error) {
      // Handle invalid ISO format
      console.error("Invalid ISO timestamp format", error);
      // You could add UI feedback here
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="bg-black border-t border-[#e8d8c3]/20">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-[#f5f5dc]">Set Deadline</DrawerTitle>
            <DrawerDescription className="text-[#e8d8c3]/80">
              Choose a target date and time for your countdown
            </DrawerDescription>
          </DrawerHeader>

          <Tabs defaultValue="calendar" className="p-4 pb-0">
            <TabsList className="grid grid-cols-2 bg-[#e8d8c3]/10 max-w-sm w-full mx-auto">
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:bg-[#e8d8c3]/20 data-[state=active]:text-black"
              >
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="iso"
                className="data-[state=active]:bg-[#e8d8c3]/20 data-[state=active]:text-black"
              >
                ISO Timestamp
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date" className="text-[#f5f5dc]">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-black border-[#e8d8c3]/30 text-[#f5f5dc] hover:bg-[#e8d8c3]/15 hover:text-[#f5f5dc]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-black border-[#e8d8c3]/30">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="bg-black text-[#f5f5dc]"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time" className="text-[#f5f5dc]">
                    Time (24-hour format)
                  </Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-green-500" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-black border-[#e8d8c3]/30 text-[#f5f5dc] focus:border-green-600"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="bg-[#e8d8c3]/30 hover:bg-[#e8d8c3]/40 text-black mt-2"
                >
                  Set Deadline
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="iso" className="mt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="iso" className="text-[#f5f5dc]">
                    ISO UTC Timestamp
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="iso"
                      placeholder="YYYY-MM-DDTHH:MM:SSZ"
                      value={isoInput}
                      onChange={(e) => setIsoInput(e.target.value)}
                      className="bg-black border-[#e8d8c3]/30 text-[#f5f5dc] focus:border-green-600 font-mono"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const now = DateTime.now().toUTC();
                        setIsoInput(
                          now.toISO({ suppressMilliseconds: true }) || ""
                        );
                      }}
                      className="border-[#e8d8c3]/30 text-[#f5f5dc] hover:bg-[#e8d8c3]/15"
                      title="Set to current time"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-[#e8d8c3]/80">
                    Format: YYYY-MM-DDTHH:MM:SSZ (e.g., 2025-04-18T06:59:00Z)
                  </p>
                </div>

                <Button
                  onClick={handleIsoSubmit}
                  className="bg-[#e8d8c3]/30 hover:bg-[#e8d8c3]/40 text-black mt-2"
                >
                  Set Deadline
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="border-[#e8d8c3]/30 text-[#f5f5dc] hover:bg-[#e8d8c3]/15 hover:text-[#f5f5dc]"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
