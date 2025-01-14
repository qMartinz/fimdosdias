'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function UpdateSceneTypes({ scene }: any) {
    const router = useRouter();

    const increaseTime = async () => {
        const data = {
            'day': scene.day + (scene.time == 7 ? 1 : 0),
            'time': scene.time == 7 ? 0 : scene.time + 1
        };

        const record = await pb.collection('scenes').update('000000000000000', data);

        router.refresh();
    }

    const decreaseTime = async () => {
        const data = {
            'day': scene.day == 1 ? 1 : (scene.day - (scene.time == 0 ? 1 : 0)),
            'time': scene.time == 0 ? 7 : scene.time - 1
        };

        const record = await pb.collection('scenes').update('000000000000000', data);

        router.refresh();
    }

    const resetTime = async () => {
        const data = {
            'day': 1,
            'time': 0
        };

        const record = await pb.collection('scenes').update('000000000000000', data);

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