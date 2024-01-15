<template>
  <div class="relative p-4 w-full max-w-2xl max-h-full">
    <!-- Modal content -->
            <!-- Modal header -->
            <div class="max-w-md w-full bg-white p-12 shadow-md rounded-md">
              <div class="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
                <div class="p-4">
                  <h2 class="text-xl font-bold mb-2">Personel Details</h2>
                  <p class="text-gray-600">{{ dataDetails.name }}</p>
                  <p class="text-gray-600">{{ dataDetails.surname }}</p>
                  <p class="text-gray-600">{{ dataDetails.email }}</p>
                  <p class="text-gray-600">{{ dataDetails.district }}</p>
                  <p class="text-gray-600">{{ dataDetails.neighbourhood }}</p>
                </div>
              </div>
      <!-- Modal footer -->
      <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
       <button data-modal-hide="static-modal" type="button" class="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" v-on:click="toggleModal()">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailsData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataDetails: this.detailsData,
    };
  },
  methods: {
    toggleModal: function(){
      this.$emit('close');
    },
  }
};
</script>

<style scoped>
/* Burada Tailwind CSS ile özel stillendirmeler yapabilirsiniz */
</style>