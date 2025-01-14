import PocketBase from 'pocketbase';
import UpdateStat from "./UpdateStat";
import ChangeScene from './ChangeScene';
import Link from 'next/link';
import './style.css';

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
  console.log(scene);

  return (
    <div>
      <ChangeScene />
      <div className='characters'>
        {characters?.map(character => {
          return <Character key={character.id} character={character} />;
        })}
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
        <div className='furtividade'>
          <p>Visibilidade: {visibility}</p>
          <UpdateStat character={character} stat='visibility' />
        </div>
        <div className='testeestendido'>
          <div>
            <p>Successos: {success}</p>
            <UpdateStat character={character} stat='success' />
          </div>
          <div>
            <p>Falhas: {failure}</p>
            <UpdateStat character={character} stat='failure' />
          </div>
        </div>
      </div>
    </div>
  )
}