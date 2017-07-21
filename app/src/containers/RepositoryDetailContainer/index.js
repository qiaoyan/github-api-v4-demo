import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Button from 'grommet/components/Button';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RepositoryDetailContainerActionCreators from './actions';
import styles from './index.module.scss';

// eslint-disable-next-line react/prefer-stateless-function
class RepositoryDetailContainer extends Component {
  render() {
    return (
      <Box>
        // the web is your canvas and grommet is your paintbrush 🖌
      </Box>
    );
  }
}

RepositoryDetailContainer.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  // myProp: state.myProp,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    RepositoryDetailContainerActionCreators,
    dispatch,
  ),
});

const Container = cssModules(RepositoryDetailContainer, styles);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
