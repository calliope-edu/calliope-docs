import { SvelteComponentTyped } from "svelte";
export declare type StepsContext = {
    steps: Readable<number>;
    register: () => number;
};
export declare function getStepsContext(): StepsContext;
import { type Readable } from 'svelte/store';
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type StepsProps = typeof __propDef.props;
export declare type StepsEvents = typeof __propDef.events;
export declare type StepsSlots = typeof __propDef.slots;
export default class Steps extends SvelteComponentTyped<StepsProps, StepsEvents, StepsSlots> {
}
export {};
