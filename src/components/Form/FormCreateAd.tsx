import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Check, GameController } from 'phosphor-react';

import '../../styles/input.css';
import { WeekDays } from './WeekDays';
import { IFormInputs } from '../CreateAdModal';

interface Game {
  id: string;
  title: string;
}

interface Props {
  games: Game[];
  weekDays: string[];
  useVoiceChannel: boolean;
  setWeekDays: (weekDays: string[]) => void;
  setUseVoiceChannel: (value: boolean) => void;
  handleCreatAd: (data: IFormInputs) => void;
}

const schema = yup.object({
  game: yup.string().required('Selecione um jogo'),
  name: yup.string().required('Nome é obrigatório'),
  yearsPlaying: yup.number().required('Anos de experiência é obrigatório'),
  discord: yup.string().required('Discord é obrigatório'),
  hourStart: yup.string().required('Horário de início é obrigatório'),
  hourEnd: yup.string().required('Horário de término é obrigatório'),
});

export function FormCreateAd({
  games,
  weekDays,
  useVoiceChannel,
  setWeekDays,
  setUseVoiceChannel,
  handleCreatAd,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  return (
    <>
      <form
        onSubmit={handleSubmit(handleCreatAd)}
        className='mt-8 flex flex-col gap-4'
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='game' className='font-semibold'>
            Qual o game?
          </label>
          <select
            id='game'
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
            defaultValue=''
            {...register('game')}
          >
            <option disabled selected value=''>
              Selecione o game que deseja jogar
            </option>
            {games?.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
          <p className='text-red-500 text-sm'>{errors.game?.message}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='font-semibold'>
            Seu nome (ou nickname)
          </label>
          <input
            type='text'
            id='name'
            placeholder='Como te chamam dentro do game?'
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
            {...register('name')}
          />
          <p className='text-red-500 text-sm'>{errors.name?.message}</p>
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label htmlFor='yearsPlaying' className='font-semibold'>
              Joga há quantos anos?
            </label>
            <input
              type='number'
              id='yearsPlaying'
              placeholder='Tudo bem ser ZERO'
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
              {...register('yearsPlaying')}
            />
            <p className='text-red-500 text-sm'>
              {errors.yearsPlaying?.message}
            </p>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='discord' className='font-semibold'>
              Qual seu Discord?
            </label>
            <input
              type='text'
              id='discord'
              placeholder='Usuario#0000'
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
              {...register('discord')}
            />
            <p className='text-red-500 text-sm'>{errors.discord?.message}</p>
          </div>
        </div>

        <div className='flex gap-6'>
          <WeekDays weekDays={weekDays} setWeekDays={setWeekDays} />

          <div className='flex flex-col gap-2 flex-1'>
            <label htmlFor='hourStart' className='font-semibold'>
              Qual horário do dia?
            </label>
            <div className='grid grid-cols-2 gap-2'>
              <input
                id='hourStart'
                type='time'
                placeholder='De'
                defaultValue=''
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                {...register('hourStart')}
              />
              <input
                id='hourEnd'
                type='time'
                placeholder='Até'
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
                {...register('hourEnd')}
              />
            </div>
            <p className='text-red-500 text-sm'>
              {errors.hourStart?.message || errors.hourEnd?.message}
            </p>
          </div>
        </div>

        <label className='mt-2 flex items-center gap-2 text-sm'>
          <Checkbox.Root
            onCheckedChange={(checked) => {
              if (checked === true) {
                setUseVoiceChannel(true);
              } else {
                setUseVoiceChannel(false);
              }
            }}
            checked={useVoiceChannel}
            className='w-6 h-6 p-1 rounded bg-zinc-900'
          >
            <Checkbox.Indicator>
              <Check className='w-4 h-4 text-emerald-400' />
            </Checkbox.Indicator>
          </Checkbox.Root>
          Constumo me conectar ao chat de voz
        </label>

        <footer className='mt-4 flex justify-end gap-4'>
          <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
            Cancelar
          </Dialog.Close>
          <button
            type='submit'
            className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
          >
            <GameController size={24} />
            Encontrar duo
          </button>
        </footer>
      </form>
    </>
  );
}
