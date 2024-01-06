<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { Accordion, AccordionItem, RadioGroup, RadioItem, Tab, TabGroup, getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	let response: any;
	let tid: any;
	let joined: any;
	let playersReponse: any;
	let category: any;
	let matchesCategory: any[];
	let matchesAll: any[];
	const toastStore = getToastStore();
	let radioValue: number = 0;
	let tabSet: number = 0;
	let joinedPressed = false
    let drawResponse: any[];
    let matchEditing:any[] = [];
    let brackets = ["0", "3-4", "5-8" , "7-8", "9-16", "11-12", "13-16", "15-16", "17-32", "19-20", "21-24", "23-24", "25-32", "27-28", "29-32", "31-32"]

	onMount(async function () {
		let uid = localStorage.getItem('auth-id');
		tid = window.location.href.split('/')[5];

		response = await APIService.getTournament(tid);

		playersReponse = await APIService.getTournamentPlayers(tid);

		if (playersReponse.length > 0){
			for (let i = 0; i < playersReponse.length; i++) {
				for (let j = 0; j < playersReponse[i].players.length; j++) {
					if (playersReponse[i].players[j].id == uid) {
						joined = true;
						break;
					}
				}
			}
			if (joined == undefined ){
				joined = false;
			}
		}else{
			joined = false;
		}

		
	});

	async function join() {
		if (!joinedPressed){
			joinedPressed = true
			if (category != undefined && category != ""){
				let joinResponse = await APIService.joinTournament(tid, category);
				if (joinResponse.code == 0) {
					toastStore.trigger({
						message: 'Successfully joined tournament!',
						background: 'variant-filled-success'
					});	
					joined = true;
					playersReponse = await APIService.getTournamentPlayers(tid);
				} else if (joinResponse.code == 1) {
					toastStore.trigger({
						message: 'Failed to join tournament',
						background: 'variant-filled-error'
					});
					joinedPressed = true
				} else {
					toastStore.trigger({
						message: 'Internal Server Error',
						background: 'variant-filled-error'
					});
					joinedPressed = true
				}
			}
		}
	}

	async function getMatchesAll(){
		let matchesResponse = await APIService.getMatchesAll(tid);
		matchesAll = matchesResponse
	}

	async function getMatchesByCategory(){
		let matchesResponse = await APIService.getMatchesByCategory(tid);
		matchesCategory = matchesResponse
	}

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


</script>

<div class="container h-full mx-auto flex flex-col gap-2 m-4">
	<a href="/tournament" class="btn variant-filled w-24 mb-4">
		<span>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
			</svg>
		</span>
		<span>Back</span>
	</a>
	<TabGroup>
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead">
				<div class="flex flex-row gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
					</svg>
					<span>Details</span>
				</div>

			</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value={1} on:click={getMatchesAll}>
			<svelte:fragment slot="lead">
				<div class="flex flex-row gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
					</svg>
					<span>Matches</span>
				</div>
			</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value={2}>
			<svelte:fragment slot="lead">
				<div class="flex flex-row gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
					</svg>
					<span>Players</span>
				</div>
			</svelte:fragment>
		</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<!-- Details -->
			{#if tabSet === 0}
				<div class="flex m-2 flex-col">
					{#if response != undefined}
						<div class=" flex items-center text-6xl mb-5">
							<p>
								{response.tournament.tournament_name}
							</p>
						</div>
						<div class="space-y-10 flex flex-coltext-xl flex-col">
							<div class="table-container">
								<!-- Native Table Element -->
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
											<td ><div class="whitespace-pre-wrap" style="white-space: pre-wrap;">{response.tournament.regulations}</div></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="flex justify-end">
								<div class="ml-2">
									{#if joined != undefined}
										{#if joined}
											<button class="ml-auto mt-0 btn variant-filled-tertiary justify-center">
												Joined &nbsp;<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
													<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
											</button
											>
										{:else}
											<select class="select w-48" bind:value={category}>
												<option value="" selected disabled>Category</option>
												{#each response.categories as c}
													<option value="{c.category_id}">{c.category_name} ({c.type})</option>
												{/each}
											</select>
											<button on:click={join} class="ml-auto mt-0 btn variant-filled-tertiary justify-center">
												Join Tournament
											</button>
										{/if}
									{/if}
								</div>
							</div>
						</div>
					{/if}
				</div>
			{:else if tabSet === 1}
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
                                            <p class="basis-3/5"> {m.participant1.first_name} ({m.p1_score == null?0:m.p1_score}) vs {m.participant2.first_name} ({m.p2_score == null?0:m.p2_score})</p>
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
			{:else if tabSet === 2}
				<div>
					<div class="flex flex-col">
						{#if playersReponse != undefined}
							{#if playersReponse.length <= 0}
								<span class="italic my-3">No registered players yet.</span>
							{:else}
								{#each playersReponse as c}
									<div class="w-full text-token card p-4 space-y-4 m-4">
										<span class="font-bold text-2xl mt-2 mb-1">{c.category.category_name} ({c.category.type})</span>
										<ol class="list">
											{#each c.players as p, i}
												<li>
													<span class="badge-icon p-4 variant-soft-primary">{i + 1}</span>
													<span class="flex-auto">{p.first_name} {p.last_name}</span>
												</li>
											{/each}
										</ol>
									</div>
								{/each}
							{/if}
						{/if}
					</div>
					<div />
				</div>
			{/if}
		</svelte:fragment>
	</TabGroup>
	
</div>

<style>
</style>
