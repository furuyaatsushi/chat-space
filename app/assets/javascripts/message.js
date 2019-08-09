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
      $('.message').append(html);
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
});