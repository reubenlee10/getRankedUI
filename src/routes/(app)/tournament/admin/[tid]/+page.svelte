<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { TournamentPlayers } from '$lib/models/tournament.model';
	import { goto } from '$app/navigation';
	import { getToastStore } from '@skeletonlabs/skeleton';
	
	let response: any;
	let tid: any;
	let joined: any;
	let playersResponse: TournamentPlayers[];
	const toastStore = getToastStore();
	let drawOngoing = false


	const flipDurationMs = 300;
	function handleDndConsider(e: any) {
		playersResponse[Number(e.srcElement.id)].players = e.detail.items;
	}
	function handleDndFinalize(e: any) {
		playersResponse[Number(e.srcElement.id)].players = e.detail.items;
	}

	onMount(async function () {
		let uid = localStorage.getItem('auth-id');
		tid = window.location.href.split('/')[5];

		response = await APIService.getTournament(tid);

		playersResponse = await APIService.getTournamentPlayersAdmin(tid);

		if (playersResponse.length > 0) {
			for (let i = 0; i < playersResponse.length; i++) {
				for (let j = 0; j < playersResponse[i].players.length; j++) {
					if (playersResponse[i].players[j].id == uid) {
						joined = true;
						break;
					}
				}
			}
			if (joined == undefined) {
				joined = false;
			}
		} else {
			joined = false;
		}
	});

	async function saveOrder(i: number) {
		// console.log('Save');
		let order: any[] = [];
		for (let j = 0; j < playersResponse[i].players.length; j++) {
			order.push({
				id: playersResponse[i].players[j].id,
				seed: j + 1
			});
		}
		let response = await APIService.tournamentOrder(
			playersResponse[i].category.tournament_id,
			playersResponse[i].category.category_id,
			order
		);
	}

	async function tournamentDraw(){
		drawOngoing = true
		let response = await APIService.tournamentDraw(
			tid
		);
		if (response == 0){
			toastStore.trigger({
				message: 'Draw Success!',
				background: 'variant-filled-success'
			});	
		}else{
			toastStore.trigger({
				message: 'Draw Failed!',
				background: 'variant-filled-error'
			});	
		}
		drawOngoing = false
	}
</script>

<div class="container h-full mx-auto flex flex-col gap-2 m-4">
	<div class="flex m-2 flex-col">
		{#if response != undefined}
			<div class=" flex items-center text-6xl mb-5">
				<p>
					{response.tournament.tournament_name}
				</p>
			</div>
			<button class="btn m-2 ml-0 variant-filled-tertiary w-32 text-white" on:click={() => {goto(tid +'/match');}}>
				Edit Matches
			</button>
			<div class="space-y-10 flex flex-coltext-xl flex-col">
				<div>
					<span class="text-2xl font-bold underline">Players</span>
					<div class="flex flex-col m-4">
						{#if playersResponse != undefined}
							{#if playersResponse.length <= 0}
								<span class="italic my-3">No registered players yet.</span>
							{:else}
								{#each playersResponse as c, i}
									<div>
										<span class="font-bold text-xl"
											>{c.category.category_name} ({c.category.type})</span
										>
										<div class="flex flex-col">
											<section
												class="border-white"
												id={String(i)}
												use:dndzone={{
													items: c.players,
													flipDurationMs,
													dropFromOthersDisabled: true
												}}
												on:consider={handleDndConsider}
												on:finalize={handleDndFinalize}
											>
												{#each c.players as p (p.id)}
													<div
														class="p-3 m-1 border border-white"
														animate:flip={{ duration: flipDurationMs }}
													>
														{p.first_name}
														{p.last_name}
													</div>
												{/each}
											</section>
											<button
												type="button"
												class="btn variant-filled w-24 p-1.5 m-2 self-end"
												on:click={() => {
													saveOrder(i);
												}}
											>
												<span>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="w-4 h-4"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
														/>
													</svg>
												</span>
												<span>Save</span>
											</button>
										</div>
									</div>
								{/each}
							{/if}
						{/if}
					</div>
					{#if !drawOngoing}
						<button
							type="button"
							class="btn variant-filled-success px-4 py-2 m-2 self-center"
							on:click={() => {
								tournamentDraw();
							}}
						>
							<span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
									<path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
								</svg>
							</span>
							<span>Start Draw</span>
						</button>
					{:else}
						<span class="pl-5">draw ongoing...</span>
					{/if}
					<div/>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
