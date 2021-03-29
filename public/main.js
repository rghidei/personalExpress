var heart = document.getElementsByClassName("fa-heart");
var trash = document.getElementsByClassName("fa-trash");



Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const img = this.parentNode.parentNode.childNodes[3].src
        const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        console.log('lilly')
        fetch('up', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'img' : img,
            'heart':heart
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});




Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log(element)
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const img = this.parentNode.parentNode.childNodes[3].src
        fetch('up', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'img' : img
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
