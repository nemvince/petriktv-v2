<script lang="ts">
  import { json } from '@sveltejs/kit'

  export let news: any

  const shouldWeMarquee = (news: [{ alert: string; day: string }]) => {
    if (news.length > 1) return true
    return news.some((alert) => alert.alert.length > 200)
  }
</script>

<footer
  class="rounded-xl text-2xl p-2 px-3 bg-emerald-600 bg-opacity-50 justify-between shadow-xl flex items-center"
>
  <!-- ha deprecated mi a gecimért létezik bazdmeg -->
  <!-- svelte-ignore a11y-distracting-elements -->
  {#if shouldWeMarquee(news)}
    <marquee scrollamount="15">
      <div class="flex flex-row gap-16">
        {#if news.length > 1}
          {#each news as alert}
            <span>{alert.alert}</span>
          {/each}
        {:else}
          <span>{news[0].alert}</span>
        {/if}
      </div>
    </marquee>
  {:else}
    <span class="text-center w-full">{news[0].alert}</span>
  {/if}
</footer>
