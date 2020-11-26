(function(){
  const STYLE_CSS = 'https://ketan18710.github.io/hostedFiles/style.css'
  loadJS("https://code.jquery.com/jquery-3.5.1.min.js")
  // jQuery.noConflict();
  var div = document.createElement('div')
  div.classList.add('popupContainer')
  div.classList.add('ui')
  div.classList.add('modal')
  var id = setInterval(function()
  {
        if(window.jQuery)
        {
          loadJS("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js")
          loadCSS("https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" )
          loadCSS(STYLE_CSS)
          getForm(success,error)
          clearInterval(id);
        }
  }, 1000);
    document.body.appendChild(div)
  })()
// function popupForm(parentDiv){
//   const popupContainer = document.createElement('div')
//   popupContainer.classList.add('popupContainer')
//   parentDiv.appendChild(popupContainer)
// }

function loadJS(file) {
  // DOM: Create the script element
  var jsElm = document.createElement("script");
  // set the type attribute
  jsElm.type = "application/javascript";
  // make the script element load file
  jsElm.src = file;
  // finally insert the element to the body element in order to load the script
  document.body.appendChild(jsElm);
}
function loadCSS(file) {
  // DOM: Create the script element
  var jsElm = document.createElement("link");
  // set the type attribute
  jsElm.rel = "stylesheet";
  // make the script element load file
  jsElm.href = file;
  // finally insert the element to the body element in order to load the script
  document.body.appendChild(jsElm);
}
function getForm(succcess,error){
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.open('GET', `https://platform-staging.grorapid.com/api/container/ddabe052-413b-495e-a82f-744085a457e9?buuid=1ec0d5cc-37c7-46e8-a696-627657ee8448&type=form`);
  xhr.setRequestHeader('Authorization', `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWQwMjIyNzY2MDg1NmViYzNmNWMxN2NkMzNkNzJiZTE0YWY1MWI0MDM4NTNkMTBmZGI0Mzg5ZmNlOGE4NTE1ZjZmYzBkNGIxNGUwMTFkM2QiLCJpYXQiOjE2MDU5NjM4MjIsIm5iZiI6MTYwNTk2MzgyMiwiZXhwIjoxNjM3NDk5ODIyLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.SlmLya4WfA71ZPdgOzhLJWltLdprnBJDsslHxGlUPYU0l9Qx-4My7LpdfwlOQGavfIO8BcSlq2zG3uBqfYpECWJoiwYaLpCaZGc0-6qkWcCbysGdORSudO-LighgDSXT7lAwv483XJUDtbf8Cfkzi1uKCwS5BRMCK_RjPS8ofpBo_cT6SdwfZkWMbeM2UiwB0nrOM27Fs1uoh_7C6AcioVwsT_F2fjVj5_YBaKMIprO6dkfVX6be0kNxJ5o9wPNsOx9VKIjZx7pomPkbDe3OZ-F0TiZd-p0pAVZo7swKbfzuYlv5cNhzFm1Ne-MwrDG-1EgE-snBvUKfANNjsVlTy3TXVNZrUbNyUYwlBdiWjtjMJO_Y6uocNfXY76S_AfJzBhFAQBVhXshvop022rod2XzjjLUDqixAxMnXSoz5FYZit-Xm92QRzyHrbYD_2tP-1GPOXaGNP1pwJIZZEkNwMUrvz83AR6BT7q01ructQfzNyi-Zf09Z-fm4NY-AVCSLXW2JXUdHxwP32Hto-udiwOyzKYfiVguvfz0-QA_xeV7986f3xo5X3Pa4cZ98_gKieGKPptCXiOKUZFt__ghzbrcEA-htjfRFlXqIVK6sypxGSqMGwW2IBb8EFaPqElPBty4vc17Rx2RhFcFQtVkOFDYkSEW_m6iVGps8ECMGfoI`); 
  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.response);
    const data = response.response.container.data.service.data
    const{content,slug,method,brand_url} = data
    window.form_slug = slug
    window.method = method
    window.brand_url =brand_url
    const form = JSON.parse(content)
    succcess(form)
  });
  xhr.addEventListener('error', () => {
    const error = JSON.parse(xhr.response);
    error(error)
    // reject(error);
  });
  xhr.send();
}
function success(data){
  $('.ui.modal').modal('show')
  const form = document.createRange().createContextualFragment(data)
  const popupContainer = document.getElementsByClassName('popupContainer')[0]
  popupContainer.appendChild(form)
  const submitBtn = popupContainer.querySelector('button[type="submit"]')
  submitBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const form = popupContainer.querySelector('form')
    const _fid = form.dataset.id
    console.log(_fid)
    const inputs = form.getElementsByTagName('input')
    const obj = {}
    obj['_fid'] = _fid
    obj['_token'] = 'OvEV0SqfRcSyxeHyZZwrjpgWe07Xw6SJpI7nC9h2'
    Array.prototype.forEach.call(inputs,(input)=>{
        console.log(input.dataset.name)
        obj[input.dataset.name] = input.value
      }
    )
    console.log(obj)
    // const submitLink = `b/${window.brand_url}/f/${window.form_slug}`
    // console.log(submitLink)
    submitForm(obj)
  })
}
function error(error){
  console.log(error)
}
function submitForm(data){
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = false
  xhr.open('POST', `https://platform-staging.grorapid.com/b/ketans-brand/f/ketans-brandgjtkly`);
  xhr.setRequestHeader('Authorization', `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOWQwMjIyNzY2MDg1NmViYzNmNWMxN2NkMzNkNzJiZTE0YWY1MWI0MDM4NTNkMTBmZGI0Mzg5ZmNlOGE4NTE1ZjZmYzBkNGIxNGUwMTFkM2QiLCJpYXQiOjE2MDU5NjM4MjIsIm5iZiI6MTYwNTk2MzgyMiwiZXhwIjoxNjM3NDk5ODIyLCJzdWIiOiI2Iiwic2NvcGVzIjpbXX0.SlmLya4WfA71ZPdgOzhLJWltLdprnBJDsslHxGlUPYU0l9Qx-4My7LpdfwlOQGavfIO8BcSlq2zG3uBqfYpECWJoiwYaLpCaZGc0-6qkWcCbysGdORSudO-LighgDSXT7lAwv483XJUDtbf8Cfkzi1uKCwS5BRMCK_RjPS8ofpBo_cT6SdwfZkWMbeM2UiwB0nrOM27Fs1uoh_7C6AcioVwsT_F2fjVj5_YBaKMIprO6dkfVX6be0kNxJ5o9wPNsOx9VKIjZx7pomPkbDe3OZ-F0TiZd-p0pAVZo7swKbfzuYlv5cNhzFm1Ne-MwrDG-1EgE-snBvUKfANNjsVlTy3TXVNZrUbNyUYwlBdiWjtjMJO_Y6uocNfXY76S_AfJzBhFAQBVhXshvop022rod2XzjjLUDqixAxMnXSoz5FYZit-Xm92QRzyHrbYD_2tP-1GPOXaGNP1pwJIZZEkNwMUrvz83AR6BT7q01ructQfzNyi-Zf09Z-fm4NY-AVCSLXW2JXUdHxwP32Hto-udiwOyzKYfiVguvfz0-QA_xeV7986f3xo5X3Pa4cZ98_gKieGKPptCXiOKUZFt__ghzbrcEA-htjfRFlXqIVK6sypxGSqMGwW2IBb8EFaPqElPBty4vc17Rx2RhFcFQtVkOFDYkSEW_m6iVGps8ECMGfoI`); 
  xhr.setRequestHeader("Content-Type", "application/json");xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.response);
    console.log(response)
    // const data = response.response.container.data.service.data
  });
  xhr.addEventListener('error', () => {
    const error = JSON.parse(xhr.response);
    console.log(error)
    // reject(error);
  });
  console.log(data)
  xhr.send(data);
}
