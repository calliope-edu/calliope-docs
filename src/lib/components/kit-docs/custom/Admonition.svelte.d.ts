import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        type: 'note' | 'info' | 'tip' | 'warning' | 'danger' | 'experimental';
        title?: string | null;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type AdmonitionProps = typeof __propDef.props;
export declare type AdmonitionEvents = typeof __propDef.events;
export declare type AdmonitionSlots = typeof __propDef.slots;
export default class Admonition extends SvelteComponentTyped<AdmonitionProps, AdmonitionEvents, AdmonitionSlots> {
}
export {};
