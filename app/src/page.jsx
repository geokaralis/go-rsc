import React from 'react'

async function getUsers() {
  const response = await fetch('http://localhost:8080/api/users');

  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }

  return await response.json();
}

export default async function Page() {
  const users = await getUsers();

  const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');

  if (!response.ok) {
    throw new Error('Failed to fetch data.');
  }

  const data = await response.json();

  return (
    <main>
      <h1>Pokémon</h1>
      <img src={data.sprites.front_default} alt="Pikachu" />
      <h2>{data.name}</h2>
      <p>Type: {data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      {users.map((user) => <div key={user.name}>{user.name}</div>)}
    </main>
  );
}
