var Article = React.createClass({
  mixins: [GetCurrentUserId],

  getInitialState: function() {
    return {article: {}, current_user_id: "", user_ids: []};
  },

  componentWillMount: function() {
    this.setState({current_user_id: this.getCurrentUserId()});
  },

  componentDidMount: function() {
    var article = new Bb.Models.Article({id: this.props.params.articleId});
    article.fetch({
      success: function(model) {
        this.setState({
          article: model.toJSON(),
          user_ids: model.toJSON().users.map(function(user) {return user.id})
        });
      }.bind(this),
      error: function(model, response) {
        console.error(response);
      }
    });
  },

  isAuthor: function(id) {
    return this.state.user_ids.indexOf(id) !== -1;
  },

  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <BackToArticlesLink className="h3 col-md-10"/>
          {this.isAuthor(this.state.current_user_id)
            ? <div>
                <EditArticleLink params={{articleId: this.props.params.articleId}} />
                <DestroyArticle id={this.state.article.id} />
              </div>
            : false
          }
        </div>
        <ArticleStatus status={this.state.article.status} />
        <h2>{this.state.article.title}</h2>
        <p dangerouslySetInnerHTML={{__html: this.state.article.body}} />
      </div>
    );
  }
});
