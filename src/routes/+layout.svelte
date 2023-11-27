<script lang="ts">
	import '../app.postcss';
	import { AppShell, Toast } from '@skeletonlabs/skeleton';

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
	<!-- Page Route Content -->
	<slot />
</AppShell>
