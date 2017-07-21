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
import Headline from 'grommet/components/Headline'
import {Divider, Avatar} from 'components';
import Label from 'grommet/components/Label';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import Columns from 'grommet/components/Columns'
import {RepositoryCard} from 'components'


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProfileContainerActionCreators from './actions';
import styles from './index.module.scss';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {_} from 'underscore'
import Spinning from 'grommet/components/icons/Spinning';

// eslint-disable-next-line react/prefer-stateless-function
class ProfileContainer extends Component {
    render() {
        const {
            viewer,
            loading,
            primaryLanguageCountBy,
        } = this.props;
        const StringPlaceHolder = "此处什么也没有留下"
        return (
            <Box align="center" full="horizontal">
                <Box margin="medium">
                    {loading && <Spinning/>}
                </Box>
                {!loading &&
                <Box align="center">
                    <Section align="center" justify="center" full="horizontal" colorIndex="light-2">
                        <Headline>
                            Profile
                        </Headline>
                        <Divider/>
                        <Box pad="medium" align="center">
                            <Avatar src={viewer.avatarUrl}/>
                            <Heading>
                                {viewer.name ? viewer.name : viewer.login}
                            </Heading>
                            <Label uppercase>
                                {viewer.company ? viewer.company : StringPlaceHolder}
                            </Label>
                            <hr/>
                            <Paragraph align="start" margin="medium" size="medium">
                                {viewer.bio ? viewer.bio : StringPlaceHolder}
                            </Paragraph>
                        </Box>
                        <Divider/>
                    </Section>

                    <Section align="center" justify="center" full="horizontal" colorIndex="light-1">
                        <Headline>
                            Skills
                        </Headline>
                        <Divider/>
                        <Box pad="medium" align="center">
                            {/*TODO: contiguous neighbor shouldn't be the same color */}
                            <AnnotatedMeter max={viewer.repositories.totalCount}
                                            series={_.map(primaryLanguageCountBy, (count, key) => {
                                                return {
                                                    label: key,
                                                    value: count,
                                                    colorIndex: _.sample(["neutral-2", "neutral-3", "neutral-1", "neutral-4"])
                                                }
                                            })} type="circle" legend={true} units="repo(s)" size="small"/>
                        </Box>
                        <Divider/>
                    </Section>

                    < Section align="center" justify="center" full="horizontal" colorIndex="light-2">
                        <Headline>
                            Repositories
                        </Headline>
                        <Divider/>
                        <Columns maxCount={3} justify="center">
                            {viewer && viewer.repositories.nodes.map((node) => {
                                return <RepositoryCard repository={node}/>
                            })}
                        </Columns>
                        <Divider/>
                    </Section>
                </Box>}
            </Box>
        )
    }
}

ProfileContainer.propTypes = {
    // isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    // myProp: state.myProp,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        ProfileContainerActionCreators,
        dispatch,
    ),
});

const Container = cssModules(ProfileContainer, styles);
// export default connect(
// mapStateToProps,
// mapDispatchToProps,
// )(Container);

const ProfileQuery = gql`
                query {
                viewer {
                login
                name
                bio
                avatarUrl
                company
                repositories (last: 50) {
                totalCount
                nodes {
                name
                id
                description
                owner {
                avatarUrl
            }
                primaryLanguage {
                name
            }
            }
            }
            }
            }
                `;

const ContainerWithData = graphql(ProfileQuery, {
    props: ({data: {loading, viewer}}) => (
        {
            viewer,
            loading,
            primaryLanguageCountBy: loading ? null : _.chain(viewer.repositories.nodes).pluck("primaryLanguage").pluck("name").compact().countBy().value(),
        }
    ),
})(Container);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContainerWithData);