'use strict';


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  // console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  // console.log('clickedElement:', clickedElement);
  // console.log('clickedElement (with plus): ' + clickedElement);


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


// Generate titles
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks (){
  //Clear Message
  const clearMessage = document.querySelector(optTitleListSelector);
  clearMessage.innerHTML = '';
  //Loop
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  for(let article of articles){
const articleId = article.getAttribute('id');

const articleTitle = article.querySelector(optTitleSelector).innerHTML;

const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
// console.log(linkHTML);

html = html + linkHTML;
// console.log(html);
}
clearMessage.innerHTML = html;
// Restore click links
const links = document.querySelectorAll('.titles a');
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
}
generateTitleLinks();

