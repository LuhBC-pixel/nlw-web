import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FormCreateAd } from './Form/FormCreateAd';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('http://localhost:3000/games').then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25'>
        <Dialog.Title className='text-3xl font-black'>
          Publique um Anúcio
        </Dialog.Title>
        <FormCreateAd
          games={games || []}
          weekDays={weekDays}
          useVoiceChannel={useVoiceChannel}
          setWeekDays={setWeekDays}
          setUseVoiceChannel={setUseVoiceChannel}
        />
      </Dialog.Content>
    </Dialog.Portal>
  );
}
