<script>
	import Gap from './../../lib/components/layout/Gap.svelte';
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import ProseDecorator from './../Decorators/ProseDecorator.svelte';


const brandColors = [
    {
                name: 'Calliope',
                shades: [
                    { name: '50', hex: '#D2F2F3'},
                    { name: '100', hex: '#C2EEEE'},
                    { name: '200', hex: '#A2E4E5'},
                    { name: '300', hex: '#82DBDD'},
                    { name: '400', hex: '#62D2D4'},
                    { name: '500', hex: '#42C9CB', default: true},
                    { name: '600', hex: '#2EA5A7'},
                    { name: '700', hex: '#227A7B'},
                    { name: '800', hex: '#164E4F'},
                    { name: '900', hex: '#0A2323'}
                ]
            },{
                name: 'Rosa',
                shades: [
                    { name: '50', hex: '#FF9FD3'},
                    { name: '100', hex: '#FF8ACA'},
                    { name: '200', hex: '#FF61B7'},
                    { name: '300', hex: '#FF39A4'},
                    { name: '400', hex: '#FF1092'},
                    { name: '500', hex: '#E6007D', default: true},
                    { name: '600', hex: '#AE005F'},
                    { name: '700', hex: '#760040'},
                    { name: '800', hex: '#3E0022'},
                    { name: '900', hex: '#060003'}
                ]
            },{
                name: 'Blau',
                shades: [
                    { name: '50', hex: '#F1F3FF'},
                    { name: '100', hex: '#DDE1FF'},
                    { name: '200', hex: '#B5BDFE'},
                    { name: '300', hex: '#8C9AFE'},
                    { name: '400', hex: '#6476FD', default: true},
                    { name: '500', hex: '#2D45FC'},
                    { name: '600', hex: '#031FEE'},
                    { name: '700', hex: '#0218B6'},
                    { name: '800', hex: '#02107F'},
                    { name: '900', hex: '#010948'}
                ]
            },{
                name: 'Gruen',
                shades: [
                    { name: '50', hex: '#CEF1D7'},
                    { name: '100', hex: '#BEECCA'},
                    { name: '200', hex: '#9EE3B0'},
                    { name: '300', hex: '#7EDA97'},
                    { name: '400', hex: '#5FD17D'},
                    { name: '500', hex: '#3FC863', default: true},
                    { name: '600', hex: '#2EA14C'},
                    { name: '700', hex: '#227538'},
                    { name: '800', hex: '#154A23'},
                    { name: '900', hex: '#091E0E'}
                ]
            },{
                name: 'Lila',
                shades: [
                    { name: '50', hex: '#EDEBFB'},
                    { name: '100', hex: '#DEDAF8'},
                    { name: '200', hex: '#BEB8F2'},
                    { name: '300', hex: '#9F95EB'},
                    { name: '400', hex: '#8073E5', default: true},
                    { name: '500', hex: '#5544DC'},
                    { name: '600', hex: '#3624C3'},
                    { name: '700', hex: '#291C94'},
                    { name: '800', hex: '#1C1365'},
                    { name: '900', hex: '#0F0A36'}
                ]
            },{
                name: 'Gelb',
                shades: [
                    { name: '50', hex: '#FDF4D6'},
                    { name: '100', hex: '#FDEFC2'},
                    { name: '200', hex: '#FBE49B'},
                    { name: '300', hex: '#FAD974'},
                    { name: '400', hex: '#F8CF4C'},
                    { name: '500', hex: '#F7C425', default: true},
                    { name: '600', hex: '#DCA808'},
                    { name: '700', hex: '#A67F06'},
                    { name: '800', hex: '#705504'},
                    { name: '900', hex: '#392C02'}
                ]
            },{
                name: 'Apricot',
                shades: [
                    { name: '50', hex: '#FFCBB8'},
                    { name: '100', hex: '#FFBCA3'},
                    { name: '200', hex: '#FF9F7A'},
                    { name: '300', hex: '#FF8152'},
                    { name: '400', hex: '#FF6429'},
                    { name: '500', hex: '#FF4600', default: true},
                    { name: '600', hex: '#C73700'},
                    { name: '700', hex: '#8F2700'},
                    { name: '800', hex: '#571800'},
                    { name: '900', hex: '#1F0800'}
                ]
            },{
                name: 'Grau',
                shades: [
                    { name: '50', hex: '#D3D7DD'},
                    { name: '100', hex: '#C7CDD5'},
                    { name: '200', hex: '#B0B8C3'},
                    { name: '300', hex: '#99A3B1'},
                    { name: '400', hex: '#828FA0'},
                    { name: '500', hex: '#6B7A8D'},
                    { name: '600', hex: '#5A6676'},
                    { name: '700', hex: '#48525F', default: true},
                    { name: '800', hex: '#30363F'},
                    { name: '900', hex: '#181B1F'}
                ]
            },
]

    const tailwindColors = [
            {
                name: 'Slate',
                shades: [
                    { name: '50', hex: '#f8fafc'},
                    { name: '100', hex: '#f1f5f9'},
                    { name: '200', hex: '#e2e8f0'},
                    { name: '300', hex: '#cbd5e1'},
                    { name: '400', hex: '#94a3b8'},
                    { name: '500', hex: '#64748b'},
                    { name: '600', hex: '#475569'},
                    { name: '700', hex: '#334155'},
                    { name: '800', hex: '#1e293b'},
                    { name: '900', hex: '#0f172a'}
                ]
            },{
                name: 'Gray',
                shades: [
                    { name: '50', hex: '#f9fafb'},
                    { name: '100', hex: '#f3f4f6'},
                    { name: '200', hex: '#e5e7eb'},
                    { name: '300', hex: '#d1d5db'},
                    { name: '400', hex: '#9ca3af'},
                    { name: '500', hex: '#6b7280'},
                    { name: '600', hex: '#4b5563'},
                    { name: '700', hex: '#374151'},
                    { name: '800', hex: '#1f2937'},
                    { name: '900', hex: '#111827'}
                ]
            },{
                name: 'Zinc',
                shades: [
                    { name: '50', hex: '#fafafa'},
                    { name: '100', hex: '#f4f4f5'},
                    { name: '200', hex: '#e4e4e7'},
                    { name: '300', hex: '#d4d4d8'},
                    { name: '400', hex: '#a1a1aa'},
                    { name: '500', hex: '#71717a'},
                    { name: '600', hex: '#52525b'},
                    { name: '700', hex: '#3f3f46'},
                    { name: '800', hex: '#27272a'},
                    { name: '900', hex: '#18181b'}
                ]
            },{
                name: 'Neutral',
                shades: [
                    { name: '50', hex: '#fafafa'},
                    { name: '100', hex: '#f5f5f5'},
                    { name: '200', hex: '#e5e5e5'},
                    { name: '300', hex: '#d4d4d4'},
                    { name: '400', hex: '#a3a3a3'},
                    { name: '500', hex: '#737373'},
                    { name: '600', hex: '#525252'},
                    { name: '700', hex: '#404040'},
                    { name: '800', hex: '#262626'},
                    { name: '900', hex: '#171717'}
                ]
            },{
                name: 'Stone',
                shades: [
                    { name: '50', hex: '#fafaf9'},
                    { name: '100', hex: '#f5f5f4'},
                    { name: '200', hex: '#e7e5e4'},
                    { name: '300', hex: '#d6d3d1'},
                    { name: '400', hex: '#a8a29e'},
                    { name: '500', hex: '#78716c'},
                    { name: '600', hex: '#57534e'},
                    { name: '700', hex: '#44403c'},
                    { name: '800', hex: '#292524'},
                    { name: '900', hex: '#1c1917'}
                ]
            },{
                name: 'Red',
                shades: [
                    { name: '50', hex: '#fef2f2'},
                    { name: '100', hex: '#fee2e2'},
                    { name: '200', hex: '#fecaca'},
                    { name: '300', hex: '#fca5a5'},
                    { name: '400', hex: '#f87171'},
                    { name: '500', hex: '#ef4444'},
                    { name: '600', hex: '#dc2626'},
                    { name: '700', hex: '#b91c1c'},
                    { name: '800', hex: '#991b1b'},
                    { name: '900', hex: '#7f1d1d'}
                ]
            },{
                name: 'Orange',
                shades: [
                    { name: '50', hex: '#fff7ed'},
                    { name: '100', hex: '#ffedd5'},
                    { name: '200', hex: '#fed7aa'},
                    { name: '300', hex: '#fdba74'},
                    { name: '400', hex: '#fb923c'},
                    { name: '500', hex: '#f97316'},
                    { name: '600', hex: '#ea580c'},
                    { name: '700', hex: '#c2410c'},
                    { name: '800', hex: '#9a3412'},
                    { name: '900', hex: '#7c2d12'}
                ]
            },{
                name: 'Amber',
                shades: [
                    { name: '50', hex: '#fffbeb'},
                    { name: '100', hex: '#fef3c7'},
                    { name: '200', hex: '#fde68a'},
                    { name: '300', hex: '#fcd34d'},
                    { name: '400', hex: '#fbbf24'},
                    { name: '500', hex: '#f59e0b'},
                    { name: '600', hex: '#d97706'},
                    { name: '700', hex: '#b45309'},
                    { name: '800', hex: '#92400e'},
                    { name: '900', hex: '#78350f'}
                ]
            },{
                name: 'Yellow',
                shades: [
                    { name: '50', hex: '#fefce8'},
                    { name: '100', hex: '#fef9c3'},
                    { name: '200', hex: '#fef08a'},
                    { name: '300', hex: '#fde047'},
                    { name: '400', hex: '#facc15'},
                    { name: '500', hex: '#eab308'},
                    { name: '600', hex: '#ca8a04'},
                    { name: '700', hex: '#a16207'},
                    { name: '800', hex: '#854d0e'},
                    { name: '900', hex: '#713f12'}
                ]
            },{
                name: 'Lime',
                shades: [
                    { name: '50', hex: '#f7fee7'},
                    { name: '100', hex: '#ecfccb'},
                    { name: '200', hex: '#d9f99d'},
                    { name: '300', hex: '#bef264'},
                    { name: '400', hex: '#a3e635'},
                    { name: '500', hex: '#84cc16'},
                    { name: '600', hex: '#65a30d'},
                    { name: '700', hex: '#4d7c0f'},
                    { name: '800', hex: '#3f6212'},
                    { name: '900', hex: '#365314'}
                ]
            },{
                name: 'Green',
                shades: [
                    { name: '50', hex: '#f0fdf4'},
                    { name: '100', hex: '#dcfce7'},
                    { name: '200', hex: '#bbf7d0'},
                    { name: '300', hex: '#86efac'},
                    { name: '400', hex: '#4ade80'},
                    { name: '500', hex: '#22c55e'},
                    { name: '600', hex: '#16a34a'},
                    { name: '700', hex: '#15803d'},
                    { name: '800', hex: '#166534'},
                    { name: '900', hex: '#14532d'}
                ]
            },{
                name: 'Emerald',
                shades: [
                    { name: '50', hex: '#ecfdf5'},
                    { name: '100', hex: '#d1fae5'},
                    { name: '200', hex: '#a7f3d0'},
                    { name: '300', hex: '#6ee7b7'},
                    { name: '400', hex: '#34d399'},
                    { name: '500', hex: '#10b981'},
                    { name: '600', hex: '#059669'},
                    { name: '700', hex: '#047857'},
                    { name: '800', hex: '#065f46'},
                    { name: '900', hex: '#064e3b'}
                ]
            },{
                name: 'Teal',
                shades: [
                    { name: '50', hex: '#f0fdfa'},
                    { name: '100', hex: '#ccfbf1'},
                    { name: '200', hex: '#99f6e4'},
                    { name: '300', hex: '#5eead4'},
                    { name: '400', hex: '#2dd4bf'},
                    { name: '500', hex: '#14b8a6'},
                    { name: '600', hex: '#0d9488'},
                    { name: '700', hex: '#0f766e'},
                    { name: '800', hex: '#115e59'},
                    { name: '900', hex: '#134e4a'}
                ]
            },{
                name: 'Cyan',
                shades: [
                    { name: '50', hex: '#ecfeff'},
                    { name: '100', hex: '#cffafe'},
                    { name: '200', hex: '#a5f3fc'},
                    { name: '300', hex: '#67e8f9'},
                    { name: '400', hex: '#22d3ee'},
                    { name: '500', hex: '#06b6d4'},
                    { name: '600', hex: '#0891b2'},
                    { name: '700', hex: '#0e7490'},
                    { name: '800', hex: '#155e75'},
                    { name: '900', hex: '#164e63'}
                ]
            },{
                name: 'Sky',
                shades: [
                    { name: '50', hex: '#f0f9ff'},
                    { name: '100', hex: '#e0f2fe'},
                    { name: '200', hex: '#bae6fd'},
                    { name: '300', hex: '#7dd3fc'},
                    { name: '400', hex: '#38bdf8'},
                    { name: '500', hex: '#0ea5e9'},
                    { name: '600', hex: '#0284c7'},
                    { name: '700', hex: '#0369a1'},
                    { name: '800', hex: '#075985'},
                    { name: '900', hex: '#0c4a6e'}
                ]
            },{
                name: 'Blue',
                shades: [
                    { name: '50', hex: '#eff6ff'},
                    { name: '100', hex: '#dbeafe'},
                    { name: '200', hex: '#bfdbfe'},
                    { name: '300', hex: '#93c5fd'},
                    { name: '400', hex: '#60a5fa'},
                    { name: '500', hex: '#3b82f6'},
                    { name: '600', hex: '#2563eb'},
                    { name: '700', hex: '#1d4ed8'},
                    { name: '800', hex: '#1e40af'},
                    { name: '900', hex: '#1e3a8a'}
                ]
            },{
                name: 'Indigo',
                shades: [
                    { name: '50', hex: '#eef2ff'},
                    { name: '100', hex: '#e0e7ff'},
                    { name: '200', hex: '#c7d2fe'},
                    { name: '300', hex: '#a5b4fc'},
                    { name: '400', hex: '#818cf8'},
                    { name: '500', hex: '#6366f1'},
                    { name: '600', hex: '#4f46e5'},
                    { name: '700', hex: '#4338ca'},
                    { name: '800', hex: '#3730a3'},
                    { name: '900', hex: '#312e81'}
                ]
            },{
                name: 'Violet',
                shades: [
                    { name: '50', hex: '#f5f3ff'},
                    { name: '100', hex: '#ede9fe'},
                    { name: '200', hex: '#ddd6fe'},
                    { name: '300', hex: '#c4b5fd'},
                    { name: '400', hex: '#a78bfa'},
                    { name: '500', hex: '#8b5cf6'},
                    { name: '600', hex: '#7c3aed'},
                    { name: '700', hex: '#6d28d9'},
                    { name: '800', hex: '#5b21b6'},
                    { name: '900', hex: '#4c1d95'}
                ]
            },{
                name: 'Purple',
                shades: [
                    { name: '50', hex: '#faf5ff'},
                    { name: '100', hex: '#f3e8ff'},
                    { name: '200', hex: '#e9d5ff'},
                    { name: '300', hex: '#d8b4fe'},
                    { name: '400', hex: '#c084fc'},
                    { name: '500', hex: '#a855f7'},
                    { name: '600', hex: '#9333ea'},
                    { name: '700', hex: '#7e22ce'},
                    { name: '800', hex: '#6b21a8'},
                    { name: '900', hex: '#581c87'}
                ]
            },{
                name: 'Fuchsia',
                shades: [
                    { name: '50', hex: '#fdf4ff'},
                    { name: '100', hex: '#fae8ff'},
                    { name: '200', hex: '#f5d0fe'},
                    { name: '300', hex: '#f0abfc'},
                    { name: '400', hex: '#e879f9'},
                    { name: '500', hex: '#d946ef'},
                    { name: '600', hex: '#c026d3'},
                    { name: '700', hex: '#a21caf'},
                    { name: '800', hex: '#86198f'},
                    { name: '900', hex: '#701a75'}
                ]
            },{
                name: 'Pink',
                shades: [
                    { name: '50', hex: '#fdf2f8'},
                    { name: '100', hex: '#fce7f3'},
                    { name: '200', hex: '#fbcfe8'},
                    { name: '300', hex: '#f9a8d4'},
                    { name: '400', hex: '#f472b6'},
                    { name: '500', hex: '#ec4899'},
                    { name: '600', hex: '#db2777'},
                    { name: '700', hex: '#be185d'},
                    { name: '800', hex: '#9d174d'},
                    { name: '900', hex: '#831843'}
                ]
            },{
                name: 'Rose',
                shades: [
                    { name: '50', hex: '#fff1f2'},
                    { name: '100', hex: '#ffe4e6'},
                    { name: '200', hex: '#fecdd3'},
                    { name: '300', hex: '#fda4af'},
                    { name: '400', hex: '#fb7185'},
                    { name: '500', hex: '#f43f5e'},
                    { name: '600', hex: '#e11d48'},
                    { name: '700', hex: '#be123c'},
                    { name: '800', hex: '#9f1239'},
                    { name: '900', hex: '#881337'}
                ]
            }
        ];
