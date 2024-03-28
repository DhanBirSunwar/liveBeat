import { Link } from 'wouter';

import Container from '@/components/Container';
import { useAuth } from '../../hooks/use-auth';


const Nav = () => {
  const { session, logOut } = useAuth();
 
   async function handleOnLogout() {
   await logOut();
   }
  return (
    <nav>
      <Container className='py-16'>
        <p className='mb-2 text-center'>
          <Link href='/'>
            <a className='text-4xl font-bold text-slate-900 dark:text-white hover:text-slate-900 dark:hover:text-gray-100 drop-shadow-[0_2px_0px_rgba(255,255,255,1)] dark:drop-shadow-[0_2px_0px_rgba(0,0,0,1)]'>
              LiveBeat
            </a>
          </Link>
        </p>
        <div className='flex justify-center gap-4'>
          {session ? (
            <button className='font-medium hover:text-[#535bf2] cursor-pointer' onClick={handleOnLogout}>
              Log Out
            </button>
          ) : (
            <Link href='/login'>
              <a className='font-medium text-inherit'>Log In</a>
            </Link>
          )}
        </div>
      </Container>
    </nav>
  );
}

export default Nav;