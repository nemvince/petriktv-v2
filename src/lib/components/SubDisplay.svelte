<script lang="ts">
  import Icon from '@iconify/svelte'
  import TableHeader from '$lib/components/TableHeader.svelte'

  export let subs
  let totalPages = 0
  if (subs.length > 0) {
    totalPages = subs[0].totalPages
  }
  let selectedPage = 1
  setInterval(() => {
    if (selectedPage < totalPages) {
      selectedPage++
    } else {
      selectedPage = 1
    }
  }, 10000)
</script>

{#if subs.length > 0}
  <div class="flex justify-between flex-col h-full">
    <table class="text-2xl table-auto">
      <tr>
        <TableHeader icon="material-symbols-light:nest-clock-farsight-analog" centered={true} />
        <TableHeader icon="material-symbols-light:person-off" name="Tanár" />
        <TableHeader icon="material-symbols-light:person" name="Helyettesítő" />
        <TableHeader icon="material-symbols-light:meeting-room" name="Terem" />
        <TableHeader icon="material-symbols-light:group" name="Osztály" centered={true} />
        <TableHeader icon="material-symbols-light:cell-merge-rounded" name="ÖVH" centered={true} />
      </tr>
      {#each subs as chunk}
        {#if selectedPage == chunk.page}
          <tbody>
            {#each chunk.data as sub}
              <tr class="items-center border-t">
                <td class="font-bold text-center">{sub.ora}.</td>
                <td>{sub.tname}</td>
                <td>{sub.helytan}</td>
                <td>{sub.terem}</td>
                <td class="text-center">{sub.class}</td>
                <td
                  >{#if sub.ovh == '0'}
                    <div class="mt-1 text-xl justify-center items-center flex">
                      <Icon icon="mdi:check-bold" />
                    </div>
                  {/if}</td
                >
              </tr>
            {/each}
          </tbody>
        {/if}
      {/each}
    </table>
    {#each subs as chunk}
      {#if selectedPage == chunk.page}
        <span class="text-center text-2xl">
          {chunk.page}/{chunk.totalPages}
        </span>
      {/if}
    {/each}
  </div>
{:else}
  <div class="flex flex-col justify-center items-center h-full">
    <Icon icon="mdi:smiley" class="text-7xl" />
    <p class="text-center text-4xl font-semibold">Ma nincs helyettesítés!</p>
  </div>
{/if}