</script>

<Meta title="Basics/Farben" />

<Story name="Farben">
	<ProseDecorator>

        <h3>Brandfarben</h3>
        <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
            <div class="w-16 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                    <div class="text-sm font-semibold text-slate-900 dark:text-slate-200"></div>
                </div>
            </div>
            <div class="min-w-0 flex-1 grid grid-cols-4 gap-x-4 gap-y-3 2xl:gap-x-2">

                {#each brandColors as color}

                    <div class="relative flex">
                        <div class="space-y-1.5 w-full">
                            <div
                                class="h-10 shadow w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-{color.name.toLowerCase()}"
                            />
                            <div class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block">
                                <div class="w-6 font-medium text-slate-900 w-full dark:text-white">{color.name}</div>
                                <!-- <div class="text-slate-500 font-mono lowercase dark:text-slate-400">{color.name}</div> -->
                            </div>
                        </div>
                    </div>

                {/each}

            </div>
        </div>
        <Gap h=2 />

        <h3>Sonderfarben</h3>
        <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
            <div class="w-16 shrink-0">
                <div class="h-10 flex flex-col justify-center">
                    <div class="text-sm font-semibold text-slate-900 dark:text-slate-200"></div>
                </div>
            </div>
            <div class="min-w-0 flex-1 grid grid-cols-5 lg:grid-cols-10 gap-x-4 gap-y-3 2xl:gap-x-2">

                {#each ['inherit', 'current', 'transparent', 'black', 'white'] as color}

                    <div class="relative flex">
                        <div class="space-y-1.5 w-full">
                            <div
                                class="h-10 shadow w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10 bg-{color}"
                            />
                            <div class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block">
                                <div class="w-6 font-medium text-slate-900 w-full dark:text-white">{color}</div>
                            </div>
                        </div>
                    </div>

                {/each}

            </div>
        </div>
        <Gap h=2 />

		<h3>
			Alle Farben
		</h3>

        {#each [...brandColors, ...tailwindColors] as color}

            <div class="flex flex-col space-y-3 sm:flex-row text-xs sm:space-y-0 sm:space-x-4">
                <div class="w-16 shrink-0">
                    <div class="h-10 flex flex-col justify-center">
                        <div class="text-sm font-semibold text-slate-900 dark:text-slate-200">{color.name}</div>
                    </div>
                </div>
                <div class="min-w-0 flex-1 grid grid-cols-5 lg:grid-cols-10 gap-x-4 gap-y-3 2xl:gap-x-2">

                    {#each color.shades as shade}

                        <div class="relative flex">
                            <div class="space-y-1.5 w-full">
                                <div
                                    class="h-10 shadow w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10"
                                    style="background-color: {shade.hex};"
                                />
                                <div class="px-0.5 md:flex md:justify-between md:space-x-2 2xl:space-x-0 2xl:block">
                                    <div class="w-6 font-{shade.default ? 'black' : 'medium'} text-slate-900 2xl:w-full dark:text-white">{shade.name}</div>
                                    <div class="text-slate-500 font-mono lowercase dark:text-slate-400">{shade.hex}</div>
                                </div>
                            </div>
                        </div>

                    {/each}

                </div>
            </div>
            <Gap h=2 />

        {/each}
	</ProseDecorator>
</Story>

