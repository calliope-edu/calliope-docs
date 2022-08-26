import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        lang?: string | null;
        ext?: string | null;
        code?: string | null;
        rawCode?: string | null;
        title?: string | null;
        linesCount?: number;
        showLineNumbers?: boolean;
        highlightLines?: [number, number][];
        showCopyCode?: boolean;
        copyHighlightOnly?: boolean;
        copySteps?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type CodeFenceProps = typeof __propDef.props;
export declare type CodeFenceEvents = typeof __propDef.events;
export declare type CodeFenceSlots = typeof __propDef.slots;
export default class CodeFence extends SvelteComponentTyped<CodeFenceProps, CodeFenceEvents, CodeFenceSlots> {
}
export {};
