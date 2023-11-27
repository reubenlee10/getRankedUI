<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

</script>

<!-- App Shell -->
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">GetRanked</strong></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
