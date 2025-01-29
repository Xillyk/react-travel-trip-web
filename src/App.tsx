import { useEffect, useState } from "react";
import { ITrip } from "./types";

import data from "./mock.json";

function App() {
  const [trips, setTrips] = useState<ITrip[]>([]);

  useEffect(() => {
    setTrips(data.trips as ITrip[]);
  }, []);

  const TripCard = () => {
    return trips.map((trip) => (
      <div className="mb-4">
        <h2 className="text-xl font-bold">{trip.title}</h2>
        <span className="text-gray-600">{trip.description}</span>
        <span className="text-blue-400 underline cursor-pointer">อ่านต่อ</span>

        {/* main image */}
        <img src={trip.photos[0]} alt="main image" width={200} height={400} />

        {/* tags */}
        {trip.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">หมวด</span>
            {trip.tags.map((tag) => (
              <span className="text-gray-500 underline">{tag}</span>
            ))}
          </div>
        )}

        {/* other images */}
        {trip.photos.length > 1 && (
          <div className="flex items-center gap-4">
            {trip.photos.map((photo) => (
              <img
                src={photo}
                alt="image"
                width={200}
                height={200}
                className="rounded-3xl shadow-sm"
              />
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-[48px] font-bold text-blue-400">เที่ยวไหนดี</h1>

        <input type="text" placeholder="หาที่เที่ยวแล้วไปกัน..." />
      </div>

      {/* divider */}
      <div className="border-t-1 border-gray-200 w-full" />

      {/* Content */}
      <div>
        <TripCard />
      </div>

      {/* Footer */}
      <div></div>
    </div>
  );
}

export default App;
