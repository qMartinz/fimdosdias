import RealTimeStats from './RealtimeStats';
import './hud.css';

async function getCharacters() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/characters/records?page=1&perPage=6', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as any[];
  }
  
  async function getScene() {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/scenes/records/000000000000000`, { cache: 'no-store' });
    const data = await res.json();
    return data;
  }

export default async function Stats() {
    const characters = await getCharacters();
    const scene = await getScene();

    return (
        <div>
            <RealTimeStats characters={characters} scene={scene} />
        </div>
    )
}