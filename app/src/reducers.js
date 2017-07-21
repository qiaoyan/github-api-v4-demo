import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import client from './apolloClient';

/* GENERATOR: Import all of your reducers */
import repositoryDetailContainer from './containers/RepositoryDetailContainer/reducer';
import starsContainer from './containers/StarsContainer/reducer';
import profileContainer from './containers/ProfileContainer/reducer';
import landing from './containers/LandingContainer/reducer';
import app from './containers/AppContainer/reducer';

const rootReducer = combineReducers({
  app,
  /* GENERATOR: Compile all of your reducers */
  repositoryDetailContainer,
  starsContainer,
  profileContainer,
  landing,
  routing: routerReducer,
  form: formReducer,
  apollo: client.reducer(),
});

export default rootReducer;
