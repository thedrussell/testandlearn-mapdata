<script>
	import { colors } from './colors.js';
	let { flavor } = $props();
</script>

<div class="Dot" style:background={colors[flavor]}>
</div>

<style>
	.Dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: black;
		flex-grow: 0;
		flex-shrink: 0;
	}
</style>