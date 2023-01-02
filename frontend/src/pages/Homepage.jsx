import  {  useReducer, useState, useEffect } from 'react'
import Card from '../components/Card'

import Footer from '../components/Footer'

const reducer = (state, action)=>{
  switch(action.type){
    case "add":
      return state + 8;
    case "reset":
      return 8;
    default:
      console.log('hi')
  }
}


function Homepage() {

  const language = navigator.language
  const detectLanguage = ()=>{
    if(language.includes('tr')){
      return {
        lang: "tr",
        cat: "Hepsi",
        search: "kategorisi için sonuçlar:",
        result: "İşini kolaylaştıracak yüzlerce web uygulamasını keşfet!",
      }
    }else if(language.includes('de')){
      return {
        lang: "de",
        cat: "Alle",
        result: "Entdecke Hunderte von Web-Anwendungen, die dein Leben einfacher machen!"
        
      }
    }else if(language.includes('en')){
      return {
        lang: "en",
        cat: "All",
        result: "Discover hundreds of web applications that will make your life easier!"
      }
    }else{
      return {
        lang: "en",
        cat: "All",
        result: "Discover hundreds of web applications that will make your life easier!"
      }
    }
  };

  const [allData, setAllData] = useState([])
  const [categories, setCategories] = useState([])
  const [currentCat, setCurrentCat] = useState(detectLanguage().cat)
  const [amount, dispatch] = useReducer(reducer, 8)

  const firstFetch = async ()=>{
    const response = await fetch('/websites')
    const data = await response.json()
    setAllData(data.data);
  };
  const fetchCategories = async ()=>{
    const response = await fetch('/categories', {
      method:"POST",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify({
        language: navigator.language
      })
    });
    const data = await response.json();
    setCategories(data.categories.category);
  };

  useEffect(()=>{
      fetchCategories();
      firstFetch()
  },[])

    const handleSearch = ()=>{
      if(detectLanguage().lang === "tr"){
        return `"${currentCat}" kategorisi için sonuçlar:`
      }else if(detectLanguage().lang === "de"){
        return `Ergebnissen für "${currentCat}":`
      }else{
        return `Results for "${currentCat}" :`
      }
    }
    const handleCat = ()=>{  
      if(currentCat === "All" || currentCat === "Alle" || currentCat === "Hepsi"){
         return allData
      }else {
        let array = allData.filter(element => element.title.includes(currentCat) && element);
        return array
      };
    };
    

  return (
    <>
      <nav >
        <div className='navbar-content'>
            <div  >  
               <a href="/"><img alt='logo'  src='./images/logo.png'></img> </a>  
            </div> 
            <div className='input-group'>
               <select   onChange={(e)=>{
                setCurrentCat(e.target.value)
                dispatch({type: "reset"})
               }}>
                    {
                      categories.map(category => <option key={category}>{category}</option>)
                    }
               </select>
            </div>
           
        </div>
      </nav>
      <h3 style={{textAlign: 'center', backgroundColor: "coral", padding: ".8rem", color: "white"}}>{detectLanguage().result}</h3>
      <div className='showcase'>
          <div className='showcase-content'>
                <div className='currentCat'><h2>{handleSearch()}</h2></div>
                  {
                    handleCat().slice(0, amount).map(element => <Card key={element.name} detectLanguage={detectLanguage} website={element}/>)
                  }
                <div className='currentCat'><button style={{display: amount > handleCat().length ? "none" : "block"}}  onClick={()=>{
                  dispatch({type: "add"})
                }} ><i className="fa-solid fa-arrow-down"></i></button></div>
          </div>
      </div>
      <Footer/>
    </>
  )
}

export default Homepage