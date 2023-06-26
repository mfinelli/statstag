<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  let edit = {
    header: false,
  };

  let newScoreLabel = '';
  let newScoreScore = 0;

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

  const updateScores = async () => {
    let scoreForm = data.scores;

    if (newScoreLabel !== '') {
      scoreForm = [
        ...scoreForm,
        { label: newScoreLabel, score: newScoreScore },
      ];
    }

    const response = await fetch('/b/' + data.slug + '/scores', {
      method: 'POST',
      body: JSON.stringify(scoreForm),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    data.scores = await response.json();

    if (newScoreLabel !== '') {
      newScoreLabel = '';
      newScoreScore = 0;
    }
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

{#each data.scores as score (score.id)}
  <p>{score['label']}: {score['score']}</p>
  <button
    on:click|preventDefault={() => {
      score['score'] += 1;
      updateScores();
    }}>+</button
  >
  <button
    on:click|preventDefault={() => {
      score['score'] -= 1;
      updateScores();
    }}>-</button
  >
{/each}

<h2>Add new score</h2>
<form on:submit|preventDefault={updateScores}>
  <input type="text" bind:value={newScoreLabel} placeholder="Label" />
  <input type="number" bind:value={newScoreScore} placeholder="0" />
  <button>Add</button>
</form>
