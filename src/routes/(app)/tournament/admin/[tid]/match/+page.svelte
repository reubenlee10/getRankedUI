<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { Accordion, AccordionItem, RadioGroup, RadioItem, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	let response: any;
	let tid: any;
	let playersReponse: any;
	let matchesCategory: any[];
    let drawResponse: any[];
	let matchesAll: any[];
	let radioValue: number = 0;
    let matchEditing:any[] = [];
    let brackets = ["0", "3-4", "5-8" , "7-8", "9-16", "11-12", "13-16", "15-16", "17-32", "19-20", "21-24", "23-24", "25-32", "27-28", "29-32", "31-32"]
    let rounds = ["Final", "Semi-Final", "Round1", "Round2", "Round3", "Round4"]
    let categories = [
    {   
        id: "4834479a47f047b29142518fc5b66e51",
        name : "Open",
        colour : "red"
    }, 
    {
        id: "c41292d5c88e4a7197b5c7a3b662d63d",
        name : "Senior",
        colour : "orange"
    }, 
    {   
        id: "be1cdca58c84445eb8c2a0c366c7385b",
        name : "Junior",
        colour : "green"
    }]

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

    function getCategoryName(id:string){
        for(let i = 0; i < categories.length; i++){
            if (categories[i].id == id){
                return categories[i].name
            }
        }
    }

    function getCategoryColour(id:string){
        for(let i = 0; i < categories.length; i++){
            if (categories[i].id == id){
                console.log(id, " : ", categories[i].colour)
                return categories[i].colour
            }
        }
    }

    async function getDraw(){
		let drawResponseOld = await APIService.getDraw(tid);
        // for (let i = 0; i < drawResponseOld.length; i++){
        //     console.log("i",i)
        //     console.log(drawResponseOld[i])
        //     for (let j = 0; j < drawResponseOld[i].matches.length; j++){
        //         console.log("j",j)
        //         console.log(drawResponseOld[i].matches[j])
        //         try{
        //             if (drawResponseOld[i].brackets_old == undefined){
        //                 drawResponseOld[i].brackets_old = []
        //             }
        //             // if (drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)] == undefined){
        //             //     console.log("IN")
        //             //     drawResponseOld[i].brackets_old.push([])
        //             // }
        //             drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)][drawResponseOld[i].matches[j].round].push(drawResponseOld[i].matches[j])
        //         }catch(e){
        //             console.log(e)
        //             drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)].push([])
        //             console.log(drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)])
        //             drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)][drawResponseOld[i].matches[j].round].push(drawResponseOld[i].matches[j])
        //             // drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)][drawResponseOld[i].matches[j].round][drawResponseOld[i].matches[j]]
        //             // try{
        //             //     drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)][drawResponseOld[i].matches[j].round].push([drawResponseOld[i].matches[j]])
        //             // }catch(e){
        //             //     drawResponseOld[i].brackets_old[Number(drawResponseOld[i].matches[j].bracket)][drawResponseOld[i].matches[j].round].push([drawResponseOld[i].matches[j]])
        //             // }
        //             // drawResponseOld[i].brackets_old[drawResponseOld[i].matches[j].round].push()
        //         }
        //     }
            // drawResponseOld[i].brackets = []
            // for (let k = 0; k < drawResponseOld[i].brackets_old.length; k++){
            //     // console.log(drawResponseOld[i].brackets_old[k])
            //     for (let m = 0; m < drawResponseOld[i].brackets_old[k].length; m++){
            //         // console.log(drawResponseOld[i].brackets_old[k][m])
            //         // try{
            //         // console.log(drawResponseOld[i].brackets_old[k][m])
            //         if (drawResponseOld[i].brackets[drawResponseOld[i].brackets_old[k]] != undefined){
            //             drawResponseOld[i].brackets[drawResponseOld[i].brackets_old[k]] = [[drawResponseOld[i].brackets_old[k][m]]]
            //         }else{
            //             try{
            //                 drawResponseOld[i].brackets[drawResponseOld[i].brackets_old[k]][m].push(drawResponseOld[i].brackets_old[k][m])
            //             }catch{
            //                 drawResponseOld[i].brackets[drawResponseOld[i].brackets_old[k]].push(drawResponseOld[i].brackets_old[k][m])
            //             }
            //         }
            //         // }catch(e){
            //         //     // if (drawResponseOld[i].brackets[drawResponseOld[i].brackets_old[k]])
            //         //     drawResponseOld[i].brackets.push([drawResponseOld[i].brackets_old[k]])
            //         //     drawResponseOld[i].brackets[drawResponseOld[i].matches[j].round].push()
            //         // }
            //     }
            // }
        //     drawResponseOld[i].brackets = drawResponseOld[i].brackets_old

        // }
        for (let i = 0; i < drawResponseOld.length; i++){
            console.log(Object.keys(drawResponseOld[i].matches).length)
        }

        console.log(drawResponseOld)
        drawResponse = drawResponseOld
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
        <RadioItem bind:group={radioValue} name="justify" value={0} on:click={getAndOrderMatch}>Results</RadioItem>
        <RadioItem bind:group={radioValue} name="justify" value={1} on:click={getMatchesByCategory}>Matches</RadioItem>
        <RadioItem bind:group={radioValue} name="justify" value={2} on:click={getDraw}>Draw</RadioItem>
        <!-- <RadioItem bind:group={radioValue} name="justify" value={2}>(label)</RadioItem> -->
    </RadioGroup>
    <!-- RESULTS  -->
    {#if radioValue == 0}
        {#if matchesAll != undefined }
            {#if matchesAll.length > 0}
                <dl class="mt-2">
                    <Accordion class="card p-4 text-token m-1">
                    {#each matchesAll as m, index}
                                <AccordionItem >
                                    <!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
                                    <svelte:fragment slot="summary">
                                        <div class="flex justify-between">
                                            <p class="basis-3/5"> 
                                                <span class="mr-1 badge bg-{getCategoryColour(m.category_id)}-600">{getCategoryName(m.category_id)}</span>
                                                {m.participant1.first_name} ({m.p1_score == null?0:m.p1_score}) vs {m.participant2.first_name} ({m.p2_score == null?0:m.p2_score})
                                            </p>
                                            <div class="flex basis-2/5 justify-end">
                                                <div class="flex">
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
                                                </div>
                                                <!-- Court -->
                                                <div class="flex">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg>
                                                    <span class="opacity-50">
                                                        {m.court}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </svelte:fragment>
                                    <svelte:fragment slot="content">
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
                                    </svelte:fragment>
                                </AccordionItem>
                    {/each}
                    </Accordion>
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
    <!-- MATCHES -->
    {:else if radioValue == 1}
    <!-- MATCHES  -->
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
    {:else if radioValue == 2}
    <!-- DRAW -->
    <div class="flex flex-col">
        {#if drawResponse != undefined}
            {#each drawResponse as category}
            <button class="btn variant-filled w-14 mt-2" on:click={getDraw}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>
            <div class="">
                <br>
                <span class="text-4xl text-red-300">
                    {category.category.category_name}
                <br>
                </span>
                <div class="">
                    {#each category.matches as bracket}
                        <span class="text-2xl text-yellow-300">
                            {brackets[bracket[0][0].bracket]=="0"?"": "" + brackets[bracket[0][0].bracket] + " placing"}
                        </span>
                        <div class="flex flex-row  overflow-auto">
                        {#each bracket as round}
                            <div class="flex flex-col justify-around">
                                {#each round as match}
                                    <div class="card m-2 variant-filled-surface p-4 w-44 rounded-md"> 
                                        <div class="flex flex-col">
                                            <span class="text-red-300 font-extrabold">{match.match}</span>
                                            <span class="text-right ">{match.participant1.first_name} <span>({match.p1_score == null?0:match.p1_score})</span></span>
                                            
                                            <hr>
                                            <span class="text-right">{match.participant2.first_name} <span>({match.p2_score == null?0:match.p2_score})</span></span>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {/each}
                        </div>
                    {/each}
                </div>
            </div>
            {/each}
        {/if}
    </div>
    {/if}
    </div>