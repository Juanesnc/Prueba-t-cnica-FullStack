<template>
  <div class="container" v-show="showMessage">
    <div class="title">
      <h1 class="title-text">TaskList</h1>
      <a @click.prevent="logout" class="logout-link">Logout</a>
    </div>
    <div class="filters">
      <button @click="openModalCreate" class="btn btn-primary">Create</button>
      <input type="text" v-model="filter.name" placeholder="Buscar Por Nombre..." class="form-control filter-input">
      <select v-model="filter.status" class="form-control filter-select">
        <option value="">Todos los estados</option>
        <option value="pending">pending</option>
        <option value="in_progress">in_progress</option>
        <option value="finalized">finalized</option>
      </select>
      <button @click="filterTasks()" class="btn btn-secondary">Filtrar</button>
    </div>
    <table class="table table-striped" v-if="tasks.length > 0">
      <thead>
        <tr>
          <th scope="col">Nombre Tarea</th>
          <th scope="col">Responsable</th>
          <th scope="col">Estado</th>
          <th scope="col">Fecha de Asignacion</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.name }}</td>
          <td>{{ task.responsible }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.assignment_date }}</td>
          <td><button @click="openModalUpdate(task.id)" class="btn btn-warning">Update</button></td>
          <td><button @click="deleteTask(task.id)" class="btn btn-danger">Delete</button></td>

          <UpdateTaskComponent v-if="showModalU" :task="task" :taskId="taskId" @close="closeModalUpdate()" @update="filterTasks()" />
        </tr>
      </tbody>
    </table>
    <p v-if="showMessage && tasks.length == 0">No data yet.</p>
  </div>
  <CreateTaskComponent v-if="showModalC" @close="closeModalCreate" @update="filterTasks()" />
</template>

<script setup>
import useAuth from '@/store/auth';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import CreateTaskComponent from '@/components/CreateTaskComponent.vue';
import UpdateTaskComponent from '@/components/UpdateTaskComponent.vue';

const route = useRoute();
const store = useAuth();
const tasks = ref([]);
const filter = ref({
  name: '',
  status: '',
})
const id = route.params.id;
const taskId = ref('')

const showModalC = ref(false);
const showModalU = ref(false);
const showMessage = ref(false);

onMounted(async () => {
  tasks.value = await store.getTasks(id, filter.value.name, filter.value.status);
  setTimeout(() => {
    showMessage.value = true;
  }, 500);
})

const openModalCreate = () => {
  showModalC.value = true;
}

const openModalUpdate = (task) => {
  taskId.value = task;
  showModalU.value = true;
}

const closeModalCreate = () => {
  showModalC.value = false
}

const closeModalUpdate = () => {
  showModalU.value = false
}

const deleteTask = async (idD) => {
  store.deleteTask(idD);
  filterTasks()
}

const filterTasks = async () => {
  tasks.value = await store.getTasks(id, filter.value.name, filter.value.status);
}

const logout = () => {
  store.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 3px solid $borderImage;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  min-width: 40%;
  min-height: 80%;
  max-width: 80%;
  max-height: 90%;
  background: $backGroundModal;
  text-align: center;
  cursor: default;
}


.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  position: relative;
}

.title-text {
  font-size: 10rem;
  margin: 0;
}

.logout-link {
  position: absolute;
  right: 20px;
  background-color: transparent;
  border: none;
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-link:hover {
  color: #0056b3;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.filter-input, .filter-select {
  margin-right: 10px;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.btn {
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
  background-color: #dc3545;
}

.btn-primary:hover, .btn-secondary:hover,
.btn-warning:hover, .btn-danger:hover {
  opacity: 0.8;
}

.message-error {
  padding-top: 10px;
}
</style>