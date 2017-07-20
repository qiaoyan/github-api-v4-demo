import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { spy } from 'sinon';
import { initialState as profileContainer } from '../reducer';
import ProfileContainer from '../index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<ProfileContainer />', () => {
  it('should render with default props', () => {
    const store = mockStore({ profileContainer });
    const wrapper = shallow(
      <ProfileContainer store={store} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
