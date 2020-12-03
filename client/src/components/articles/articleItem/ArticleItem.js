import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Image, Button, Grid, Header, Container} from 'semantic-ui-react';
import {deleteArticle} from '../../../actions/articleActions';
import {apiPrefix} from '../../../config';
import CommentList from '../../comment/CommentList';
import style from './ArticleItem.module.css';

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = {
      showText: false,
      pictureSize:'small',
      textButton:'Показать статью',
      comments: this.props.article.comments
    }
  }

  redirect() {
    this.props.history.push({});
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteArticle(this.props.article.hash);

  }

  onStateOfArticleChange(e){
    e.preventDefault();
    this.setState({
      showText: !this.state.showText,
      pictureSize:this.state.pictureSize==='huge'?'small':'huge',
      textButton:this.state.textButton === 'Скрыть статью'?'Показать статью':'Скрыть статью',
    });
    this.render();
  }





  render() {

    const path = apiPrefix + this.props.article.pathToPicture.replace('public', '');
    const article = this.props.article;
    const isAdmin = this.props.isAdmin;
    // const  isAuthenticated  = this.props.isAuthenticated;
    return (
      <Grid className={style['ArticleItemGrid']}>
        <Grid.Column width={7}>

          <Image size={this.state.pictureSize} src={path} className={style['ArticleItemImage']} />
          <Button positive onClick={this.onStateOfArticleChange.bind(this)}
                   style={{marginLeft: '17px' }}>
            {this.state.textButton}
          </Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as='h2'>
            {article.title}
          </Header>
          <Header as='h4'>Автор:  {article.author}</Header>
          {isAdmin &&
            <div className='ui two buttons'>
              <Button.Group>
              <Button positive style={{width:'60%'}}>
                <Link to={`/edit-article/${article.hash}`} style={{color:'white'}}>Редактировать</Link>
              </Button>
                <Button.Or />
              <Button onClick={this.onDeleteClick.bind(this)} negative>Удалить</Button>
              </Button.Group>
            </div>

          }
        </Grid.Column>
        {this.state.showText &&

        <Container  >
          <pre className={style['ArticleItemPre']}>
            {article.text}
          </pre>


          <CommentList article={article}/>
        </Container>

        }
      </Grid>

    );
  }
}

ArticleItem.propTypes = {
  deleteArticle: PropTypes.func
};

export default connect(null, {deleteArticle})(withRouter(ArticleItem));