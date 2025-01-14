import PocketBase from 'pocketbase';
import RealTimeStats from './RealtimeStats';
import './hud.css';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getCharacters() {
    const result = await pb.collection('characters').getFullList();
    return result;
}

async function getScene() {
    const result = await pb.collection('scenes').getOne('000000000000000');
    return result;
}

export default async function Stats() {
    const characters = await getCharacters();
    const scene = await getScene();

    console.log(scene);

    if (scene.type != 'nenhum') return (
        <div className='hud'>
            <RealTimeStats characters={characters} scene={scene} />
        </div>
    )
}