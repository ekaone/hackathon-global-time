"use client"

import type { DateTime } from "luxon"
import { Card, CardContent } from "@/components/ui/card"

interface CityGridProps {
  targetDate: DateTime
}

interface City {
  name: string
  timezone: string
  region: string
}

// List of 50 major cities around the world with their timezones
const cities: City[] = [
  { name: "New York", timezone: "America/New_York", region: "North America" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", region: "North America" },
  { name: "Chicago", timezone: "America/Chicago", region: "North America" },
  { name: "Toronto", timezone: "America/Toronto", region: "North America" },
  { name: "Mexico City", timezone: "America/Mexico_City", region: "North America" },
  { name: "Vancouver", timezone: "America/Vancouver", region: "North America" },
  { name: "London", timezone: "Europe/London", region: "Europe" },
  { name: "Paris", timezone: "Europe/Paris", region: "Europe" },
  { name: "Berlin", timezone: "Europe/Berlin", region: "Europe" },
  { name: "Rome", timezone: "Europe/Rome", region: "Europe" },
  { name: "Madrid", timezone: "Europe/Madrid", region: "Europe" },
  { name: "Amsterdam", timezone: "Europe/Amsterdam", region: "Europe" },
  { name: "Zurich", timezone: "Europe/Zurich", region: "Europe" },
  { name: "Moscow", timezone: "Europe/Moscow", region: "Europe" },
  { name: "Istanbul", timezone: "Europe/Istanbul", region: "Europe" },
  { name: "Dubai", timezone: "Asia/Dubai", region: "Middle East" },
  { name: "Tel Aviv", timezone: "Asia/Tel_Aviv", region: "Middle East" },
  { name: "Riyadh", timezone: "Asia/Riyadh", region: "Middle East" },
  { name: "Tokyo", timezone: "Asia/Tokyo", region: "Asia" },
  { name: "Shanghai", timezone: "Asia/Shanghai", region: "Asia" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", region: "Asia" },
  { name: "Singapore", timezone: "Asia/Singapore", region: "Asia" },
  { name: "Seoul", timezone: "Asia/Seoul", region: "Asia" },
  { name: "Bangkok", timezone: "Asia/Bangkok", region: "Asia" },
  { name: "Mumbai", timezone: "Asia/Kolkata", region: "Asia" },
  { name: "Delhi", timezone: "Asia/Kolkata", region: "Asia" },
  { name: "Jakarta", timezone: "Asia/Jakarta", region: "Asia" },
  { name: "Manila", timezone: "Asia/Manila", region: "Asia" },
  { name: "Taipei", timezone: "Asia/Taipei", region: "Asia" },
  { name: "Kuala Lumpur", timezone: "Asia/Kuala_Lumpur", region: "Asia" },
  { name: "Sydney", timezone: "Australia/Sydney", region: "Oceania" },
  { name: "Melbourne", timezone: "Australia/Melbourne", region: "Oceania" },
  { name: "Brisbane", timezone: "Australia/Brisbane", region: "Oceania" },
  { name: "Perth", timezone: "Australia/Perth", region: "Oceania" },
  { name: "Auckland", timezone: "Pacific/Auckland", region: "Oceania" },
  { name: "Wellington", timezone: "Pacific/Auckland", region: "Oceania" },
  { name: "Fiji", timezone: "Pacific/Fiji", region: "Oceania" },
  { name: "Honolulu", timezone: "Pacific/Honolulu", region: "Oceania" },
  { name: "São Paulo", timezone: "America/Sao_Paulo", region: "South America" },
  { name: "Rio de Janeiro", timezone: "America/Sao_Paulo", region: "South America" },
  { name: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires", region: "South America" },
  { name: "Santiago", timezone: "America/Santiago", region: "South America" },
  { name: "Lima", timezone: "America/Lima", region: "South America" },
  { name: "Bogotá", timezone: "America/Bogota", region: "South America" },
  { name: "Cairo", timezone: "Africa/Cairo", region: "Africa" },
  { name: "Johannesburg", timezone: "Africa/Johannesburg", region: "Africa" },
  { name: "Lagos", timezone: "Africa/Lagos", region: "Africa" },
  { name: "Nairobi", timezone: "Africa/Nairobi", region: "Africa" },
  { name: "Casablanca", timezone: "Africa/Casablanca", region: "Africa" },
  { name: "Accra", timezone: "Africa/Accra", region: "Africa" },
]

// Group cities by region
const groupedCities = cities.reduce(
  (acc, city) => {
    if (!acc[city.region]) {
      acc[city.region] = []
    }
    acc[city.region].push(city)
    return acc
  },
  {} as Record<string, City[]>,
)

// Order of regions to display
const regionOrder = ["North America", "South America", "Europe", "Africa", "Middle East", "Asia", "Oceania"]

export default function CityGrid({ targetDate }: CityGridProps) {
  return (
    <div className="mb-20">
      {regionOrder.map((region) => (
        <div key={region} className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#f5f5dc]">{region.toUpperCase()}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {groupedCities[region]?.map((city) => (
              <CityCard key={city.name} city={city} targetDate={targetDate} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function CityCard({ city, targetDate }: { city: City; targetDate: DateTime }) {
  // Convert target date to the city's timezone
  const localTargetDate = targetDate.setZone(city.timezone)

  // Get timezone abbreviation
  const tzAbbr = localTargetDate.toFormat("ZZZZ")

  return (
    <Card className="bg-black border border-[#e8d8c3]/20 hover:border-[#e8d8c3]/50 transition-colors">
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1 text-[#f5f5dc]">{city.name}</h3>
        <div className="text-sm text-[#e8d8c3] mb-2">{tzAbbr}</div>
        <div className="font-mono text-[#e8d8c3]/80">{localTargetDate.toFormat("yyyy-MM-dd")}</div>
        <div className="font-mono text-xl text-[#f5f5dc]">{localTargetDate.toFormat("HH:mm:ss")}</div>
      </CardContent>
    </Card>
  )
}
