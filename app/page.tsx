import PocketBase from 'pocketbase';
import UpdateStat from "./UpdateStat";

const pb = new PocketBase('http://127.0.0.1:8090');

async function getCharacters() {
  const result = await pb.collection('characters').getFullList();
  return result;
}

export default async function Home() {
  const characters = await getCharacters();

  return (
    <div>
      <div>
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
    <div>
      <div>
        <h2>{name}</h2>
        <div>
          <p>Visibilidade: {visibility}</p>
          <UpdateStat character={character} stat='visibility' />
        </div>
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
  )
}
