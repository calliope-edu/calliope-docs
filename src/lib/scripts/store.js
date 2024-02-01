import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

export const _l = writable('de');
export const _l_path = writable('');

export const selectedBoardVersion = persisted('selectedBoardVersion', 3);