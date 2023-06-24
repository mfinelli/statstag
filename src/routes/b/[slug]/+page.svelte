<script lang="ts">
  import type PageData from './$types';
  export let data: PageData;
</script>

<h1>{data.name} ({data.slug})</h1>
{#each data.scores as score}
  <p>{score.label}: {score.score}</p>
{/each}
