import React, {Component, PropTypes} from 'react';
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
import Columns from 'grommet/components/Columns'
import Spinning from 'grommet/components/icons/Spinning';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as StarsContainerActionCreators from './actions';
import styles from './index.module.scss';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {_} from 'underscore'
import {RepositoryCard} from 'components'
import Pulse from 'grommet/components/icons/Pulse'


// eslint-disable-next-line react/prefer-stateless-function
class StarsContainer extends Component {
    render() {
        const {
            viewer,
            loading,
            loadMore,
        } = this.props;
        return (
            <Box colorIndex="light-2" align="center">
                <Columns maxCount={3} justify="center">
                    {viewer && viewer.starredRepositories.edges.map(({node}) => {
                        return <RepositoryCard repository={node}/>
                    })}
                </Columns>
                <Box margin="medium">
                    {loading && <Spinning/>}
                    {viewer && viewer.starredRepositories.pageInfo.hasNextPage &&
                    <Button onClick={loadMore} primary={true} label="load more"/>}
                </Box>
            </Box>

        );
    }
}

StarsContainer.propTypes = {
    // isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    // myProp: state.myProp,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        StarsContainerActionCreators,
        dispatch,
    ),
});

const Container = cssModules(StarsContainer, styles);
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Container);

const StarsQuery = gql`
  query ($cursor:String) { 
    viewer {
      starredRepositories (first:50, after:$cursor, orderBy:{field:STARRED_AT, direction:DESC}) {
        edges {
          node {
            id
            name
            description
            owner {
              avatarUrl
            }
          }
        }
        pageInfo {
        endCursor
        hasNextPage
      }
     }
    }
  }
`;

const ContainerWithData = graphql(StarsQuery, {
    props: ({data: {loading, viewer, fetchMore}}) => (
        {
            viewer,
            loading,
            loadMore: () => {
                return fetchMore({
                    query: StarsQuery,
                    variables: {
                        cursor: viewer.starredRepositories.pageInfo.endCursor,
                    },
                    updateQuery: (previousResult, {fetchMoreResult}) => {
                        const newEdges = fetchMoreResult.data.viewer.starredRepositories.edges;
                        const pageInfo = fetchMoreResult.data.viewer.starredRepositories.pageInfo;
                        return {
                            // Put the new comments at the end of the list and update `pageInfo`
                            // so we have the new `endCursor` and `hasNextPage` values
                            viewer: {
                                starredRepositories: {
                                    edges: [...previousResult.viewer.starredRepositories.edges, ...newEdges],
                                    pageInfo,
                                }
                            },
                        };
                    },
                });
            },
        }
    ),
})(Container);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContainerWithData);