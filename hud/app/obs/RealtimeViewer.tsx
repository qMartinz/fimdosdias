'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function RealTimeViewer({ id, characters }: any) {
    return (
        <div>
            {characters?.map((character: { id: any; }) => {
                return <Character key={character.id} character={character} />;
            })}
        </div>
    )
}

function Character({ character }: any) {
    const { id, name, visibility, success, failure } = character || {};
    
    const router = useRouter();
    
    pb.collection('characters').subscribe(id, function (e) {
        router.refresh();
    }, {});

    return (
        <div>
            <h2>{name}</h2>
            <div>
                <p>Visibilidade: {visibility}</p>
            </div>
            <div>
                <p>Successos: {success}</p>
            </div>
            <div>
                <p>Falhas: {failure}</p>
            </div>
        </div>
    )
}