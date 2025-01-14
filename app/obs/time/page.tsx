import PocketBase from 'pocketbase';
import RealTimeTime from './RealtimeTime';
import './hud.css';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getScene() {
    const result = await pb.collection('scenes').getOne('000000000000000');
    return result;
}

export default async function OBS() {
    const scene = await getScene();

    return (
        <div className='hud'>
            <RealTimeTime scene={scene} />
        </div>
    )
}