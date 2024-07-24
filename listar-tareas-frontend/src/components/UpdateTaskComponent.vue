<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-text">
            <h1 class="modal-title">Update</h1>
            <form class="form">
                <div class="form-group">
                    <label for="exampleInputName">Task Name</label>
                    <input type="text" class="form-control" id="exampleInputName" aria-describedby="nameHelp"
                        :placeholder="task.name" v-model="name">
                </div>
                <div class="form-group">
                    <label for="exampleInputResponsible">responsible</label>
                    <select v-model="responsible" class="form-control">
                        <option v-for="user in users" :key="user.is" :value="user.name">{{ user.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="exampleInputStatus">Status</label>
                        <select v-model="status" class="form-control" :placeholder="task.status">
                            <option value="pending">pending</option>
                            <option value="in_progress">in_progress</option>
                            <option value="finalized">finalized</option>
                        </select>
                </div>
                <button type="submit" class="btn btn-primary"
                    @click.prevent="updateTask(taskId, task.name, task.responsible, task.status)">Submit</button>
                <p class="feedback">{{ feedback }}</p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import useAuth from '@/store/auth';

const store = useAuth();
const name = ref('');
const responsible = ref('');
const status = ref('');
const users = ref([]);
const feedback = ref('');

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    taskId: {
        type: String,
        required: true
    }
})

const emits = defineEmits(['close', 'update'])

const close = () => {
    emits('close')
    emits('update')
}

const updateTask = async (taskId, nameUpdate, responsibleUpdate, statusUpdate) => {

    if (name.value === '') {
        name.value = nameUpdate
    }
    if (responsible.value === '') {
        responsible.value = responsibleUpdate
    }
    if (status.value === '') {
        status.value = statusUpdate
    }

    const response = await store.updateTask(taskId, name.value, responsible.value, status.value)

    if (response == false) {
        feedback.value = 'Update error'
    } else {
        close();
    }
}

onMounted(async () => {
   users.value = await store.fetchUsers()
});
</script>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    max-width: 50%;
    max-height: 80%;
    background: white;
    text-align: center;
    cursor: default;
}

.modal-title {
    font-size: 2rem;
    margin-bottom: 20px;
}

.form {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
}

.form-control {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.feedback {
    margin-top: 10px;
    color: red;
}
</style>