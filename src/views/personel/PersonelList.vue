<template>
  <div>
  <button data-modal-hide="static-modal"  class="m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" v-on:click="toggleModal()">
      New Personnel
  </button>
  <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
  <personel-add :add-data-array="editArrayData" @close="toggleModal"/>
  </div>
  <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  <div v-if="showModalEdit" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
  <personel-edit :edit-data="editData" :edit-data-array="editArrayData" @close="toggleModalEdit"/>
  </div>
  <div v-if="showModalEdit" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  <div v-if="showModalDetails" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <personel-detail :details-data="detailsData" @close="toggleModalDetails"/>
  </div>
    <div v-if="showModalDetails" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</div>

  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" class="px-6 py-3">
          Name Surname
        </th>
        <th scope="col" class="px-6 py-3">
          Email
        </th>
        <th scope="col" class="px-6 py-3">
          Unit
        </th>
        <th scope="col" class="px-6 py-3">
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in personelData" :key="item.id"  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ item.name }} {{ item.surname }}
        </th>
        <td class="px-6 py-4">
          {{ item.email }}
        </td>
        <td v-if="item.unit !== null" class="px-6 py-4">
          {{ item.unit.name }}
        </td>
        <td v-else class="px-6 py-4">
          {{ item.unit }}
        </td>
        <td class="px-6 m-2 py-4">
          <button @click="showDetails(item.id)">
          <i class="fas fa-info-circle mr-3"></i>
          </button>
          <button @click="editItem(item.id)">
            <i class="fas fa-edit"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import PersonelAdd from "@/views/personel/PersonelAdd";
import PersonelEdit from "@/views/personel/PersonelEdit";
import PersonelDetail from "@/views/personel/PersonelDetail";
import axios from "@/services/axiosService";
export default {
  components: {PersonelAdd, PersonelEdit, PersonelDetail,},
  data() {
    return {
      showModal: false,
      showModalEdit: false,
      showModalDetails: false,
      showDetailsModal: false,
      personelData: [],
      detailsData: null,
      editData: null,
      editArrayData: null,
    };
  },
  created() {
    this.personelList()
    this.datalist()
  },
  methods: {
    personelList() {
      if (this.$store.state.user === null) {
        axios.get('/personnel-list/')
            .then(res => {
              this.personelData = res.data
            })
      } else {
        axios.get(`/personnel-id/${this.$store.state.user}/`)
            .then(res => {
              this.personelData = res.data
            })
      }
    },
    editItem(id) {
      axios.get(`/user/${id}/`)
          .then(res => {
            this.editData = res.data
            if (this.editData !== null) {
              this.toggleModalEdit()
            }
          })
    },
    datalist() {
      if (this.$store.state.user === null) {
        axios.get('/unit-list/')
            .then(res => {
              this.unitData = res.data
            })
      } else {
        axios.get(`/subunits/${this.$store.state.user}/`)
            .then(res => {
              function flattenSubUnits(data) {
                let subUnitsList = [];
                function flatten(unit) {
                  subUnitsList.push(unit);
                  unit.sub_units.forEach(flatten);
                }
                data.forEach(flatten);
                return subUnitsList;
              }
              const flattenedSubUnits = flattenSubUnits(res.data);
              this.editArrayData = flattenedSubUnits
            })
      }
    },
    showDetails(id) {
      axios.get(`/user/${id}/`)
          .then(res => {
            this.detailsData = res.data
            if (this.detailsData !== null) {
              this.toggleModalDetails()
            }
          })
    },
    toggleModal: function(){
      this.showModal = !this.showModal;
    },
    toggleModalEdit: function(){
      this.showModalEdit = !this.showModalEdit;
    },
    toggleModalDetails: function(){
      this.showModalDetails = !this.showModalDetails;
    },
  }
};
</script>

<style scoped>
/* Burada Tailwind CSS ile özel stillendirmeler yapabilirsiniz */
</style>
