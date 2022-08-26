import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        code: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type CodeInlineProps = typeof __propDef.props;
export declare type CodeInlineEvents = typeof __propDef.events;
export declare type CodeInlineSlots = typeof __propDef.slots;
export default class CodeInline extends SvelteComponentTyped<CodeInlineProps, CodeInlineEvents, CodeInlineSlots> {
}
export {};
