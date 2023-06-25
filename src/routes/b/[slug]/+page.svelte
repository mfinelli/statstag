<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let edit = {
    header: false,
  };

  let newHeader = data.name;

  const update = async () => {
    const response = await fetch('/b/' + data.slug + '/edit', {
      method: 'POST',
      body: JSON.stringify({ id: data.id, name: newHeader }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { name } = await response.json();

    if (name !== '') {
      data.name = name;
    }

    edit.header = false;
  };
</script>

{#if edit.header}
  <input
    id="name"
    type="text"
    placeholder={data.name}
    bind:value={newHeader}
    on:change={update}
    required
  />
  <button
    on:click|preventDefault={() => {
      edit.header = false;
    }}>cancel</button
  >
{:else}
  <h1>
    {data.name}
    <button
      on:click|preventDefault={() => {
        edit.header = true;
      }}>edit</button
    >
  </h1>
{/if}

{#each data.scores as score}
  <p>{score['label']}: {score['score']}</p>
  <button>+</button>
  <button>-</button>
{/each}
