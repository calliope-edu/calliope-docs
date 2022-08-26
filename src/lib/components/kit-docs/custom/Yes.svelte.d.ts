/** @typedef {typeof __propDef.props}  YesProps */
/** @typedef {typeof __propDef.events}  YesEvents */
/** @typedef {typeof __propDef.slots}  YesSlots */
export default class Yes extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type YesProps = typeof __propDef.props;
export type YesEvents = typeof __propDef.events;
export type YesSlots = typeof __propDef.slots;
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
