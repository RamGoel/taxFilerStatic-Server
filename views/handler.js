function show(page){
    document.getElementById('mainDiv').=`<%- include(${page}) -%>`
}