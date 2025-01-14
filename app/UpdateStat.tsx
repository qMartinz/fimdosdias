'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function UpdateStat({ character, stat }: { character: any; stat: string }) {
    const router = useRouter();

    const add = async (amount: number) => {
        const data = {
            [stat]: character[stat] + amount,
        };

        const record = await pb.collection('characters').update(character.id, data);

        router.refresh();
    };

    const increase = () => {add(1)};
    const decrease = () => {add(-1)};

    const clear = async () => {
        const data = {
            [stat]: 0,
        };

        const record = await pb.collection('characters').update(character.id, data);

        router.refresh();
    };

    return (
        <div className='changeStatButtons'>
            <button className='mudar' onClick={decrease}>-</button>
            <button className='limpar' onClick={clear}>Limpar</button>
            <button className='mudar' onClick={increase}>+</button>
        </div>
    )
}