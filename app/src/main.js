
import {createApp} from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import JWT from './JWT.js'
import router from './router'
import MaskedInput from 'vue-text-mask'
import "materialize-css/dist/css/materialize.min.css"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


JWT.checkToken()

    .then(()=>{

        createApp(App)
        .use(router)
        .use(MaskedInput)
        .component("font-awesome-icon", FontAwesomeIcon)
        .mount('#app');

    })
    .catch(()=>{
        createApp(Login)
        .mount('#app');
    })

