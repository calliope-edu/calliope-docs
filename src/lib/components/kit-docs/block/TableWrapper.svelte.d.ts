/** @typedef {typeof __propDef.props}  TableWrapperProps */
/** @typedef {typeof __propDef.events}  TableWrapperEvents */
/** @typedef {typeof __propDef.slots}  TableWrapperSlots */
export default class TableWrapper extends SvelteComponentTyped<{
    class?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TableWrapperProps = typeof __propDef.props;
export type TableWrapperEvents = typeof __propDef.events;
export type TableWrapperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        class?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
