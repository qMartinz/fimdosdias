'use client';
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const pb = new PocketBase('http://127.0.0.1:8090');


export default function ChangeScene() {
    const router = useRouter();

    const changeScene = async (type: string) => {
        const data = {
            'type': type,
        };

        const record = await pb.collection('scenes').update('000000000000000', data);

        router.refresh();
    };

    const setFurtividade = () => {changeScene('furtividade')};
    const setTesteEstendido = () => {changeScene('testeestendido')};
    const setNenhum = () => {changeScene('nenhum')};

    return (
        <div>
            <button onClick={setFurtividade}>Furtividade</button>
            <button onClick={setTesteEstendido}>Teste Estendido</button>
            <button onClick={setNenhum}>Nenhum</button>
        </div>
    )
}