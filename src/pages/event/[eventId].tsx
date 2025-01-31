import { useState, useEffect } from "react";
import { useLocation } from "wouter";

import { LiveBeatEvent } from "@/types/events";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Button from "@/components/Button";

import { getEventById, deleteEventById } from "@/lib/events";
import { getPreviewImageById } from "@/lib/storage";

function Event({ params }: { params: { eventId: string } }) {
  const [, navigate] = useLocation();
  const [event, setEvent] = useState<LiveBeatEvent | undefined>();

  const imageUrl = event?.imageFileId && getPreviewImageById(event.imageFileId);

  const image = {
    url: imageUrl,
    alt: "",
    height: event?.imageHeight,
    width: event?.imageWidth,
  };

  useEffect(() => {
    (async function run() {
      const { event } = await getEventById(params.eventId);
      setEvent(event);
    })();
  }, [params.eventId]);

  async function handleOnDeleteEvent() {
    if (!event?.$id) return;
    await deleteEventById(event.$id);
    navigate("/");
  }

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-12 md:grid-cols-2'>
        <div>
          {image?.url && (
            <img
              className='block rounded'
              width={image.width}
              height={image.height}
              src={String(image.url)}
              alt={image.alt}
            />
          )}
        </div>

        <div>
          {event && (
            <>
              <h1 className='mb-6 text-3xl font-bold'>{event?.name}</h1>
              <p className='text-lg font-medium text-neutral-600 dark:text-neutral-200'>
                <strong>Date:</strong>{" "}
                {event?.date &&
                  new Date(event?.date).toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              <p className='text-lg font-medium text-neutral-600 dark:text-neutral-200'>
                <strong>Location:</strong> {event?.location}
              </p>
              <p className='mt-6'>
                <Button color='red' onClick={handleOnDeleteEvent}>
                  Delete Event
                </Button>
              </p>
            </>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default Event;
