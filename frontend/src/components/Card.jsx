import React from 'react'



function Card({website, detectLanguage}) {

  return (
    <a target="_blank"  rel="noreferrer" href= {website.url}> 
      <div className='card'>
          <img className='image' alt='site-icon' src={`https://www.google.com/s2/favicons?domain=${website.icon}&sz=${50}`}/>
          <div className='info'>
              <h2>{website.name}</h2>
              <p>{detectLanguage().lang === "tr" ? website.description_tr : detectLanguage().lang === "de" ? website.description_de : website.description_en}</p>
          </div>
          
      </div>
      </a>
    
  )
}

export default Card