$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var img = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="messages" data-id="${message.id}">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <div>
                      ${content}
                    </div>
                      ${img}
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-content').append(html);
      $('#new_message')[0].reset();
      function scrollBottom(){
        var target = $('.messages:last');
        var position = target.offset().top;
        $('html, body').animate({scrollTop: position}, 1000);
      }
      scrollBottom();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
  })
  var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
      var html = `<div class="messages" data-id='${message.id}'>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      <img src="${message.image} class="lower-message__image" >
                    </div>
                  </div>`
    } else if (message.content) {
      var html = `<div class="messages" data-id='${message.id}'>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                      <div class="message__upper-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message__text">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
    } else if (message.image.url) {
      var html = `<div class="messages" data-id='${message.id}'>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${message.user_name}
                      </div>
                        <div class="message__upper-info__date">
                          ${message.created_at}
                        </div>
                    </div>
                    <div class="message__text">
                      <img src="${message.image}" class="lower-message__image" >
                    </div>
                   </div>`
    };
    return html;
  };

  var reloadMessages = function() {
    last_message_id = $('.messages:last').data('id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      messages.forEach(function(message){
        var insertHTML = buildMessageHTML(message);
        $('.message-content').append(insertHTML);
        function scrollBottom(){
          var target = $('.messages:last');
          var position = target.offset().top;
          $('html, body').animate({scrollTop: position}, 1000);
        }
        scrollBottom();
      })
    })
    .fail(function(){
      alert('更新できませんでした');
    });
  };

  $(function(){
    if(location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 5000);
    }
  });
});