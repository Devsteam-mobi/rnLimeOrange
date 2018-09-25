import { NavigationActions } from 'react-navigation';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import AppNavigator from 'navigation'

// const mainSceneAction = AppNavigator.router.getActionForPathAndParams('Navigation');
// const initialStateMain = AppNavigator.router.getStateForAction(mainSceneAction);

// const initialNavState = AppNavigator.router.getStateForAction(
//   initialStateMain,
// );

// export default function (state = initialNavState, action = {}) {
//   return AppNavigator.router.getStateForAction(action, state) || state
// }

export default createNavigationReducer(AppNavigator)