<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { onMount } from 'svelte';
	import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
	import type { TournamentPlayers } from '$lib/models/tournament.model';

	let response: any;
	let tid: any;
	let joined: any;
	let playersResponse: TournamentPlayers[] ;

    const flipDurationMs = 300;
    function handleDndConsider(e:any) {
		playersResponse[Number(e.srcElement.id)].players = e.detail.items;
    }
    function handleDndFinalize(e:any) {
		playersResponse[Number(e.srcElement.id)].players = e.detail.items;
    }

	onMount(async function () {
		let uid = localStorage.getItem('auth-id');
		tid = window.location.href.split('/')[5];

		response = await APIService.getTournament(tid);

		playersResponse = await APIService.getTournamentPlayers(tid);

		if (playersResponse.length > 0){
			for (let i = 0; i < playersResponse.length; i++) {
				for (let j = 0; j < playersResponse[i].players.length; j++) {
					if (playersResponse[i].players[j].id == uid) {
						joined = true;
						break;
					}
				}
			}
			if (joined == undefined){
				joined = false;
			}
		}else{
			joined = false;
		}
	});

	async function saveOrder(i:number){
		console.log("Save")
		let order: any[] = []
		for (let j = 0; j < playersResponse[i].players.length; j++){
			order.push({
				id: playersResponse[i].players[j].id,
				seed: j + 1
			})
		}
		console.log(order)
		let response = await APIService.tournamentOrder(playersResponse[i].category.tournament_id, playersResponse[i].category.category_id, order)
		console.log(response)
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
			<div class="space-y-10 flex flex-coltext-xl flex-col">
				<!-- <div class="table-container">
					<table class="table table-hover">
						<tbody>
							<tr>
								<td class="font-bold">Sport</td>
								<td class="capitalize">{response.tournament.sport}</td>
							</tr>
							<tr>
								<td class="font-bold">Dates</td>
								<td
									>{new Date(response.tournament.start_date).toLocaleString()} - {new Date(
										response.tournament.end_date
									).toLocaleString()}</td
								>
							</tr>
							<tr>
								<td class="font-bold">Last Register Date</td>
								<td>{new Date(response.tournament.last_register_date).toLocaleString()}</td>
							</tr>
							<tr>
								<td class="font-bold">Tournament Type</td>
								<td class="capitalize">{response.tournament.tournament_type}</td>
							</tr>
							<tr>
								<td class="font-bold">Address</td>
								<td
									><p>{response.address.name}</p>
									<p>{response.address.address}</p></td
								>
							</tr>
							<tr>
								<td class="font-bold">No. of Courts</td>
								<td>{response.tournament.no_of_courts}</td>
							</tr>
							<tr>
								<td class="font-bold">Categories</td>
								<td
									>{#each response.categories as c}
										<p>{c.category_name} ({c.type})</p>
									{/each}</td
								>
							</tr>
							<tr>
								<td class="font-bold">Regulations</td>
								<td>{response.tournament.regulations}</td>
							</tr>
						</tbody>
					</table>
				</div> -->
				<div>
					<span class="text-2xl font-bold underline">Players</span>
					<div class="flex flex-col m-4">
						{#if playersResponse != undefined}
							{#if playersResponse.length <= 0}
								<span class="italic my-3">No registered players yet.</span>
							{:else}
								{#each playersResponse as c, i}
									<div>
										<span class="font-bold text-xl">{c.category.category_name} ({c.category.type})</span>
										<div class="flex flex-col">
											<section class="border-white" id="{String(i)}" use:dndzone="{{items:c.players, flipDurationMs, dropFromOthersDisabled:true}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
												{#each c.players as p(p.id)}
													<div class="p-3 m-1 border border-white" animate:flip="{{duration: flipDurationMs}}">{p.first_name} {p.last_name}</div>
												{/each}
											</section>
											<button type="button" class="btn variant-filled w-24 p-1.5 m-2 self-end" on:click={() => {saveOrder(i)}}>
												<span>
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
														<path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
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
					<div />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
