<!-- <script lang="ts">
	import '../../app.postcss';

	// Floating UI for Popups
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    // TODO : Check if user is admin for that tourney
	onMount(async function () {
		if (
			localStorage.getItem('auth-id') == undefined ||
			localStorage.getItem('auth-id') == '' ||
			localStorage.getItem('auth-id') == null
		) {
			goto('/login');
		} else {
			// let playerData = await APIService.getPlayerData();
		}
	});
</script> -->

<slot />
