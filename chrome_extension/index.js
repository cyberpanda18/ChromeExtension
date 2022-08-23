
let myleads=[]
let oldleads=[]
const inputbtn=document.getElementById("input-btn")
const inputEl= document.getElementById("input-el")
const ulEl=document.getElementById("ul-el")
const deletebtn=document.getElementById("delete-btn")
const  tabbtn=document.getElementById("tab-btn")
const leadsfromlocalstorage=JSON.parse(localStorage.getItem("myleads"))

if(leadsfromlocalstorage)
{
    myleads=leadsfromlocalstorage
    render(myleads)
}
const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]
tabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        let activeTab = tabs[0]
        let activeTabId = activeTab.id // or do whatever you need
    })
    myleads.push(tabs[0].url)
    localStorage.setItem("myleads", JSON.stringify(myleads) )
    render(myleads)
})

function render(leads)
{
    let listitems=""
for(let i=0;i<myleads.length;i++)
{
    listitems += `
    <li> 
    <a target='_blank' href='${myleads[i]}'>
     ${myleads[i]}
    </a>
    </li>
    `
    // const li= document.createElement("li")
    // li.textContent=myleads[i]
    // ulEl.append(li)
}
 ulEl.innerHTML = listitems
}
deletebtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myleads = []
    render(myleads)
})

inputbtn.addEventListener("click", function() {
    myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myleads) )
    render(myleads)
})