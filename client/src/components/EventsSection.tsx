import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type EventItem = {
  id: string | number;
  title: string;
  location: string;
  datetime: string;
};

type UpcomingEventsProps = {
  events?: EventItem[];
  onSeeAll?: () => void;
  className?: string;
};

const defaultEvents: EventItem[] = [
  {
    id: 1,
    title: "event 1",
    location: "event 1",
    datetime: "12 Aug 2025 3:00pm to 4:...",
  },
  { id: 2, title: "(DEI Learning) From Struggle to Strength : Suppo", location: "L8 Conference Rooms", datetime: "12 Aug 2025 3:00pm to 4:..." },
  { id: 3, title: "(DEI Learning) From Struggle to Strength : Suppo", location: "L8 Conference Rooms", datetime: "12 Aug 2025 3:00pm to 4:..." },
  { id: 4, title: "(DEI Learning) From Struggle to Strength : Suppo", location: "L8 Conference Rooms", datetime: "12 Aug 2025 3:00pm to 4:..." },
];

export function UpcomingEvents({ events, onSeeAll, className = "" }: UpcomingEventsProps) {
  const items = events && events.length ? events : defaultEvents;

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">
            Upcoming events
        </h2>
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
          onClick={onSeeAll}
        >
          See all events
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((e) => (
            //need to make it to look like the card in ServiceCard
          <Card key={e.id} className="hover:text-enterprise-blue transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font- text-gray-900 text-sm leading-tight">
                    {e.title}
                  </h3>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-600">
                <p>Location: {e.location}</p>
                <p>Date and Time: {e.datetime}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default UpcomingEvents;
