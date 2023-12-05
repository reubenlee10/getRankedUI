<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Toast } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import bgImage from '$lib/images/Order.svg'


	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let checked = false

	onMount(async function () {
		// TODO : JWT Check
		if (
			localStorage.getItem('auth-id') != undefined &&
			localStorage.getItem('auth-id') != '' &&
			localStorage.getItem('auth-id') != null
		) {
			goto('/tournament');
		}else{
			checked = true
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
	{#if checked}
		<div class="container h-full mx-auto flex flex-col items-center z-10">
			<img src="{bgImage}" alt="getRanked" class="z-0 h-44 mb-12 mt-20">
			<div class="space-y-10 text-center flex flex-col items-center">
				<a href="/register" class="btn variant-filled w-48">Register</a>
				<a href="/login" class="btn variant-filled w-48">Login</a>
				<a href="/tournament" class="btn variant-filled w-48">Tournament</a>
			</div>
		</div>
	{/if}
</AppShell>
