'use client';
import { useRouter } from 'next/navigation';

export default function UpdateStat({ character }: any) {
    const router = useRouter();

    const change = async (visible: boolean) => {
        
        const res = await fetch(`http://127.0.0.1:8090/api/collections/characters/records/${character.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'visible': visible
            })
        });

        router.refresh();
    }

    return (
        <input type="checkbox" className='visible' defaultChecked={character.visible} onChange={(e) => {change(e.target.checked)}} />
    )
}