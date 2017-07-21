import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
// import { spy } from 'sinon';
import RepositoryCard from '../index';

describe('<RepositoryCard />', () => {
  it('should render with default props', () => {
    const wrapper = shallow(
      <RepositoryCard />,
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
