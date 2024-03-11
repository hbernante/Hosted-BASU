import React, { useEffect } from "react";
import PageComponent from "../components/PageComponent";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default function ServiceStart() {
  useEffect(() => {
    const options = {
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      encrypted: true,
      // Other options...
    };

    window.Echo = new Echo({
      ...options,
      client: new Pusher(options.key, options),
    });

    window.Echo.channel("drivers").listen("TripCreated", (e) => {
      console.log("TripStarted", e);
    });
  }, []);

  return (
    <PageComponent>
      Hello World
    </PageComponent>
  );
}
