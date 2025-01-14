import PocketBase from 'pocketbase';
import UpdateStat from "./UpdateStat";
import ChangeSceneType from './ChangeSceneType';
import Link from 'next/link';
import './style.css';
import ClearStats from './ClearStats';
import UpdateSceneTypes from './UpdateScene';

const pb = new PocketBase('http://127.0.0.1:8090');

async function getCharacters() {
  const result = await pb.collection('characters').getFullList();
  return result;
}

async function getScene() {
  const result = await pb.collection('scenes').getOne('000000000000000');
  return result;
}

export default async function Home() {
  const characters = await getCharacters();
  const scene = await getScene();

  return (
    <div>
      <ChangeSceneType />
      <ClearStats characters={characters} />
      <div className='characters'>
        {characters?.map(character => {
          return <Character key={character.id} character={character} />;
        })}
      </div>
      <div className='scene'>
        <div className='sceneInfo'>
          <p>Dia: {scene.day}</p>
          <p>Horário: {scene.time}</p>
        </div>
        <UpdateSceneTypes scene={scene} />
      </div>
    </div>
  );
}

function Character({ character }: any) {
  const { id, name, visibility, success, failure } = character || {};

  return (
    <div className='character'>
      <h2>{name}</h2>
      <div className='info'>
        <div className='furtividade stat'>
          <p>Visibilidade: {visibility}</p>
          <UpdateStat character={character} stat='visibility' />
        </div>
        <div className='testeestendido'>
          <div className='stat'>
            <p>Successos: {success}</p>
            <UpdateStat character={character} stat='success' />
          </div>
          <div className='stat'>
            <p>Falhas: {failure}</p>
            <UpdateStat character={character} stat='failure' />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: {
      
    }
  }
}