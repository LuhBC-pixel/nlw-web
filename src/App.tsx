import { useEffect, useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';
import { Slider } from './components/Slider';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios('https://nlw-server-production-254a.up.railway.app/games').then(
      (response) => {
        setGames(response.data);
      }
    );
  }, []);

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='' />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu{' '}
        <span className='text-transparent bg-nlw-gradient bg-clip-text'>
          duo
        </span>{' '}
        está aqui.
      </h1>

      <Slider games={games || []} />

      <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
        <CreateAdBanner />
        <CreateAdModal setOpenModal={setOpenModal} />
      </Dialog.Root>
    </div>
  );
}

export default App;
