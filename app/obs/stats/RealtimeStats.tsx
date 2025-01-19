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
                <div className='total'>
                    {scene.type == 'furtividade' ? <p><Image src={`/visibilidade.png`} alt={'Visibilidade: '} width="30" height="30" /> <span>{
                        SumStat(characters.map((character: { visibility: number; }) => character.visibility))}</span></p> :
                        <div className='testes'>
                            <p><Image src={`/sucesso.png`} alt={'Sucessos: '} width="30" height="30" /> {
                                SumStat(characters.map((character: { success: number; }) => character.success))
                            }</p>
                            <p><Image src={`/falha.png`} alt={'Falhas: '} width="30" height="30" /> {
                                SumStat(characters.map((character: { failure: number; }) => character.failure))
                            }</p>
                        </div>}
                </div>
                {characters?.filter((character: { visible: boolean; }) => character.visible).map((character: { id: any; }) => {
                    return <Character key={character.id} character={character} showVisibility={scene.type == 'furtividade'} />;
                })}
            </div>
        </div>
    )
}

function SumStat(stats: any) {
    if (stats.length <= 0) return 0;

    return stats.reduce((previous: any, current: any) => {
        return previous + current;
    });
}

function Character({ character, showVisibility }: any) {
    const { id, name, visibility, success, failure } = character || {};

    return (
        <div className='info'>
            <h2>{name}</h2>
            <div>
                {showVisibility ? <p><Image src={`/visibilidade.png`} alt={'Visibilidade: '} width="20" height="20" /> <span>{visibility}</span></p> :
                    <div className='testes'>
                        <p><Image src={`/sucesso.png`} alt={'Sucessos: '} width="20" height="20" /> {success}</p>
                        <p><Image src={`/falha.png`} alt={'Falhas: '} width="20" height="20" /> {failure}</p>
                    </div>}
            </div>
        </div>
    )
}