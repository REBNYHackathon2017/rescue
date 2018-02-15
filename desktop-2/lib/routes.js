import App from 'components/App';
import Roster from 'components/Roster';
import Schedule from 'components/Schedule';
console.log('FOOD MOOSssssssssE');
const routes = [
  { component: App,
    routes: [
      { path: '/',
        exact: true,
        component: App
      },
      { path: '/roster',
        component: Roster
      },
      { path: '/schedule',
        component: Schedule
      }
    ]
  }
];

export default routes;