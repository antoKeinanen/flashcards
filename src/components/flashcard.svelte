<script lang="ts">
  let flipped = false;

  const flip = () => {
    flipped = !flipped;
  }

</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flip-card" class:flipped-card={flipped} on:click={flip}>
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <slot name="front"/>
    </div>
    <div class="flip-card-back">
      <slot name="back"/>
    </div>
  </div>
</div>


<style> 
  .flip-card {
    background-color: transparent;
    width: 65%;
    height: 65%;
    perspective: 1000px;
  }

  .flip-card:hover {
    cursor: pointer;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .flipped-card .flip-card-inner {
    transform: rotateX(-180deg);
  }
  
  .flip-card-front, .flip-card-back {
    @apply bg-stone-900 rounded-xl text-lg p-8 border border-stone-700;
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  .flip-card-back {
    transform: rotateX(180deg);
  }
  </style>