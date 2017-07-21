import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { spy } from 'sinon';
import { initialState as repositoryDetailContainer } from '../reducer';
import RepositoryDetailContainer from '../index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<RepositoryDetailContainer />', () => {
  it('should render with default props', () => {
    const store = mockStore({ repositoryDetailContainer });
    const wrapper = shallow(
      <RepositoryDetailContainer store={store} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
