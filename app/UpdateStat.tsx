'use client';
import { useRouter } from 'next/navigation';

export default function UpdateStat({ character, stat }: { character: any; stat: string }) {
    const router = useRouter();

    const add = async (amount: number) => {
        
        const res = await fetch(`http://127.0.0.1:8090/api/collections/characters/records/${character.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                [stat]: character[stat] + amount
            })
        });

        router.refresh();
    };

    const increase = () => {add(1)};
    const decrease = () => {add(-1)};

    const clear = async () => {
        const data = {
            [stat]: 0,
        };

        const res = await fetch(`http://127.0.0.1:8090/api/collections/characters/records/${character.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

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