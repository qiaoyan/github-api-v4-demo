import React, {PropTypes} from 'react';
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
import LinkNext from 'grommet/components/icons/base/LinkNext'
import {Label} from 'grommet/'
import cssModules from 'react-css-modules';
import styles from './index.module.scss';
import {_} from 'underscore'
import _s from 'underscore.string'


class RepositoryCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        const {
            repository
        } = this.props

        const cardLabel = <Label truncate={true}>{repository.name}</Label>

        return (
            <Card textSize="small" label={cardLabel} description={_s.truncate(repository.description, 40)}
                  link={<Anchor icon={<LinkNext/>} primary={true} label="Link" path={`/repository/${repository.id}`}/>}
                  colorIndex="light-1" size="medium" margin="large" contentPad="medium"
                  thumbnail={repository.owner.avatarUrl ? repository.owner.avatarUrl : "https://unsplash.it/200/300/?random"}/>
        );
    }
}

RepositoryCard.propTypes = {
    repository: Object,
};

export default cssModules(RepositoryCard, styles);
