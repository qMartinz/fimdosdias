'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('http://127.0.0.1:8090');

export default function ChangeSceneType() {
    const router = useRouter();

    const changeSceneType = async (type: string) => {
        const data = {
            'type': type,
        };

        const record = await pb.collection('scenes').update('000000000000000', data);

        router.refresh();
    };

    const setFurtividade = () => {changeSceneType('furtividade')};
    const setTesteEstendido = () => {changeSceneType('testeestendido')};
    const setNenhum = () => {changeSceneType('nenhum')};

    return (
        <div className='changeSceneButtons'>
            <button onClick={setFurtividade}>Furtividade</button>
            <button onClick={setTesteEstendido}>Teste Estendido</button>
            <button onClick={setNenhum}>Nenhum</button>
        </div>
    )
}