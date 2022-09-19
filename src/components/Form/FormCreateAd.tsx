import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { InputControlled } from './InputControlled';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Check, GameController } from 'phosphor-react';
import { Input } from './Input';

interface Game {
  id: string;
  title: string;
}

interface IFormInputs {
  game: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  hourStart: string;
  hourEnd: string;
}

interface Props {
  games: Game[];
  weekDays: string[];
  useVoiceChannel: boolean;
  setWeekDays: (weekDays: string[]) => void;
  setUseVoiceChannel: (value: boolean) => void;
}

const schema = yup.object({
  game: yup.string().required('Game is required'),
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
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  async function handleCreatAd(data: IFormInputs) {
    try {
      await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      });

      alert('Anúncio criado com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao criar anúncio!');
    }
  }

  return (
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
      </div>

      <InputControlled
        name='name'
        label='Seu nome (ou nickname)'
        placeholder='Como te chamam dentro do game?'
        errors={errors}
        register={register('name')}
      />

      <div className='grid grid-cols-2 gap-6'>
        <InputControlled
          type='number'
          name='yearsPlaying'
          label='Joga há quantos anos?'
          placeholder='Tudo bem ser ZERO'
          errors={errors}
          register={register('yearsPlaying')}
        />

        <InputControlled
          name='discord'
          label='Qual seu Discord?'
          placeholder='Usuario#0000'
          errors={errors}
          register={register('discord')}
        />
      </div>

      <div className='flex gap-6'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='weekDays' className='font-semibold'>
            Quando costuma jogar?
          </label>

          <ToggleGroup.Root
            type='multiple'
            className='grid grid-cols-4 gap-2'
            value={weekDays}
            onValueChange={setWeekDays}
          >
            <ToggleGroup.Item
              value='0'
              title='Domingo'
              className={`w-8 h-8 rounded ${
                weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              D
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value='1'
              title='Segunda'
              className={`w-8 h-8 rounded ${
                weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value='2'
              title='Terça'
              className={`w-8 h-8 rounded ${
                weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              T
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value='3'
              title='Quarta'
              className={`w-8 h-8 rounded ${
                weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value='4'
              title='Quinta'
              className={`w-8 h-8 rounded ${
                weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              Q
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value='5'
              title='Sexta'
              className={`w-8 h-8 rounded ${
                weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              S
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value='6'
              title='Sábado'
              className={`w-8 h-8 rounded ${
                weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
              }`}
            >
              S
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div className='flex flex-col gap-2 flex-1'>
          <label htmlFor='hourStart' className='font-semibold'>
            Qual horário do dia?
          </label>
          <div className='grid grid-cols-2 gap-2'>
            <Input
              id='hourStart'
              type='time'
              placeholder='De'
              {...register('hourStart')}
            />
            <Input
              id='hourEnd'
              type='time'
              placeholder='Até'
              {...register('hourEnd')}
            />
          </div>
          <p>{errors.hourStart?.message || errors.hourEnd?.message}</p>
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
  );
}
