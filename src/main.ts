import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Tag from 'primevue/tag';
import App from './App.vue';
import router from './router';

import 'primevue/resources/themes/saga-blue/theme.css'; // theme
import 'primevue/resources/primevue.min.css';// core css
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('ColumnGroup', ColumnGroup);
app.mount('#app');
