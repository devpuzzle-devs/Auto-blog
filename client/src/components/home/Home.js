import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import ArticleList from '../articles/ArticleList';
import {getArticles} from '../../actions/articleActions';
import {Container, Menu, Segment, Button} from 'semantic-ui-react';
import style from './Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchClick(e) {
    e.preventDefault();
    // if (this.props.auth.isAuthenticated) {
    //
    // }
    if (this.state.searchText !== "") {
      this.props.getArticles(this.state.searchText);
    }
  }

  onChange(e) {
    // if (this.props.auth.isAuthenticated) {
    //
    // }
    this.setState({searchText: e.target.value});
    const str = e.target.value.trim();
    this.props.getArticles(str.length > 0 ? str : null);
  }

  render() {
    const { isAdmin} = this.props.auth;
    return (
      <Container className={style['HomeContainer']}>
        <Menu attached='top' style={{background:'rgba(255,255,255,0.9) '}}>
          {isAdmin &&
          <Menu.Menu>
            <Menu.Item>
              <Link to="/new-article">
                <Button  positive>
                Add article
                </Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
          }
          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' onChange={this.onChange} type='text' style={{fontWeight: 'bolder'}} placeholder='Поиск статьи...'/>
                <i className='search link icon' onClick={this.onSearchClick}/>
              </div>
              <div className='results'/>
            </div>
          </Menu.Menu>
        </Menu>
        <Segment attached='bottom' className={style['HomeSegmentContainer']} >
           <ArticleList searchText={this.state.searchText}/>
        </Segment>
      </Container>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {getArticles})(Home);