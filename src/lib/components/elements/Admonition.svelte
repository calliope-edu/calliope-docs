<script >
import clsx from 'clsx';
import NoteIcon from '~icons/ri/sticky-note-fill';
import InfoIcon from '~icons/ri/information-fill';
import TipIcon from '~icons/ri/lightbulb-flash-fill';
import WarningIcon from '~icons/ri/error-warning-fill';
import DangerIcon from '~icons/ri/skull-2-fill';
import ExperimentalIcon from '~icons/ri/test-tube-fill';
export let type;
export let center = false;
export let title = null;
const icons = {
    note: NoteIcon,
    info: InfoIcon,
    tip: TipIcon,
    warning: WarningIcon,
    danger: DangerIcon,
    experimental: ExperimentalIcon,
};
const admonition = {
        note: 'HINWEIS',
        info: 'INFO',
        tip: 'TIPP',
        warning: 'VORSICHT',
        danger: 'ACHTUNG',
        experimental: 'EXPERIMENTEL',
    };
$: heading = title ?? admonition[type];
</script>

<div
  class="admonition"
  class:note={type=='note'}
  class:info={type=='info'}
  class:tip={type=='tip'}
  class:warning={type=='warning'}
  class:danger={type=='danger'}
  class:experimental={type=='experimental'}
  style={center ? 'text-align: center;' : ''}
>
  <div class="head">
    <div class="icon">
      <svelte:component this={icons[type]} />
    </div>
    <span class="text">
      {heading}
    </span>
  </div>

  <div class="pl-1 text-gray-inverse">
    <slot />
  </div>
</div>

<style lang="scss">
  .admonition {
    display: grid;
    padding: 0.5rem; 
    margin-top: 2rem;
    margin-bottom: 2rem; 
    border-radius: 0.375rem; 
    border-width: 2px; 
    border-left-width: 8px; 
    border-style: solid;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); 
    .head {
      display: flex; 
      align-items: center; 
      height: 100%; 
      font-weight: 700;
      margin-bottom: .75rem;

      .icon {
        margin-right: 0.375rem; 
        font-size: 1.25rem;
        line-height: 1.75rem;
        display: flex;
      }

      .text {
        display: flex; 
        align-items: center;
      }
    }

    &.note {
      border-color: rgb(244, 114, 182); 
      background-color: rgba(249, 168, 212, 0.1); 
      .head {
        color: rgb(244, 114, 182); 
      }
    }

    &.info {
      border-color: rgb(96, 165, 250); 
      background-color: rgba(147, 197, 253, 0.1); 
      .head {
        color: rgb(96, 165, 250); 
      }
    }

    &.tip {
      border-color: rgb(74, 222, 128); 
      background-color: rgba(134, 239, 172, 0.1); 
      .head {
        color: rgb(74, 222, 128); 
      }
    }

    &.warning {
      border-color: rgb(250, 204, 21); 
      background-color: rgba(250, 204, 21, 0.1); 
      .head {
        color: rgb(250, 204, 21); 
      }
    }

    &.danger {
      border-color: rgb(248, 113, 113); 
      background-color: rgba(252, 165, 165, 0.1); 
      .head {
        color: rgb(248, 113, 113); 
      }
    }

    &.experimental {
      border-color: rgb(129, 140, 248); 
      background-color: rgba(165, 180, 252, 0.1); 
      .head {
        color: rgb(129, 140, 248); 
      }
    }
  
  }
</style>