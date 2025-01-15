'use client';
import { useRouter } from 'next/navigation';

export default function ClearStats({ characters }: any) {
    const router = useRouter();

    const clear = async () => {
        const data = {
            'visibility': 0,
            'success': 0,
            'failure': 0,
        };

        const res = await fetch(`http://127.0.0.1:8090/api/batch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(characters.map((character: { id: string; }) => {
                return fetch(`http://127.0.0.1:8090/api/collections/characters/records/${character.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
            }))
        });

        router.refresh();
    };

    return (
        <button className='limparTodos' onClick={clear}>Limpar</button>
    )
}