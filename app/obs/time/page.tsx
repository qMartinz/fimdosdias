import RealTimeTime from './RealtimeTime';
import './hud.css';

async function getScene() {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/scenes/records/000000000000000`, { cache: 'no-store' });
  const data = await res.json();
  return data;
}

export default async function OBS() {
    const scene = await getScene();

    return (
        <div className='hud'>
            <RealTimeTime scene={scene} />
        </div>
    )
}