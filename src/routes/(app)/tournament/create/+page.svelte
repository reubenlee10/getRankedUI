<script lang="ts">
	import { goto } from '$app/navigation';
	import { APIService } from '$lib/services/api.service';
	import { Stepper, Step, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
	let createPressed = false

	let tournamentName: string,
		sport: string,
		type: string,
		startDate: string,
		endDate: string,
		lastRegisterDate: string,
		regulations: string,
		categories: string,
		location: string,
		address: string,
		noOfCourts: number;

	async function onCompleteHandler(){
		if (!createPressed){
			createPressed = true
			let tournament_id: string = await APIService.createTournament(
				tournamentName,
				sport,
				type,
				startDate,
				endDate,
				lastRegisterDate,
				regulations,
				categories,
				location,
				address,
				noOfCourts
			);

			if (tournament_id != ""){
				toastStore.trigger({
						message: 'Tournament Successful Created',
						background: 'variant-filled-success',
					});

					setTimeout(() => {goto("/tournament/admin")}, 2000);
			}else{
				toastStore.trigger({
						message: 'Failed to Create Tournament. Please Try Again',
						background: 'variant-filled-error',
					});
				createPressed = false
			}
			return tournament_id;
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h1 class="text-3xl">Create Tournament</h1>
		<div class="w-full card p-6 text-token m-3">
			<Stepper on:complete={onCompleteHandler}>
				<Step>
					<svelte:fragment slot="header">Tournament Details</svelte:fragment>
					<input
						required
						bind:value={tournamentName}
						class="input"
						type="text"
						placeholder="Tournament Name"
					/>
					<label class="label">
						<span>Sport</span>
						<select required class="select" bind:value={sport}>
							<option value="squash">Squash</option>
							<!-- <option value="football">football</option> -->
						</select>
					</label>
					<label class="label">
						<span>Type</span>
						<select required class="select" bind:value={type}>
							<option value="circuit">Circuit</option>
							<!-- <option value="roundRobin">Round Robin</option> -->
						</select>
					</label>
				</Step>
				<Step>
					<svelte:fragment slot="header">Dates</svelte:fragment>
					<label class="label">
						<span>Start Date</span>
						<input bind:value={startDate} class="input" title="Start Date" type="datetime-local" />
					</label>
					<label class="label">
						<span>End Date</span>
						<input bind:value={endDate} class="input" title="Start Date" type="datetime-local" />
					</label>
					<label class="label">
						<span>Last Day to Register</span>
						<input
							bind:value={lastRegisterDate}
							class="input"
							title="Last Day to Register"
							type="datetime-local"
						/>
					</label>
				</Step>
				<Step>
					<svelte:fragment slot="header">Tournament Details</svelte:fragment>
					<textarea
						bind:value={regulations}
						class="textarea"
						rows="4"
						placeholder="Tournament Regulations"
					/>
					<label class="label">
						<span>Categories (separated by comma ",")</span>
						<input
							required
							bind:value={categories}
							class="input"
							type="text"
							placeholder="Categories eg. 'U18B,U18G,U21B,U21G'"
						/>
					</label>
				</Step>
				<Step>
					<svelte:fragment slot="header">Tournament Location</svelte:fragment>
					<label class="label">
						<span>Location Name</span>
						<input
							required
							bind:value={location}
							class="input"
							type="text"
							placeholder="Location Name"
						/>
					</label>
					<label class="label">
						<span>Location Address</span>
						<textarea
							required
							bind:value={address}
							class="textarea"
							rows="4"
							placeholder="Location Address"
						/>
					</label>
					<label class="label">
						<span>Number of Courts</span>
						<input bind:value={noOfCourts} class="input" title="Number of Courts" type="number" />
					</label>
				</Step>
			</Stepper>
		</div>
	</div>
</div>

<style>
</style>
