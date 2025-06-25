"use client"

import { useState, useMemo } from "react"
const events = [
  {
    id: 1,
    title: "Team Standup",
    date: "2025-07-27",
    time: "09:00",
    duration: 30,
  },
  {
    id: 2,
    title: "Team Meeting",
    date: "2025-07-27",
    time: "09:00",
    duration: 30,
  },

  {
    id: 3,
    title: "Product Launch",
    date: "2025-08-03",
    time: "10:30",
    duration: 120,
  },
  {
    id: 4,
    title: "Client Demo",
    date: "2025-09-20",
    time: "14:00",
    duration: 90,
  },
  {
    id: 5,
    title: "Code Review",
    date: "2025-08-18",
    time: "11:00",
    duration: 45,
  },
  {
    id: 6,
    title: "Sprint Planning",
    date: "2025-08-22",
    time: "09:00",
    duration: 180,
  },
  {
    id: 7,
    title: "Game Time",
    date: "2025-08-22",
    time: "09:00",
    duration: 180,
  },
  {
    id: 8,
    title: "Holiday Celebration",
    date: "2025-10-25",
    time: "18:00",
    duration: 240
  },
  { id: 9, 
    title: "Design Workshop", 
    date: "2025-08-15", 
    time: "15:00", 
    duration: 120
  },
  {
    id: 10,
    title: "Year-end Review",
    date: "2025-11-18",
    time: "10:00",
    duration: 60
  },{
    id: 11,
    title: "Team Standup",
    date: "2025-01-04",
    time: "09:00",
    duration: 30,
  },
  {
    id: 12,
    title: "Team Meeting",
    date: "2025-02-2",
    time: "09:00",
    duration: 30,
  },

  {
    id: 13,
    title: "Product Launch",
    date: "2025-03-09",
    time: "10:30",
    duration: 120,
  },
  {
    id: 14,
    title: "Client Demo",
    date: "2025-04-23",
    time: "14:00",
    duration: 90,
  },
  {
    id: 15,
    title: "Code Review",
    date: "2025-05-18",
    time: "11:00",
    duration: 45,
  },
  {
    id: 16,
    title: "Sprint Planning",
    date: "2025-05-18",
    time: "09:00",
    duration: 180,
  },
  {
    id: 17,
    title: "Game Time",
    date: "2025-06-16",
    time: "09:00",
    duration: 180,
  },
  {
    id: 18,
    title: "Holiday Celebration",
    date: "2025-12-17",
    time: "18:00",
    duration: 240
  },
  { id: 19, 
    title: "Design Workshop", 
    date: "2025-11-15", 
    time: "15:00", 
    duration: 120
  },
  {
    id: 20,
    title: "Year-end Review",
    date: "2025-09-18",
    time: "10:00",
    duration: 60
  }
]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export default function SimpleCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const monthEvents = useMemo(() => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
    })
  }, [currentMonth, currentYear])
  const eventsByDate = useMemo(() => {
    const grouped = {}
    monthEvents.forEach((event) => {
      if (!grouped[event.date]) {
        grouped[event.date] = []
      }
      grouped[event.date].push(event)
    })
    return grouped
  }, [monthEvents])
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours * 60 + minutes
  }
  const hasConflict = (event, allEvents) => {
    return allEvents.some((otherEvent) => {
      if (otherEvent.id === event.id || otherEvent.date !== event.date) return false

      const start1 = timeToMinutes(event.time)
      const end1 = start1 + event.duration
      const start2 = timeToMinutes(otherEvent.time)
      const end2 = start2 + otherEvent.duration
      return start1 < end2 && start2 < end1 && event.id > otherEvent.id
    })
  }

  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const isToday = (day) => {
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }
  const getDateKey = (day) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }
  const calendarDays = []

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      {}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {months[currentMonth]} {currentYear}
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => changeMonth(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Previous
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {}
        <div className="grid grid-cols-7 bg-gray-100">
          {days.map((day) => (
            <div
              key={day}
              className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            const dateKey = day ? getDateKey(day) : ""
            const dayEvents = day ? eventsByDate[dateKey] || [] : []

            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-gray-200 last:border-r-0 ${
                  day ? "cursor-pointer hover:bg-gray-50" : "bg-gray-25"
                } ${isToday(day) ? "bg-blue-50 border-blue-300" : ""}`}
                onClick={() => day && setSelectedDate(new Date(currentYear, currentMonth, day))}
              >
                {day && (
                  <>
                    {}
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-semibold ${isToday(day) ? "text-blue-600" : "text-gray-700"}`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{dayEvents.length}</span>
                      )}
                    </div>

                    {}
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => {
                        const isConflicted = hasConflict(event, events)
                        return (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white ${isConflicted ? "bg-red-500" : "bg-blue-500"}`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="opacity-90">{formatTime(event.time)}</div>
                          </div>
                        )
                      })}

                      {dayEvents.length > 2 && (
                        <div className="text-xs text-center py-1 bg-gray-200 rounded text-gray-600">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {}
      {selectedDate && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Events for {selectedDate.toLocaleDateString()}</h3>

          {(() => {
            const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            const dayEvents = eventsByDate[dateKey] || []

            if (dayEvents.length === 0) {
              return <p className="text-gray-500 text-center py-8">No events scheduled for this day</p>
            }
            const conflicts = dayEvents.filter((event) => hasConflict(event, events))

            return (
              <div>
                {}
                {conflicts.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Schedule Conflicts Found!</h4>
                    <p className="text-red-700 text-sm">
                      {conflicts.length} event{conflicts.length > 1 ? "s have" : " has"} time conflicts.
                    </p>
                  </div>
                )}

                {}
                <div className="space-y-3">
                  {dayEvents.map((event) => {
                    const isConflicted = hasConflict(event, events)
                    return (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg border ${
                          isConflicted ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-semibold ${isConflicted ? "text-red-800" : "text-gray-800"}`}>
                              {event.title}
                              {isConflicted && <span className="ml-2 text-red-500">⚠️</span>}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {formatTime(event.time)} ({event.duration} minutes)
                            </p>
                          </div>

                          {isConflicted && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">CONFLICT</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}
