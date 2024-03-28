import { useState } from "react";

import { logIn } from "@/lib/auth";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import FormRow from "@/components/FormRow";
import FormLabel from "@/components/FormLabel";
import InputText from "@/components/InputText";
import Button from "@/components/Button";

function LogIn() {
  const [sent, setSent] = useState(false);

  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    await logIn(target.email.value);

    setSent(true);
  }
  return (
    <Layout>
      <Container>
        <h1 className='mb-6 text-3xl font-bold text-center'>Log In</h1>
        {!sent && (
          <form
            className='max-w-xs p-6 mx-auto border rounded border-slate-200 dark:border-slate-500'
            onSubmit={handleOnSubmit}
          >
            <FormRow className='mb-5'>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <InputText id='email' name='email' type='email' />
            </FormRow>

            <Button>Submit</Button>
          </form>
        )}
        {sent && (
          <p className='text-center'>Check your email for a magic link!</p>
        )}
      </Container>
    </Layout>
  );
}

export default LogIn;
