const express =require('express');
const { rawListeners } = require('./../models/article');
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req,res)=>{
   res.render('articles/new.ejs',{article : new Article() }) 
})

router.get('/:slug',async(req,res)=>{
   const article =  await Article.findOne({slug:  req.params.slug})
   if(article == null) res.direct('/')
   res.render('articles/show.ejs',{article:article})
})

router.post('/',async(req,res)=>{
   let article = new Article({
      title : req.body.title,
      description : req.body.description,
      markdown : req.body.markdown
   })
   try{
      article =await article.save()
      res.redirect(`/articles/${article.slug}`)
   }catch(e){
      console.log(e)
      res.render('articles/new',{article:article})
   }
})

router.delete('/:id',async(req,res)=>{
   await Artcile.findByIdAnddelete(req.params.id)
   res.redirect('/')
})

module.exports = router