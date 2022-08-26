/** @typedef {typeof __propDef.props}  NoProps */
/** @typedef {typeof __propDef.events}  NoEvents */
/** @typedef {typeof __propDef.slots}  NoSlots */
export default class No extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type NoProps = typeof __propDef.props;
export type NoEvents = typeof __propDef.events;
export type NoSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
