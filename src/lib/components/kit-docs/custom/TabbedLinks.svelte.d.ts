import { SvelteComponentTyped } from "svelte";
export declare type TabbedLink = {
    title: string;
    href: string;
};
declare const __propDef: {
    props: {
        links?: TabbedLink[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type TabbedLinksProps = typeof __propDef.props;
export declare type TabbedLinksEvents = typeof __propDef.events;
export declare type TabbedLinksSlots = typeof __propDef.slots;
export default class TabbedLinks extends SvelteComponentTyped<TabbedLinksProps, TabbedLinksEvents, TabbedLinksSlots> {
}
export {};
