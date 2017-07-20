import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import { spy } from 'sinon';
import { initialState as starsContainer } from '../reducer';
import StarsContainer from '../index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<StarsContainer />', () => {
  it('should render with default props', () => {
    const store = mockStore({ starsContainer });
    const wrapper = shallow(
      <StarsContainer store={store} />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
