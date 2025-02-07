import { useCallback, useEffect, useState } from "react";
import { getTripData } from "./services/tripService";
import { ITrip } from "./types";

function App() {
  const [trips, setTrips] = useState<ITrip[]>([]);

  const getQueryParam = () => {
    console.log(33);
    const params = new URLSearchParams(window.location.search);
    return params.get("keyword")
      ? decodeURIComponent(params.get("keyword") ?? "")
      : "";
  };

  const [search, setSearch] = useState<string>(getQueryParam());

  const fetchData = useCallback(async () => {
    const response = await getTripData(search);
    console.log("🚀 ~ fetchData ~ response:", response);
    setTrips(response.trips as ITrip[]);
  }, [search]);

  useEffect(() => {
    console.log("x", search);

    if (search) {
      window.history.pushState(null, "", `/?keyword=${search}`);
      console.log("🚀 1", search);
    } else {
      window.history.pushState(null, "", window.location.pathname);
      console.log("🚀 2", search);
    }
    fetchData();
  }, [fetchData, search]);

  const TripCard = () => {
    return trips.map((trip) => (
      <div className="mb-4" key={trip.eid}>
        <h2 className="text-xl font-bold">{trip.title}</h2>
        <span className="text-gray-600 line-clamp-3">{trip.description}</span>
        <span className="text-blue-400 underline cursor-pointer">อ่านต่อ</span>

        {/* main image */}
        <img src={trip.photos[0]} alt="main image" width={200} height={400} />

        {/* tags */}
        {trip.tags.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">หมวด</span>
            {trip.tags.map((tag, index) => (
              <span
                key={index}
                className="text-gray-500 underline text-nowrap text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* other images */}
        {trip.photos.length > 1 && (
          <div className="sm:flex items-center gap-4 flex-wrap hidden">
            {trip.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt="image"
                width={100}
                height={100}
                className="rounded-3xl shadow-sm"
              />
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full bg-red-200 h-full flex flex-col items-center px-20">
      {/* Header */}
      <div className="my-4">
        <h1 className="text-[48px] font-bold text-blue-400">เที่ยวไหนดี</h1>

        <input
          defaultValue={search}
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log((e.target as HTMLInputElement).value);
              setSearch((e.target as HTMLInputElement).value);
            }
          }}
          // onChange={(e) => {
          //   setSearch((e.target as HTMLInputElement).value);
          // }}
        />
      </div>

      {/* divider */}
      <div className="border-t-1 border-gray-200 w-full my-4" />

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
