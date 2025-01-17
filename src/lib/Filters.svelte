<script>
	import ChevronDown from './ChevronDown.svelte';
	import Dot from './Dot.svelte';
	let { onUpdate, trials=[], providers=[] } = $props();
	let isOpen = $state((window?.innerWidth || 0) > 600);
	let isTrialsOpen = $state(true);
	let isProvidersOpen = $state(false);
	let activeFilterValues = $state([]);
	const toKey = (type, value) => `${type}.${value}`;
	const handleHeaderClick = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		isOpen = !isOpen;
	};
	const handleTrialHeaderClick = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		isTrialsOpen = !isTrialsOpen;
	};
	const handleProviderHeaderClick = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		isProvidersOpen = !isProvidersOpen;
	};
	const clearFilters = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		activeFilterValues = [];
		onUpdate({ trials: [], providers: [] });
	};
	const isFilteringFor = (type, value) => {
		return activeFilterValues.includes(toKey(type, value));
	};
	const handleTrialChange = (ev) => {
		handleInputChange('Trial', ev.target.value);
	};
	const handleProviderChange = (ev) => {
		handleInputChange('Provider', ev.target.value);
	};
	const handleInputChange = (type, value) => {
		const key = toKey(type, value);
		if (isFilteringFor(type, value)) {
			activeFilterValues = activeFilterValues.filter((item) => item !== key);
		} else {
			activeFilterValues = [...activeFilterValues, key];
		}
		onUpdate({
			trials: activeFilterValues
				.filter((item) => item.startsWith('Trial.'))
				.map((item) => item.replace('Trial.', '')),
			providers: activeFilterValues
				.filter((item) => item.startsWith('Provider.'))
				.map((item) => item.replace('Provider.', '')),
		});
	};
</script>

<div class="filters" class:isOpen>
	<div class="filters__header">
		<div class="filters__headerbar" onclick={handleHeaderClick} onkeypress={handleHeaderClick} role="button" tabindex="0">
			<h2 class="filters__title">Filters {activeFilterValues.length > 0 ? `(${activeFilterValues.length})` : ``}</h2>
			<div class="filters__icon">
				<ChevronDown />
			</div>
		</div>
		{#if activeFilterValues.length > 0}
			<button class="filters__clear" onclick={clearFilters}>Clear filters</button>
		{/if}
	</div>
	{#if isOpen}
		<div class="groups">
			<div class="group" class:groupIsOpen={isTrialsOpen}>
				<div class="group__title" onclick={handleTrialHeaderClick} onkeypress={handleTrialHeaderClick} role="button" tabindex="0">Trial type <ChevronDown /></div>
				{#if isTrialsOpen}
					<div class="group__list">
						{#each trials as option}
							<label>
								<input
									name={option}
									value={option}
									type="checkbox"
									onchange={handleTrialChange}
									checked={isFilteringFor('Trial', option)}
								/><Dot flavor={option} />{option}</label>
						{/each}
					</div>
				{/if}
			</div>
			<div class="group" class:groupIsOpen={isProvidersOpen}>
				<div class="group__title" onclick={handleProviderHeaderClick} onkeypress={handleProviderHeaderClick} role="button" tabindex="0">Provider <ChevronDown /></div>
				{#if isProvidersOpen}
					<div class="group__list">
						{#each providers as option}
							<label>
								<input
									name={option}
									value={option}
									type="checkbox"
									onchange={handleProviderChange}
									checked={isFilteringFor('Provider', option)}
								/>{option}</label>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.filters {
		background-color: white;
		box-shadow: 0px 2px 4px rgba(0,0,0,0.21);
		position: absolute;
		top: 26px;
		left: 26px;
		width: 23vw;
		min-width: 246px;
		max-width: 420px;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: calc(100% - 52px);
	}

	.filters__header {
		position: sticky;
		top: 0;
		background: white;
		border-bottom: 1px solid #f2f2f2;
		padding: 0;
	}
	.filters__headerbar {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		cursor: pointer;
		padding: 12px 14px 7px;
	}

	.filters__clear {
		appearance: none;
		cursor: pointer;
		font: inherit;
		background: none;
		border: none;
		text-align: left;
		padding: 10px 14px 10px 14px;
		flex-basis: 100%;
		margin-top: 5px;
		font-size: .7rem;
		font-weight: bold;
		margin-bottom: 0;
		text-transform: uppercase;
		color: #ED716D;
	}

	.filters__icon {
		width: 18px;
		height: 12px;
		position: relative;
		display: flex;
		align-items: center;
		transition: transform .2s ease-in-out;
	}
	.filters__icon :global(svg) {
		width: 100%;
	}

	.isOpen .filters__icon {
		transform: rotate(180deg);
	}

	.filters__title {
		flex-grow: 1;
		font-size: 18px;
		line-height: 21px;
		letter-spacing: 0.15px;
		text-transform: uppercase;
		margin: 0;
		position: relative;
	}



	.groups {
		top: 66px;
		padding-top: 16px;
		padding-bottom: 16px;
		bottom: 0;
	}

	/* Each list of filters is in this group box */
	.group {
		padding-left: 16px;
		padding-right: 16px;
		margin-bottom: 14px;
		padding-bottom: 14px;
		border-bottom: #F2F2F2 solid 1px;
	}

	/* Don't add a border or anything to bottom one */
	.group:last-child {
		border-bottom: 0;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	/* The title of the filter/group */
	.group__title {
		font-weight: 700;
		font-size: 16px;
		line-height: 24px;
		display: flex;
		gap: 8px;
		cursor: pointer;
		margin-bottom: 16px;
	}
	.group__title :global(svg) {
		width: 15px;
		display: flex;
		align-items: center;
		transition: transform .2s ease-in-out;
	}

	.groupIsOpen .group__title :global(svg) {
		transform: rotate(180deg);
	}

	/* The div containing all the checkboxes and labels */
	.group__list {

	}

	/* Style the label for fitler */
	.group__list label {
		display: block;
		font-size: 16px;
		line-height: 1.4;
		cursor: pointer;
		padding-bottom: 8px;
		user-select: none;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	/* Style the input for filter */
	.group__list input {
		appearance: none;
		outline: 0;
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		flex-grow: 0;
		cursor: pointer;
	}

	/* When the input isn't checked */
	.group__list input:not(:checked) {
		background: white;
		border: 1px solid #979797 !important;
	}

	/* When the input isn't checked but is hovered */
	.group__list input:not(:checked):hover {
		border: 1px solid #0076FF !important;
	}

	/* When the input is checked */
	.group__list input:checked {
		background: #0076FF;
		color: white;
		position: relative;
	}

	/* Style the custom tick */
	.group__list input:checked::after {
		content: '';
		position: absolute;
		width: 1.4ex;
		height: 0.7ex;
		background: transparent;
		top: 0.7ex;
		left: 0.6ex;
		border: 2px solid white;
		border-top: none;
		border-right: none;
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}

</style>