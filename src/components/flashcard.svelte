<script lang="ts">
  let flipped = false;

  const flip = () => {
    flipped = !flipped;
  }

  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      flip();
    }
  }

</script>

<div role="button" tabindex="0" class="flip-card" on:keydown={onKeyDown} class:flipped-card={flipped} on:click={flip}>
  <div class="flip-card-inner">
    <div class="flip-card-front absolute h-full w-full rounded-xl text-lg p-8 border border-primary-light dark:bg-secondary-dark bg-secondary-light dark:border-primary-dark">
      <slot name="front"/>
    </div>
    <div class="flip-card-back absolute h-full w-full rounded-xl text-lg p-8 border border-primary-light dark:bg-secondary-dark bg-secondary-light dark:border-primary-dark">
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