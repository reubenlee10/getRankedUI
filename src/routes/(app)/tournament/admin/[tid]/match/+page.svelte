<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { RadioGroup, RadioItem, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let response: any;
	let tid: any;
	let playersReponse: any;
	let matchesCategory: any[];
	let matchesAll: any[];
	let radioValue: number = 0;
    let matchEditing:any[] = [];

	const toastStore = getToastStore();

	onMount(async function () {
		tid = window.location.href.split('/')[5];

		response = await APIService.getTournament(tid);

		playersReponse = await APIService.getTournamentPlayers(tid);
        getAndOrderMatch()
	});

    async function getAndOrderMatch(){
        let matchesResponse = await APIService.getMatchesAllOrdered(tid);
		matchesAll = matchesResponse
        matchEditing = []

        for (let i = 0; i < matchesAll.length; i++) {
            matchEditing.push(
                {
                    editing:false, 
                    p1_score: matchesAll[i].p1_score,
                    p2_score: matchesAll[i].p2_score,
                    set1_p1: matchesAll[i].set1_p1,
                    set2_p1: matchesAll[i].set2_p1,
                    set3_p1: matchesAll[i].set3_p1,
                    set4_p1: matchesAll[i].set4_p1,
                    set5_p1: matchesAll[i].set5_p1,
                    set1_p2: matchesAll[i].set1_p2,
                    set2_p2: matchesAll[i].set2_p2,
                    set3_p2: matchesAll[i].set3_p2,
                    set4_p2: matchesAll[i].set4_p2,
                    set5_p2: matchesAll[i].set5_p2,
                });
        }
    }

	async function getMatchesByCategory(){
		let matchesResponse = await APIService.getMatchesByCategory(tid);
		matchesCategory = matchesResponse
	}

    function editMatch(index:number){
        matchEditing[index].editing ? matchEditing[index].editing = false: matchEditing[index].editing = true
    } 

    async function saveEdit(index:number){
        let scores = [matchEditing[index].p1_score, matchEditing[index].p2_score]
        let p1_points = [matchEditing[index].set1_p1, matchEditing[index].set2_p1, matchEditing[index].set3_p1, matchEditing[index].set4_p1, matchEditing[index].set5_p1]
        let p2_points = [matchEditing[index].set1_p2, matchEditing[index].set2_p2, matchEditing[index].set3_p2, matchEditing[index].set4_p2, matchEditing[index].set5_p2]
        let code = await APIService.editMatch(matchesAll[index].match_id, scores, p1_points, p2_points)
        if (code == 0){
            toastStore.trigger({
                message: 'Successfully Edited Match',
                background: 'variant-filled-success'
            });	
            getAndOrderMatch()
            matchEditing[index].editing = false
        }else{
            toastStore.trigger({
                message: 'Failed to Edit Match',
                background: 'variant-filled-error'
            });	
        }
    } 

</script>

<div class="mx-6">
    <RadioGroup>
        <!-- TODO : Can optimize my only calling when jumping from one radio to another -->
        <RadioItem bind:group={radioValue} name="justify" value={0} on:click={getAndOrderMatch}>All</RadioItem>
        <RadioItem bind:group={radioValue} name="justify" value={1} on:click={getMatchesByCategory}>By Category</RadioItem>
        <!-- <RadioItem bind:group={radioValue} name="justify" value={2}>(label)</RadioItem> -->
    </RadioGroup>
    <!-- ALL  -->
    {#if radioValue == 0}
        {#if matchesAll != undefined }
            {#if matchesAll.length > 0}
                <dl class="mt-2">
                    {#each matchesAll as m, index}
                        <div class="p-2 px-4 m-1 mb-2 w-full text-token card space-y-4">
                            <span class="flex-auto p-2 pl-6">
                                <dt class="flex flex-row">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg> 
                                    <span class="opacity-50 mr-3 ml-1">
                                        {new Date(m.start_dt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                        })}
                                    </span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                    <span class="opacity-50">
                                        {m.court}
                                    </span>
                                </dt>
                                <dd class="flex gap-2 pr-2 mx-auto justify-center mt-1">
                                <dd>
                                    <div class=" p-4 flex flex-col overflow-x-auto	">
                                        <table class="border-collapse">
                                            {#if !matchEditing[index].editing}
                                                <tr>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {m.participant1.first_name} 
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center {m.p1_winner == null ? "bg-orange-600":""} {m.p1_winner == "true"?"bg-green-600":""} {m.p1_winner == "false"?"bg-red-600":""}">
                                                        {#if m.p1_score != null}
                                                            {m.p1_score}
                                                        {:else}
                                                            -
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set1_p1 != null}
                                                            {m.set1_p1}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set2_p1 != null}
                                                            {m.set2_p1}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set3_p1 != null}
                                                            {m.set3_p1}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set4_p1 != null}
                                                            {m.set4_p1}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set5_p1 != null}
                                                            {m.set5_p1}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {m.participant2.first_name}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center {m.p1_winner == null ? "bg-orange-600":""} {m.p1_winner == "true"?"bg-red-600":""} {m.p1_winner == "false"?"bg-green-600":""}">
                                                        {#if m.p2_score != null}
                                                            {m.p2_score}
                                                        {:else}
                                                            -
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set1_p2 != null}
                                                            {m.set1_p2}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set2_p2 != null}
                                                            {m.set2_p2}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set3_p2 != null}
                                                            {m.set3_p2}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set4_p2 != null}
                                                            {m.set4_p2}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {#if m.set5_p2 != null}
                                                            {m.set5_p2}
                                                        {:else}
                                                            0
                                                        {/if}
                                                    </td>
                                                </tr>
                                            {:else}   
                                                <tr>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {m.participant1.first_name} 
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center {m.p1_winner == null ? "bg-orange-600":""} {m.p1_winner == "true"?"bg-green-600":""} {m.p1_winner == "false"?"bg-red-600":""}">
                                                        {#if m.p1_score != null}
                                                            {m.p1_score}
                                                        {:else}
                                                            -
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set1_p1}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set2_p1}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set3_p1}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set4_p1}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set5_p1}/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        {m.participant2.first_name}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center {m.p1_winner == null ? "bg-orange-600":""} {m.p1_winner == "true"?"bg-red-600":""} {m.p1_winner == "false"?"bg-green-600":""}">
                                                        {#if m.p2_score != null}
                                                            {m.p2_score}
                                                        {:else}
                                                            -
                                                        {/if}
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set1_p2}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set2_p2}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set3_p2}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set4_p2}/>
                                                    </td>
                                                    <td class="border border-solid p-4 px-6 text-center">
                                                        <input class="input w-16" title="Input (number)" type="number" bind:value={matchEditing[index].set5_p2}/>
                                                    </td>
                                                </tr>
                                            {/if}
                                        </table>
                                        <div>
                                            {#if !matchEditing[index].editing}
                                                <button class="btn variant-filled w-24 mt-2" on:click={() => {editMatch(index)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                    </svg>
                                                    <span>Edit</span>
                                                </button>
                                            {:else}
                                                <button class="btn variant-filled mt-2 ml-2" on:click={() => {editMatch(index)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                    <span>Cancel</span>
                                                </button>
                                                <button class="btn variant-filled-success mt-2 ml-2" on:click={() => {saveEdit(index)}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
                                                    </svg>
                                                    <span class='text-white'>Save</span>
                                                </button>
                                            {/if}
                                        </div>
                                    </div>
                                </dd>
                            </span>
                        </div>
                    {/each}
                </dl>
            {:else}
            <div class="pl-2 pt-6">
                <span class="italic m-2">No Matches yet</span>
            </div>
            {/if}
        {:else}
            <div class="pl-2 pt-6">
                <span class="italic m-2">No Matches yet</span>
            </div>
        {/if}
    {:else if radioValue == 1}
        {#if matchesCategory != undefined }
            {#if matchesCategory.length > 0}
                {#each matchesCategory as c}
                    <div class="p-4 pb-0 text-2xl mt-4">{c.category.category_name} ({c.category.type})</div>
                    {#if c.matches.length > 0}
                        <dl class="list-dl mt-2">
                            {#each c.matches as m}
                                <div class="p-2 px-4 m-1 w-full text-token card space-y-4">
                                        <!-- <span class="badge bg-primary-500">💀</span> -->
                                        <span class="flex-auto p-2 pl-6">
                                            <dt class="text-2xl">
                                                {m.participant1.first_name} VS {m.participant2.first_name} 
                                            </dt>
                                            <dd class="flex gap-2 pr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg> 
                                                <span class="opacity-50">
                                                    {new Date(m.start_dt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })}
                                                </span>
                                            </dd>
                                            <dd class="flex gap-2 pr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                </svg>
                                                <span class="opacity-50">
                                                    {m.court}
                                                </span>
                                            </dd>
                                        </span>
                                    <!-- <span class="badge variant-filled">{m.category.category_name}</span> -->
                                </div>
                                
                            {/each}
                        </dl>
                    {:else}
                        <div class="pl-2 pt-6">
                            <span class="italic m-2">No Matches yet</span>
                        </div>
                    {/if}
                {/each}
            {:else}
                <div class="pl-2 pt-6">
                    <span class="italic m-2">No Matches yet</span>
                </div>
            {/if}
        {:else}
            <div class="pl-2 pt-6">
                <span class="italic m-2">No Matches yet</span>
            </div>
        {/if}
    {/if}
    </div>