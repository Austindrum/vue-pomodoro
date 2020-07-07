import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlayCircle as fasPlayCircle, 
         faList, 
         faChartBar,
         faMusic,
         faHistory,
         faPlus,
         faSortUp,
         faTimes,
         faCalendarAlt,
         faArrowUp,
         faPlay,
         faPause,
         faSun,
         faCloudSun,
         faCloud} from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle as farPlayCircle,
         faCheckSquare,
         faTrashAlt} from '@fortawesome/free-regular-svg-icons';

library.add(
    fasPlayCircle, 
    farPlayCircle, 
    faList, 
    faChartBar,
    faMusic,
    faHistory,
    faPlus,
    faSortUp,
    faCheckSquare,
    faTrashAlt,
    faTimes,
    faCalendarAlt,
    faArrowUp,
    faPlay,
    faPause,
    faSun,
    faCloudSun,
    faCloud);

Vue.component('fa-icon', FontAwesomeIcon);