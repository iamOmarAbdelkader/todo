<template>
    <div>
        <!-- <nav-component />    -->
<b-container fluid>
<div id="todo-list">
    <b-row>
    <b-col md="10" offset="1">
     
<b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="4">
        <b-card-img src="./images/pic.jpg" class="side-img"></b-card-img>
      </b-col>
      <b-col md="8">
            <b-row>
                  <b-col md="12">

 <b-modal size="lg"  modal-lg centered  id="create-modal" >
    <template slot="modal-title">
      Create A Task
    </template>
    <ValidationObserver
      ref="observer"
      tag="b-form"
      style="width:100%"
      v-slot="{ invalid }"
      >
       <ValidationProvider
        rules="required"
        name="text"
        v-slot="{ errors }"
        >

       <b-form-textarea
      id="textarea-create"
      v-model="text"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
      :state="!invalid"
    ></b-form-textarea>

       </ValidationProvider>
  </ValidationObserver>

    <template v-slot:modal-footer="{cancel}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="createTask()">
        OK
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        Cancel
      </b-button>
    </template>
  </b-modal>


  <b-modal size="lg"  modal-lg centered  id="edit-modal" >
    <template slot="modal-title">
      Update A Task
    </template>
    <ValidationObserver
      ref="observer"
      tag="b-form"
      style="width:100%"
      v-slot="{ invalid }"
      >
       <ValidationProvider
        rules="required"
        name="text"
        v-slot="{ errors }"
        >

       <b-form-textarea
      id="textarea-edit"
      v-model="item.text"
      rows="3"
      max-rows="6"
      :state="!invalid"
    ></b-form-textarea>

       </ValidationProvider>
  </ValidationObserver>

    <template v-slot:modal-footer="{cancel}">
      <!-- Emulate built in modal footer ok and cancel button actions -->
      <b-button size="sm" variant="success" @click="updateTask()">
        OK
      </b-button>
      <b-button size="sm" variant="danger" @click="cancel()">
        Cancel
      </b-button>
    </template>
  </b-modal>

  <b-modal @ok="delTask" id="destroy-modal" title="Confirm Delete">
    <p class="my-4">delete this elemet ?</p>
  </b-modal>


                       <b-button pill  @click="$bvModal.show('create-modal')" id="create-btn" variant="outline-primary">
                               <font-awesome-icon icon="plus" />
                       </b-button>
                  </b-col>
            </b-row>
        <b-card-body title="My tasks">
          
          <b-card-text>
            <!-- Main table element -->
          
    <b-table
    v-if="items.length"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
    >
      <template slot="[name]" slot-scope="row">
        {{ row.value.text }}
      </template>

        <template slot="[actions]" slot-scope="row" >
             <!-- <b-button @click="check(row.item.id)"  size="sm" variant="outline-info" >
                               <font-awesome-icon icon="check" />
                </b-button> -->

                
                <b-button   @click="edit(row.item)"  size="sm"  variant="outline-success" >
                               <font-awesome-icon icon="edit" />
                </b-button>
                   <b-button @click="destroy(row.item)"  size="sm" variant="outline-danger" >
                               <font-awesome-icon icon="trash-alt" />
                </b-button>
        </template>

        
    </b-table>
    <p v-else>
      Please Insert Your Tasks
    </p>
        <b-col sm="7" md="6" v-if="items.length" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>


          </b-card-text>
        </b-card-body>
      </b-col>
    
    </b-row>
  </b-card>
    </b-col>
</b-row>        
    </div>

  </b-container>
    </div>
</template>

<script>
import {bus} from '../../app'
   export default {
    data() {
      return {
        alert: false,
        text: '',
        item: null,
        items: [],
        fields: [
          { key: 'text', label: 'text' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 4,
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      delTask(){
        let that = this
        axios.delete(`todo/${this.item.id}`).then((res)=>{
        let index = this.items.findIndex((item )=>{return item.id == that.item.id})
        that.items.splice(index,1)
          this.$bvToast.toast('task deleted successfully',{
                        title:'Success',
                        variant:'success'
          })
        })
      },
      check(id){
        console.log(id)
      },
       edit(item){
         this.item = item
         this.$bvModal.show('edit-modal')	
         console.log(this.item)

      },
      updateTask(){
        axios.put(`todo/${this.item.id}`,{
          text: this.item.text
        }).then((res)=>{
         this.$bvModal.hide('edit-modal')	
              this.$bvToast.toast('task updated successfully',{
                        title:'Success',
                        variant:'success'
                  })
        })
      },
       destroy(item){
        this.item = item
         this.$bvModal.show('destroy-modal')	
      },
      async getAllTodos(){
        axios.get('todo').then((res)=>{
          this.items = res.data;
          this.totalRows = this.items.length
        })
      },
      async createTask(bvModalEvt){
          let vm = this
          const isValid = await this.$refs.observer.validate();
          if(isValid){
              this.$http.post('todo',{
               text:this.text,
              }).then((res)=>{
                  console.log(res,vm)
               this.$bvModal.hide('create-modal')	
                vm.text = '';
                vm.items.unshift(res.data.item);
                  this.$bvToast.toast('task created successfully',{
                        title:'Success',
                        variant:'success'
                  })

                
              })

         
          }
      }
    },
    created(){
      this.getAllTodos();
    }
  }
</script>
<style scoped>
#todo-list{
    margin-top: 20px;
}
#create-btn{
    float: right;
    margin:15px 10px;
}
#create-btn::after{
    content: '';
    clear: both;
}
.side-img{
    height: 100%;
}
</style>
