<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	onMount(async function () {
		if (
			localStorage.getItem('auth-id') != undefined &&
			localStorage.getItem('auth-id') != '' &&
			localStorage.getItem('auth-id') != null
		) {
			goto('/tournament');
		}
	});
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
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center">
			<a href="/register" class="btn variant-filled w-48">Register</a>
			<a href="/login" class="btn variant-filled w-48">Login</a>
			<a href="/tournament" class="btn variant-filled w-48">Tournament</a>
		</div>
	</div>
</AppShell>
