Articles = new Mongo.Collection('articles')

Router.route('/', function(){
  this.layout('Layout');
  this.render('Blog')
});

Router.route('/blog/new', function(){
  this.layout('Layout');
  this.render('NewArticle');
});

Router.route('/blog/:_id', function(){
   this.layout('Layout');
   this.render('Article');
},{
  name: 'article.show'   
}
);

////// Client

if (Meteor.isClient) {
  Template.Blog.articles = function(){
    return Articles.find();
  }
}

////// Server

if (Meteor.isServer) {
  Meteor.startup(function(){
    Articles.remove({});
    for (var i = 0; i < 3; i++) {
      Articles.insert({
        title: 'Blog Article ' + i,
        body: ' THis is the text body for the article.',
        createdAt: new Date,
        author: 'Maciej Nowakowski'
      });
    }
  });
}