<script lang="ts">
  import { goto } from '$app/navigation';

  let name = '';

  const submit = async () => {
    const response = await fetch('/new', {
      method: 'POST',
      body: JSON.stringify({ name: name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { slug } = await response.json();
    goto('/b/' + slug);
  };
</script>

<h1>New Leaderboard</h1>

<form on:submit|preventDefault={submit}>
  <label for="name">Name</label>
  <input
    id="name"
    name="name"
    placeholder="name"
    type="text"
    bind:value={name}
    required
  />
  <button type="submit">Create</button>
</form>
