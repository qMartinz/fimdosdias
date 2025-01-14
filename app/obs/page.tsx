import PocketBase from 'pocketbase';
import RealTimeViewer from './RealtimeViewer';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getCharacters() {
    const result = await pb.collection('characters').getFullList();
    return result;
}

export default async function OBS() {
    const characters = await getCharacters();

    return (
        <div>
            <RealTimeViewer characters={characters} />
        </div>
    )
}