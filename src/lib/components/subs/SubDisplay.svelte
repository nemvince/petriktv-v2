<script lang="ts">
  import Icon from '@iconify/svelte'
  import TableHeader from '$lib/components/subs/TableHeader.svelte'

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

  function getFirstTwoNames(fullName: string): string {
    const nameParts = fullName.trim().split(/\s+/);

    if (nameParts[0] === "Dr.") {
      return nameParts.slice(0, 2).join(' ');
    }

    // if names contains "né", return everything after the part containing "né"
    if (fullName.includes("né")) {
        const nameParts = fullName.trim().split(/\s+/);
        const nIdx = nameParts.findIndex(part => part.includes("né"));
        return nameParts.slice(nIdx + 1).join(' ');
    }

    if (nameParts.length === 4) {
      return nameParts.slice(1, 3).join(' ');
    }

    return nameParts.slice(0, 2).join(' ');
  }
</script>

{#if subs.length > 0}
  <div class="flex justify-between flex-col h-full">
    <table class="text-2xl table-auto">
      <tr>
        <TableHeader icon="material-symbols-light:nest-clock-farsight-analog" centered />
        <TableHeader icon="material-symbols-light:person-off" name="Tanár" />
        <TableHeader icon="material-symbols-light:person" name="Helyettesítő" />
        <TableHeader icon="material-symbols-light:meeting-room" name="Terem" />
        <TableHeader icon="material-symbols-light:group" name="Osztály" />
        <TableHeader icon="material-symbols-light:cell-merge-rounded" name="ÖVH" centered />
      </tr>
      {#each subs as chunk}
        {#if selectedPage == chunk.page}
          <tbody>
            {#each chunk.data as sub}
              <tr class="items-center border-t">
                <td class="font-bold text-center">{sub.ora}.</td>
                <td>{getFirstTwoNames(sub.tname)}</td>
                <td>{getFirstTwoNames(sub.helytan)}</td>
                <td>{sub.terem.replace(/\s-\s.*$/, "").replace(/\./g, "")}</td>
                <td class="">{sub.class}</td>
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
