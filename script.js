alert(1)
const getTemplates = (template_id,body,image)=>{
  switch (template_id) {
    case `template_1`: 
      return `<div id="GR__popup_Template1" class="GR__popupContainer modal_hidden dimmer">
          <div class="GR__popup">
            <div class="GR__popup_image">
              <img src=${image} class="image" >
            </div>
            <div class="GR__popup_body">
              ${body}
            </div>
            <button type="button" onclick="closeModalFunc()" class="GR__popup_Closebutton">X</button>
          </div>
      </div>`
      
      break;
  
    default:
      break;
  }
}
const displayModal = (template_id,imageURL,body)=>{
  let popupContainer = document.getElementsByClassName('GR__popupContainer')
  console.log(popupContainer)
  if(popupContainer.length>0){
    popupContainer = popupContainer[0]
    popupContainer.classList.remove('modal_hidden')
    popupContainer.classList.add('show_modal')
  }else{
    // const imageUrl = 'https://www.mayoclinichealthsystem.org/-/media/national-files/images/hometown-health/2019/running-shoes-on-paved-trail.jpg?h=370&w=660&la=en&hash=EF0A1D8B952FBA06002A40167735BF14'
    let template = getTemplates(template_id,body,imageURL)
    template = document.createRange().createContextualFragment(template)
    console.log(template)
    document.body.appendChild(template)
  }
}
const closeModalFunc = ()=>{
  let popupContainer = document.getElementsByClassName('GR__popupContainer')
  console.log(popupContainer)
  if(popupContainer.length>0){
    popupContainer = popupContainer[0]
    popupContainer.classList.remove('show_modal')
    popupContainer.classList.add('modal_hidden')
  }
}
