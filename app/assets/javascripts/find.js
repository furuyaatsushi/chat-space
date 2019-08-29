$(document).on('turbolinks:load', function(){
  function appendAddUserToHTML(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.js-add-user').append(html);
  }

  $(document).on("click", ".chat-group-user__btn--add", function(e){
    e.preventDefault();
    $(this.parentNode).remove();
    var user = $(this).data('user-id');
    $.ajax({
      type: 'GET',
      url: '/users/find',
      data: {user_id: user},
      dataType: 'json'
    })
    .done(function(user){
      appendAddUserToHTML(user);
    })
    .fail(function(){
      alert('ユーザーを追加できませんでした')
    })
  })

  $(document).on("click", ".chat-group-user__btn--remove", function(e){
    e.preventDefault();
    $(this.parentNode).remove();
  })
});