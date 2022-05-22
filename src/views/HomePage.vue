<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>To-Do List</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>


      <div>
        <input v-model="newToDo" />
        <ion-button @click="addToDos()">Add ToDo</ion-button>
      </div>

      <div id="toDoList">
        <!-- <div :class="{ completed: todo.completed }" v-for="(todo, index) in todos" :key="index"> -->
        <!-- <ion-label @click="completeToDo(todo)">{{ todo.text }}</ion-label> -->
        <ion-item v-for="(todo, index) in todos" :key="index">
          <ion-label>{{ todo.title }}</ion-label>
          <ion-checkbox slot="start" @update:modelValue="completeToDo(todo)" :modelValue="todo.isDone">
          </ion-checkbox>
        </ion-item>
        <!-- </div> -->
      </div>

      <p v-if="todos.length === 0">Empty list, please add some tasks</p>
      <ion-button v-if="todos.length !== 0" @click="removeAllToDos()">Remove All ToDos</ion-button>

      <!-- List of Input Items -->
      <!-- <ion-list>
        <div v-if="showCompleted">
          <ion-item v-for="item in todoItems" :key="item.id">
            <ion-label>{{ item.title }}</ion-label>
            <ion-checkbox slot="start" @update:modelValue="item.isDone = $event" :modelValue="item.isDone">
            </ion-checkbox>
          </ion-item>
        </div>
        <div v-else>
          <ion-item v-for="item in todoItems.filter(ti => ti.isDone === false)" :key="item.id">
            <ion-label>{{ item.title }}</ion-label>
            <ion-checkbox slot="start" @update:modelValue="item.isDone = $event" :modelValue="item.isDone">
            </ion-checkbox>
          </ion-item>
        </div>
      </ion-list> -->

      <!-- <ion-button @click="presentActionSheet">Show Action Sheet</ion-button>
      <ion-action-sheet></ion-action-sheet> -->
      <!-- <ion-button @click="setOpen(true)">Show Action Sheet</ion-button> -->
      <!-- <ion-action-sheet :is-open="isOpenRef" header="Albums" css-class="my-custom-class" :buttons="buttons"
        @didDismiss="setOpen(false)">
      </ion-action-sheet> -->

      <!-- <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCheckbox } from '@ionic/vue';
import { defineComponent, reactive, ref, watch } from 'vue';
import ToDoItem from '@/dto/todo-item';


export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCheckbox
  },
  setup() {

    const todoItems = [
      new ToDoItem("Put away clean clotches"),
      new ToDoItem("Do the laundry"),
      new ToDoItem("Hang out clotches to dry"),
      new ToDoItem("Vacuum"),
      new ToDoItem("Do the washing up"),
      new ToDoItem("Mop floors"),
      new ToDoItem("Take out trash")
    ];

    function update() {
      console.log('update');
    }

    const newToDo = ref(null);
    const initialLoadData = [...todoItems];

    let storedToDos: Array<ToDoItem>;
    let lstd = localStorage.getItem("todos");
    lstd ? (storedToDos = JSON.parse(lstd))
      : (storedToDos = initialLoadData);
    const todos = reactive(storedToDos);

    function addToDos() {
      if (newToDo.value !== null) {
        todos.push(new ToDoItem(newToDo.value));
        newToDo.value = null;
      }
      updateStorage();
    }
    function removeAllToDos() {
      todos.splice(0, todos.length);
      updateStorage();
    }
    function completeToDo(todo: ToDoItem) {
      console.log(todo.title);
      todo.isDone = !todo.isDone;
      updateStorage();
    }
    function updateStorage() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    // watch(todos, () => updateStorage());

    return {
      completeToDo,
      removeAllToDos,
      addToDos,
      todos,
      newToDo,
      updateStorage,
    }
  }

  // setup() {

  //   // const todoItems = [
  //   //   new ToDoItem("Put away clean clotches"),
  //   //   new ToDoItem("Do the laundry"),
  //   //   new ToDoItem("Hang out clotches to dry"),
  //   //   new ToDoItem("Vacuum"),
  //   //   new ToDoItem("Do the washing up"),
  //   //   new ToDoItem("Mop floors"),
  //   //   new ToDoItem("Take out trash")
  //   // ];

  //   const todoItems = [
  //     { id: 1, title: 'Pepperoni', isDone: true },
  //     { id: 2, title: 'Sausage', isDone: false },
  //     { id: 3, title: 'Mushroom', isDone: true }
  //   ];

  //   const isOpenRef = ref(false);
  //   const setOpen = (state: boolean) => isOpenRef.value = state;

  //   const showCompleted = ref(false);
  //   const setShowCompleted = (state: boolean) => showCompleted.value = state;

  //   const titleStr = computed(() => {
  //     return showCompleted.value ? 'Show Completed' : 'Hide Completed'
  //   });

  //   const buttonCaption = computed(() => {
  //     return showCompleted.value ? 'Hide Completed' : 'Show Completed'
  //   });

  //   // const filteredToDoItems = computed(() => {
  //   //   return (showCompleted.value)
  //   //     ? todoItems
  //   //     : todoItems.filter(ti => ti.isDone === false)
  //   // });

  //   async function presentActionSheet() {
  //     const actionSheet = await actionSheetController
  //       .create({
  //         header: 'ToDo Items',
  //         cssClass: 'my-custom-class',
  //         buttons: [
  //           {
  //             text: buttonCaption.value,
  //             icon: checkmarkDone,
  //             id: 'delete-button',
  //             // data: {
  //             //   type: 'delete'
  //             // },
  //             handler: () => {
  //               setShowCompleted(!showCompleted.value);
  //             },
  //           },
  //           {
  //             text: 'Cancel',
  //             icon: close,
  //             role: 'cancel',
  //             handler: () => {
  //               console.log('Cancel clicked')
  //             },
  //           },
  //         ],
  //       });
  //     await actionSheet.present();

  //     const { role, data } = await actionSheet.onDidDismiss();
  //     console.log('onDidDismiss resolved with role and data', role, data);
  //   }

  //   return {
  //     isOpenRef, setOpen, todoItems, showCompleted, titleStr, presentActionSheet, buttonCaption,
  //     setShowCompleted
  //   }
  // }
});


</script>

<style scoped>
.completed {
  text-decoration: line-through;
}

#todoList {
  margin: 2%;
  padding: 0%;
}

.cardContent:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 2);
}

#todoList div.completed {
  opacity: 0.5;
}

#appContainer {
  padding: 2%;
}

#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
