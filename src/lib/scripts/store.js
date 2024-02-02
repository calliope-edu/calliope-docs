import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

export const languages = {
    'de': {
        name: 'Deutsch',
        code: 'de',
        path: '/',
    },
    'en': {
        name: 'English',
        code: 'en',
        path: '/en/'
    }
}

export const _lang = writable(languages['de']);

export const selectedBoardVersion = persisted('selectedBoardVersion', 3);