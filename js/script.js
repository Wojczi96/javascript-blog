'use strict';

// const { list } = require("postcss");

// Generate titles
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list ';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .post');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  // console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  const bcgPhoto = document.querySelector('.bcg-photo');
  bcgPhoto.src = `./images/${targetArticle.getAttribute('id')}.jpg`;

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');

}

function generateTitleLinks (){

  const clearMessage = document.querySelector(optTitleListSelector);
  clearMessage.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }

  clearMessage.innerHTML = html;

const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}
generateTitleLinks();

function generateTags (){
  let allTags = {};

  const articleTwo = document.querySelectorAll(optArticleSelector);
  for(let secondArticle of articleTwo){
    const titleGen = secondArticle.querySelector(optArticleTagsSelector);
    titleGen.innerHTML = '';
    let html = '';
    const articleTags = secondArticle.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){
      const linkHTMLTwo = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      html = html + linkHTMLTwo;
      // if(allTags.indexOf(linkHTMLTwo) == -1){
      //   allTags.push(linkHTMLTwo);
      // }
      if(!allTags.hasOwnProperty(tag)){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    titleGen.innerHTML = html;
  }
  const tagList = document.querySelector(optTagsListSelector);
  // tagList.innerHTML = allTags.join(' ');
  let allTagsHTML = '';
  for(let tag in allTags){
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ') ';
  }
  tagList.innerHTML = allTagsHTML;
}
generateTags();

function tagClickHanlder(event){
  event.preventDefault();
  const clickedElement = this;
  const readerTagsSelector = clickedElement.getAttribute('href');
  const tagsSelector = readerTagsSelector.replace('#tag-', '');
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTag of activeTags){
    activeTag.classList.remove('active');
  }
  const finderTags = document.querySelectorAll('a[href="' + tagsSelector + '"]');
  for(let finderTag of finderTags){
    finderTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="'+ tagsSelector + '"]');
}



function addClickListenersToTags(){
  const linksTags = document.querySelectorAll('a[href^="#tag-"]');
  for(let linkTag of linksTags){
    linkTag.addEventListener('click', tagClickHanlder);
  }
}
addClickListenersToTags();


function generateAuthors(){
  const genAuthors = document.querySelectorAll(optArticleSelector);
  for(let genAuthor of genAuthors){
    const author = genAuthor.querySelector(optAuthorSelector);
    author.innerHTML = '';
    let html = '';
    const authorsName = genAuthor.getAttribute('data-author');
    const linkHTMLThree = '<a href="#author-' + authorsName + '"><span>' + authorsName + '</span></a>';
    html = html + linkHTMLThree;
    author.innerHTML = html;
  }
}
generateAuthors();

function authorClickHanlder(event){
  event.preventDefault();
  const clickedElement = this;
  const authorReader = clickedElement.getAttribute('href');
  const authorSelector = authorReader.replace('#author-', ' ');
  const activeAuthorTags = document.querySelectorAll('a.active[href^="#author-"]');
  for(let activeAuthorTag of activeAuthorTags){
    activeAuthorTag.classList.remove('remove');
  }
  const finderAuthors = document.querySelectorAll('a[href="' + authorSelector + '"]');
  for(let finderAuthor of finderAuthors){
    finderAuthor.classList.add('active');
  }
  generateTitleLinks('[data-tags="'+ authorSelector + '"]');
}

function clickListerersToAuthors(){
  const linksAuthors = document.querySelectorAll('a[href^="#author-"]');
  for(let linksAuthor of linksAuthors){
    linksAuthor.addEventListener('click', authorClickHanlder);
  }
}
clickListerersToAuthors();



