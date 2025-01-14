'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function RealTimeViewer({ characters, scene }: any) {

    if (scene.type != 'nenhum') return (
        <div className='characters'>
            {characters?.map((character: { id: any; }) => {
                return <Character key={character.id} character={character} showVisibility={scene.type == 'furtividade'} />;
            })}
        </div>
    )
}

function Character({ character, showVisibility }: any) {
    const { id, name, visibility, success, failure } = character || {};
    
    const router = useRouter();
    
    pb.collection('characters').subscribe(id, function (e) {
        router.refresh();
    }, {});

    pb.collection('scenes').subscribe('000000000000000', function (e) {
        router.refresh();
    }, {});

    return (
        <div className='info'>
            <h2>{name}</h2>
            <div>
                {showVisibility ? <p><Image src={`/eye.svg`} alt={'olho'} width="25" height="25" /> <span>{visibility}</span></p> : 
                <div className='testes'>
                <p><Image src={`/success.svg`} alt={'sucesso'} width="25" height="25" /> {success}</p>
                <p><Image src={`/failure.svg`} alt={'falha'} width="25" height="25" /> {failure}</p>
                </div>}
            </div>
        </div>
    )
}