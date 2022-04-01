<template>
<div class="box">
	<label  class="active" for="availableDays"><b>Sexta</b>
	<input
	name="availableDays"
	type="checkbox" 
	class="reset-checkbox"
	/></label>
	<div>
		<label  class="active" for="open">Abre:</label>
		<input
	name="open"
	type="time" 
	/>
	</div>
		<div>
		<label  class="active" for="close">Fecha:</label>
		<input
	name="close"
	type="time" 
	/>
	</div>
</div>
</template>
<script>
export default {
	name:"hi-check-open-close-time"
}
</script>
<style scoped>
.box {
	padding: 10px;
	border-radius: 5px;
}
</style>