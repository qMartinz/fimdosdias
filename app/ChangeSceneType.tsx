'use client';
import { useRouter } from 'next/navigation';

export default function ChangeSceneType() {
    const router = useRouter();

    const changeSceneType = async (type: string) => {
        const data = {
            'type': type,
        };

        const res = await fetch(`http://127.0.0.1:8090/api/collections/scenes/records/000000000000000`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

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