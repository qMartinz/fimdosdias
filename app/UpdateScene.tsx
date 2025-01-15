'use client';
import { useRouter } from 'next/navigation';

export default function UpdateSceneTypes({ scene }: any) {
    const router = useRouter();

    const increaseTime = async () => {
        const day = scene.day + (scene.time == 7 ? 1 : 0);
        const time = scene.time == 7 ? 0 : scene.time + 1;
        const type = scene.type;

        const res = await fetch(`http://127.0.0.1:8090/api/collections/scenes/records/${scene.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                day,
                time,
                type
            })
        });

        router.refresh();
    }

    const decreaseTime = async () => {
        const day = scene.day == 1 ? 1 : (scene.day - (scene.time == 0 ? 1 : 0));
        const time = scene.time == 0 ? 7 : scene.time - 1;
        const type = scene.type;

        const res = await fetch(`http://127.0.0.1:8090/api/collections/scenes/records/${scene.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                day,
                time,
                type
            })
        });

        router.refresh();
    }

    const resetTime = async () => {
        const day = 1;
        const time = 0;
        const type = scene.type;

        const res = await fetch(`http://127.0.0.1:8090/api/collections/scenes/records/${scene.id}`, {
            method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
            body: JSON.stringify({
                day,
                time,
                type
            })
        });

        router.refresh();
    }

    return (
        <div className='updateSceneButtons'>
            <button className='mudar' onClick={decreaseTime}>-</button>
            <button className='limpar' onClick={resetTime}>Resetar</button>
            <button className='mudar' onClick={increaseTime}>+</button>
        </div>
    )
}