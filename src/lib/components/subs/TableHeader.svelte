<script lang="ts">
  import Icon from '@iconify/svelte'

  export let icon: string
  export let centered: boolean = false
  export let name: string | null = null
</script>

<th class="px-1">
  <div class="flex gap-1 items-center" class:justify-center={centered}>
    <Icon {icon} class="text-2xl" />
    {#if name}
      <span>{name}</span>
    {/if}
  </div>
</th>
