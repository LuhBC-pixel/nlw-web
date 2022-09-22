import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FormCreateAd } from './Form/FormCreateAd';

interface Game {
  id: string;
  title: string;
}

export interface IFormInputs {
  game: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  hourStart: string;
  hourEnd: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>();
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    axios('https://nlw-server-production-254a.up.railway.app/games').then(
      (response) => {
        setGames(response.data);
      }
    );
  }, []);

  async function handleCreatAd(data: any) {
    try {
      const response = await axios.post(
        `https://nlw-server-production-254a.up.railway.app/games/${data.game}/ads`,
        {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays.map(Number),
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          useVoiceChannel: useVoiceChannel,
        }
      );

      toast('Anúncio criado com sucesso!');
    } catch (err) {
      toast.error('Erro ao criar anúncio!');
    }
  }

  return (
    <>
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
            handleCreatAd={handleCreatAd}
          />
        </Dialog.Content>
      </Dialog.Portal>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
