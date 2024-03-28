import { useEffect, useState } from "react";
import { Link } from "wouter";

import { getEvents } from "@/lib/events";
import { getPreviewImageById } from "@/lib/storage";
import { LiveBeatEvent } from "@/types/events";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import EventCard from "@/components/EventCard";

function Home() {
  const [events, setEvents] = useState<Array<LiveBeatEvent> | undefined>();
  useEffect(() => {
    (async function run() {
      const { events } = await getEvents();
      setEvents(events);
    })();
  }, []);
  return (
    <Layout>
      {Array.isArray(events) && events.length > 0 && (
        <>
          <Container className='flex items-center justify-between mb-10'>
            <h1 className='text-lg font-bold uppercase text-slate-600 dark:text-slate-200'>
              Upcoming Events
            </h1>
            <p>
              <Link href='/events/new'>
                <a className='inline-block rounded bg-slate-600 py-1.5 px-4 text-xs font-bold uppercase text-white hover:bg-slate-500 hover:text-white'>
                  Add Event
                </a>
              </Link>
            </p>
          </Container>

          <Container>
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
              {events.map((event) => {
                const imageUrl =
                  event?.imageFileId && getPreviewImageById(event.imageFileId);
                return (
                  <Link key={event.name} href={`/event/${event.$id}`}>
                    <a>
                      <EventCard
                        date={event.date}
                        image={
                          imageUrl && {
                            alt: "",
                            height: event.imageHeight,
                            url: imageUrl,
                            width: event.imageWidth,
                          }
                        }
                        location={event.location}
                        name={event.name}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          </Container>
        </>
      )}
      {Array.isArray(events) && events.length === 0 && (
        <Container>
          <p className='mb-5 text-center w-100'>
            No events currently scheduled.
          </p>
          <p className='text-center w-100'>
            <Link href='/events/new'>
              <a>Add an Event</a>
            </Link>
          </p>
        </Container>
      )}
    </Layout>
  );
}

export default Home;
