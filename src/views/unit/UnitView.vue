<template>
  <div>
    <button data-modal-hide="static-modal"  class="m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" v-on:click="toggleModal()">
      New Unit
    </button>
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <unit-add @close="toggleModal"/>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <div v-if="showModalEdit" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <unit-edit :edit-data="editData" @close="toggleModalEdit"/>
    </div>
    <div v-if="showModalEdit" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
   </div>

  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Name
        </th>
        <th scope="col" class="px-6 py-3">
          Senior Management
        </th>
        <th scope="col" class="px-6 py-3">

        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in unitData" :key="item.id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ item.name }}
        </th>
        <th v-if="item.senior_management !== null" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ item.senior_management.name }}
        </th>
        <th v-if="item.senior_management === null" scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">

        </th>
        <td class="px-6 m-2 py-4">
          <button @click="showDetails(item.id)">
            <i class="fas fa-info-circle mr-3"></i> <!-- Detaylar ikonu -->
          </button>
          <button @click="editItem(item.id)">
            <i class="fas fa-edit"></i> <!-- Edit ikonu -->
          </button>
          <button @click="showDetails(item.id)">
            <i class="fas fa-trash-alt ml-3"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import UnitAdd from "./UnitAdd";
import UnitEdit from "./UnitEdit";
import axios from "@/services/axiosService";
export default {
  components: {UnitAdd, UnitEdit},
  data() {
    return {
      showModal: false,
      showModalEdit: false,
      showDetailsModal: false,
      unitData: [],
      detailsData: null,
    };
  },
  created() {
    // this.unitList()
  },
  methods: {
    unitList() {
      console.log(this.$store.getters.user)
      axios.get('/units/')
          .then(res => {
            this.unitData = res.data
          })
    },
    editItem(id) {
      axios.get(`/units/${id}/`)
          .then(res => {
            this.editData = res.data
            if (this.editData !== null) {
              this.toggleModalEdit()
            }
          })
    },
    showDetails(id) {
      axios.get(`/units/${id}/`)
          .then(res => {
            this.detailsData = res.data
            this.showDetailsModal = !this.showDetailsModal;
            // Formu sıfırla ya da diğer işlemleri gerçekleştir
          })
    },
    toggleModal: function(){
      this.showModal = !this.showModal;
    },
    toggleModalEdit: function(){
      this.showModalEdit = !this.showModalEdit;
    },
  }
};
</script>

<style scoped>
/* Burada Tailwind CSS ile özel stillendirmeler yapabilirsiniz */
</style>

