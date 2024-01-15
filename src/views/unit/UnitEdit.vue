<template>
  <div class="relative p-4 w-full max-w-2xl max-h-full">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      <div class="max-w-md w-full bg-white p-12 shadow-md rounded-md">
        <h2 class="text-2xl font-semibold mb-6">Edit Unit</h2>

        <form>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
            <input v-model="dataEdit.name" id="name" name="name" type="text" class="mt-1 p-2 w-full border rounded-md">
          </div>

          <div class="mb-4">
            <label for="unit" class="block text-sm font-medium text-gray-600">Unit:</label>
            <select v-if="dataEdit.senior_management !== null" v-model="dataEdit.senior_management.id" id="unit" name="unit" class="mt-1 p-2 w-full border rounded-md">
              <option value="" disabled>Selected</option>
              <option v-for="item in unitData" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
            <select v-else  v-model="dataEdit.senior_management" id="unit" name="unit" class="mt-1 p-2 w-full border rounded-md">
              <option value="" disabled>Selected</option>
              <option v-for="item in unitData" :key="item.id" :value="item.id">{{ item.name }}</option>
            </select>
          </div>

        </form>
      </div>
      <!-- Modal footer -->
      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button data-modal-hide="static-modal" v-on:click="addUnit"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >I accept</button>
        <button data-modal-hide="static-modal" type="button" class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" v-on:click="toggleModal()">Decline</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/services/axiosService';
export default {
  props: {
    editData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataEdit: this.editData,
      unitData: [],
      unitCreate: {
        name: '',
        unit: null,
      },
    };
  },
  created() {
    this.unitList()
  },
  methods: {
    unitList() {
      axios.get('/unit-list/')
          .then(res => {
            this.unitData = res.data
          })
    },
    toggleModal: function(){
      this.$emit('close');
    },
    addUnit() {
      const userData = {
        name: this.dataEdit.name,
        senior_management: (this.dataEdit.senior_management !== null) ? this.dataEdit.senior_management : null,
      };
      axios.post('/units/', userData)
          .then(() => {
            this.$emit('close');
          })
          .catch(error => {
            console.error('Hata oluştu:', error);
          });
    }
  }
};
</script>

<style scoped>
/* Burada Tailwind CSS ile özel stillendirmeler yapabilirsiniz */
</style>