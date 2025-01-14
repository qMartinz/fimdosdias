'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function ClearStats({ characters }: any) {
    const router = useRouter();

    const clear = async () => {
        const data = {
            'visibility': 0,
            'success': 0,
            'failure': 0,
        };

        const batch = pb.createBatch();

        characters.forEach((character: { id: string; }) => {
            batch.collection('characters').update(character.id, data);
        });
        
        const record = await batch.send();

        router.refresh();
    };

    return (
        <button className='limparTodos' onClick={clear}>Limpar</button>
    )
}