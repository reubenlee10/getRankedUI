<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { APIService } from '$lib/services/api.service';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	function logout() {
		localStorage.clear();
		goto('/');
	}

	let loggedIn:boolean;
	let playerName = ""

	onMount(async function () {
		if (
			localStorage.getItem('auth-id') == undefined ||
			localStorage.getItem('auth-id') == '' ||
			localStorage.getItem('auth-id') == null
		) {
			goto('/login');
		} else {
			loggedIn = true;
			let playerData = await APIService.getPlayerData()
			playerName = playerData.firstName
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
			<svelte:fragment slot="trail">
				{#if loggedIn}
					<button class="btn btn-sm variant-ghost-surface" on:click={logout}> Logout </button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	{#if loggedIn}
		<slot />
	{/if}
</AppShell>
