import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string | null;
        description?: string | null;
        orientation?: 'horizontal' | 'vertical';
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        title: {};
        description: {};
        default: {};
    };
};
export declare type StepProps = typeof __propDef.props;
export declare type StepEvents = typeof __propDef.events;
export declare type StepSlots = typeof __propDef.slots;
export default class Step extends SvelteComponentTyped<StepProps, StepEvents, StepSlots> {
}
export {};
