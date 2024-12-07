<script>
	let { onUpdate, trials=[], providers=[] } = $props();
	let isOpen = $state(false);
	let activeFilterValues = $state([]);
	const toKey = (type, value) => `${type}.${value}`;
	const handleHeaderClick = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		isOpen = !isOpen;
	};
	const clearFilters = (ev) => {
		ev.preventDefault();
		ev.stopPropagation();
		activeFilterValues = [];
		onUpdate(activeFilterValues);
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
	<div class="filters__header" onclick={handleHeaderClick} onkeypress={handleHeaderClick} role="button" tabindex="0">
		<h2 class="filters__title">Filters {activeFilterValues.length > 0 ? `(${activeFilterValues.length})` : ``}</h2>
		<div class="filters__icon">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 11">
				<path fill="none" fill-rule="evenodd" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 9.334L8.562 1l7.249 7.989"/>
			</svg>
</div>
		{#if activeFilterValues.length > 0}
			<button class="filters__clear" onclick={clearFilters}>Clear filters</button>
		{/if}
	</div>
	{#if isOpen}
		<div class="groups">
			<div class="group">
				<h3 class="group__title">Trial type</h3>
				<div class="group__list">
					{#each trials as option}
						<label>
							<input
								name={option}
								value={option}
								type="checkbox"
								onchange={handleTrialChange}
								checked={isFilteringFor('Trial', option)}
							/>{option}</label>
					{/each}
				</div>
			</div>
			<div class="group">
				<h3 class="group__title">Provider</h3>
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
	}

	.isOpen {
		bottom: 26px;
	}

	.filters__header {
		position: sticky;
		top: 0;
		display: flex;
		flex-wrap: wrap;
		cursor: pointer;
		padding: 12px 14px;
		background: white;
		border-bottom: 1px solid #f2f2f2;
	}

	.filters__clear {
		appearance: none;
		font: inherit;
		background: none;
		border: none;
		text-align: left;
		padding: 0;
		flex-basis: 100%;
		margin-top: 15px;
		font-size: .7rem;
		font-weight: bold;
		margin-bottom: 0;
		text-transform: uppercase;
		color: #ED716D;
	}

	.filters__icon {
		width: 18px;
		display: flex;
		align-items: center;
		transition: transform .2s ease-in-out;
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
	}

	/* The div containing all the checkboxes and labels */
	.group__list {

	}

	/* Style the label for fitler */
	.group__list label {
		display: block;
		font-size: 16px;
		line-height: 1.4;
		padding-left: 31px;
		cursor: pointer;
		padding-bottom: 8px;
		user-select: none;
	}

	/* Style the input for filter */
	.group__list input {
		appearance: none;
		outline: 0;
		width: 18px;
		height: 18px;
		margin: 0px 14px -3px -31px;
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