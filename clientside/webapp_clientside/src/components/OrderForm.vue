
<template>
	<div class="order-form">
		<h2>{{ isEdit ? 'Edit Order' : 'Add Order' }}</h2>

		<div v-if="error" class="error">{{ error }}</div>

		<div class="field">
			<label>Customer</label>
			<input v-model="form.customer" type="text" placeholder="Customer email" />
		</div>

		<div class="field">
			<label>Items (comma separated)</label>
			<input v-model="form.items" type="text" placeholder="Margherita, Queen" />
		</div>

		<div class="field">
			<label>Status</label>
			<select v-model="form.status">
				<option value="pending">Pending</option>
				<option value="confirmed">Confirmed</option>
				<option value="preparing">Preparing</option>
				<option value="ready">Ready</option>
				<option value="delivered">Delivered</option>
			</select>
		</div>

		<div class="field">
			<label>Total</label>
			<input v-model.number="form.total" type="number" step="0.01" />
		</div>

		<div class="actions">
			<button @click="save" class="btn">Save</button>
			<button @click="$emit('cancel')" class="btn muted">Cancel</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as api from '@/services/api.js'

const router = useRouter()
const route = useRoute()
const isEdit = ref(false)
const error = ref('')

const form = ref({ customer: '', items: '', status: 'pending', total: 0 })

onMounted(async () => {
	const id = route.params.id
	if (id) {
		isEdit.value = true
		try {
			const data = await api.getOrder(id)
			form.value = { customer: data.customer || '', items: data.items || '', status: data.status || 'pending', total: data.total || 0 }
		} catch (e) {
			error.value = 'Failed to load order'
		}
	}
})

const save = async () => {
	error.value = ''
	try {
		if (isEdit.value) {
			await api.updateOrder(route.params.id, form.value)
		} else {
			await api.addOrder(form.value)
		}
		router.push('/orders')
	} catch (e) {
		error.value = 'Failed to save order'
	}
}
</script>

<style scoped>
.order-form { max-width:600px; margin:0 auto; background:#fff; padding:1.5rem; border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,0.08) }
.field { display:flex; flex-direction:column; margin-bottom:1rem }
.field label { font-weight:600; margin-bottom:0.5rem }
.field input, .field select { padding:0.6rem; border:1px solid #ddd; border-radius:6px }
.actions { display:flex; gap:1rem; justify-content:flex-end }
.btn { background:#8f2e2e; color:#fff; padding:0.6rem 1rem; border-radius:6px; border:none; cursor:pointer }
.btn.muted { background:#ddd; color:#333 }
.error { background:#ffecec; color:#b33; padding:0.6rem; border-radius:6px; margin-bottom:1rem }
</style>

