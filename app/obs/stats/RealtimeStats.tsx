'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function RealTimeViewer({ characters, scene }: any) {
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            router.refresh();
        }, 500);

        return () => clearInterval(timer);
    }, [router]);

    if (scene.type != 'nenhum') return (
        <div className='hud'>
            <div className='characters'>
                {characters?.map((character: { id: any; }) => {
                    return <Character key={character.id} character={character} showVisibility={scene.type == 'furtividade'} />;
                })}
            </div>
        </div>
    )
}

function Character({ character, showVisibility }: any) {
    const { id, name, visibility, success, failure } = character || {};

    return (
        <div className='info'>
            <h2>{name}</h2>
            <div>
                {showVisibility ? <p><Image src={`/visibilidade.png`} alt={'Visibilidade: '} width="25" height="25" /> <span>{visibility}</span></p> :
                    <div className='testes'>
                        <p><Image src={`/sucesso.png`} alt={'Sucessos: '} width="25" height="25" /> {success}</p>
                        <p><Image src={`/falha.png`} alt={'Falhas: '} width="25" height="25" /> {failure}</p>
                    </div>}
            </div>
        </div>
    )
}