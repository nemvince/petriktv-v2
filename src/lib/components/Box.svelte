<script lang="ts">
  let className = ''
  export { className as class }
</script>

<div class="rounded-xl p-2 bg-emerald-600 bg-opacity-60 justify-between shadow-xl {className}">
  <slot />
</div>
