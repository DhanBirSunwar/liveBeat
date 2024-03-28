import { useState } from "react";
import { useLocation } from "wouter";

import { createEvent } from "@/lib/events";
import { uploadFile } from "@/lib/storage";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import InputDate from "@/components/InputDate";
import InputFile from "@/components/InputFile";
import Button from "@/components/Button";

interface LiveBeatImage {
  height: number;
  file: File;
  width: number;
}

function EventNew() {
  const [, navigate] = useLocation();
  const [error] = useState<string>();
  const [image, setImage] = useState<LiveBeatImage>();

  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement & {
      files: FileList;
    };

    const img = new Image();

    img.onload = function () {
      setImage({
        height: img.height,
        file: target.files[0],
        width: img.width,
      });
    };

    img.src = URL.createObjectURL(target.files[0]);
  }

  /**
   * handleOnSubmit
   */

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      location: { value: string };
      date: { value: string };
    };

    let file;

    if (image?.file) {
      file = await uploadFile(image.file);
    }

    const results = await createEvent({
      name: target.name.value,
      location: target.location.value,
      date: new Date(target.date.value).toISOString(),
      imageFileId: file?.$id,
      imageHeight: image?.height,
      imageWidth: image?.width,
    });

    navigate(`/event/${results.event.$id}`);
  }

  return (
    <Layout>
      <Container className='grid grid-cols-1 gap-12 md:grid-cols-2'>
        <div>
          <h1 className='mb-6 text-3xl font-bold'>Create a New Event</h1>
          <p className='mb-4'>
            Creating an event on LiveBeat is a surefire way to elevate your
            event's success to unprecedented heights. From concerts to
            festivals, LiveBeat caters to all event types, making it the ideal
            stage to capture the attention of your target audience.
          </p>
          <p>
            Focus on what matters most—delivering an unforgettable
            experience—and witness your event gain momentum like never before on
            LiveBeat.
          </p>
        </div>

        <form
          className='p-6 border rounded border-slate-200 dark:border-slate-500'
          onSubmit={handleOnSubmit}
        >
          <FormRow className='mb-5'>
            <FormLabel htmlFor='name'>Event Name</FormLabel>
            <InputText id='name' name='name' type='text' required />
          </FormRow>

          <FormRow className='mb-5'>
            <FormLabel htmlFor='date'>Event Date</FormLabel>
            <InputDate id='date' name='date' type='datetime-local' required />
          </FormRow>

          <FormRow className='mb-5'>
            <FormLabel htmlFor='location'>Event Location</FormLabel>
            <InputText id='location' name='location' type='text' required />
          </FormRow>

          <FormRow className='mb-6'>
            <FormLabel htmlFor='image'>File</FormLabel>
            <InputFile id='image' name='image' onChange={handleOnChange} />
            <p className='mt-2 text-sm'>Accepted File Types: jpg, png</p>
          </FormRow>

          <Button>Submit</Button>

          {error && <p className='p-4 mt-6 rounded bg-red-50'>{error}</p>}
        </form>
      </Container>
    </Layout>
  );
}

export default EventNew;
