import * as React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { GameBanner } from './GameBanner';
import 'keen-slider/keen-slider.min.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function Slider({ games }: { games: Game[] }) {
  const [sliderRef, internalSlider] = useKeenSlider<HTMLDivElement>(
    {
      slides: {
        perView: 4,
        spacing: 20,
      },
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ]
  );

  React.useEffect(() => {
    internalSlider.current?.update({});
  }, [internalSlider, games]);

  return (
    <div ref={sliderRef} className='flex w-full ml-auto mt-16 keen-slider'>
      {games?.map((game) => {
        return (
          <div key={game.id} className='flex w-full ml-auto'>
            <div className='overflow-hidden keen-slider__slide'>
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
