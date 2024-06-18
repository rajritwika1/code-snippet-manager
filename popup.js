document.addEventListener('DOMContentLoaded', function(){
  const saveButton = document.getElementById('saveSnippet');
  const snippetsDiv = document.getElementById('snippets');
//Load saved snippets
chrome.storage.local.get(['snippets'], function(result){
   const snippets = result.snippets || [];
   snippets.forEach(snippet => displaySnippet(snippet));

});

saveButton.addEventListener('click', function(){
    const title = document.getElementById('snippetTitle').value;
    const code = document.getElementById('snippetCode').value;
    const tags = document.getElementById('snippetTags').value.split(',').map(tag=>tag.trim());

    const snippet = { title, code, tags};

    chrome.storage.local.get(['snippets'],function(result){
        const snippets = result.snippets || [];
        snippets.push(snippet);
        chrome.storage.local.set({snippets},function(){
            displaySnippet(snippet);
        });
    });
});

   function displaySnippet(snippet){
    const snippetDiv = document.createElement('div');
    snippetDiv.className = 'snippet';

    const title = document.createElement('h2');
    title.innerText = snippet.title;
    snippetDiv.appendChild(title);

    const code = document.createElement('pre');
    code.innetText = snippet.code;
    snippetDiv.appendChild(code);

    const tags = document.createElement('div');
    tags.className = 'tags';
    tags.innerText = `Tags:${snippet.tags.join(', ')}`;
    snippetDiv.appendChild(tags);

    snippetsDiv.appendChild(snippetDiv);
   }
});