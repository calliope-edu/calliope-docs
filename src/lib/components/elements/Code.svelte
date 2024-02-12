<!-- <script>
import Prism from 'svelte-prism'
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/components/prism-python'

export let language="html";
export let source = null;

function transformCode(code) {
	return Prism?.plugins?.NormalizeWhitespace.normalize(code) ?? code;
}

</script>

<head>
	<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.5.0/themes/prism.min.css"
	/>
</head>

<Prism language={language}
transform={code => transformCode(code)}
>
<slot />
</Prism>


<style lang="scss">

</style> -->
x
<slot />
y
